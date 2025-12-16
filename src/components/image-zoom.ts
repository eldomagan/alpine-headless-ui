import { defineComponent, setup } from 'alpine-define-component'

interface Props {
  zoomType?: 'window' | 'lens' | 'inner'
  scale?: number
}

export default defineComponent({
  name: 'image-zoom',

  setup: setup((props: Props, { generateId }) => {
    const rootId = generateId('root')

    const config = {
      zoomType: props.zoomType ?? 'lens',
      scale: props.scale ?? 2.5,
    }

    return {
      rootId,
      _config: config,
      _imageEl: null as HTMLImageElement | null,
      _lensEl: null as HTMLElement | null,
      _resultEl: null as HTMLElement | null,
      _resizeObserver: null as ResizeObserver | null,

      isHovering: false,

      get imageUrl(): string {
        return this._imageEl?.src ?? ''
      },

      handleMouseMove(event: MouseEvent) {
        if (!this._imageEl) {
          return
        }

        const rect = this._imageEl.getBoundingClientRect()

        let x = event.clientX - rect.left
        let y = event.clientY - rect.top
        x = Math.max(0, Math.min(rect.width, x))
        y = Math.max(0, Math.min(rect.height, y))

        // WINDOW MODE: Lens selector + external result window
        if (config.zoomType === 'window' && this._lensEl && this._resultEl) {
          const lensW = this._lensEl.offsetWidth
          const lensH = this._lensEl.offsetHeight

          // Position lens centered on mouse, clamped to image bounds
          let lensLeft = x - lensW / 2
          let lensTop = y - lensH / 2
          lensLeft = Math.max(0, Math.min(rect.width - lensW, lensLeft))
          lensTop = Math.max(0, Math.min(rect.height - lensH, lensTop))

          this._lensEl.style.left = `${lensLeft}px`
          this._lensEl.style.top = `${lensTop}px`

          // Calculate result window background
          const cx = this._resultEl.offsetWidth / lensW
          const cy = this._resultEl.offsetHeight / lensH

          this._resultEl.style.backgroundSize = `${rect.width * cx}px ${rect.height * cy}px`
          this._resultEl.style.backgroundPosition = `-${lensLeft * cx}px -${lensTop * cy}px`
        }

        // LENS MODE: Magnifying glass with background image
        if (config.zoomType === 'lens' && this._lensEl) {
          const lensW = this._lensEl.offsetWidth
          const lensH = this._lensEl.offsetHeight

          // Position lens centered on mouse, clamped to image bounds
          let lensLeft = x - lensW / 2
          let lensTop = y - lensH / 2
          lensLeft = Math.max(0, Math.min(rect.width - lensW, lensLeft))
          lensTop = Math.max(0, Math.min(rect.height - lensH, lensTop))

          this._lensEl.style.left = `${lensLeft}px`
          this._lensEl.style.top = `${lensTop}px`

          // Calculate magnified background position
          const bgPosX = -lensLeft * config.scale
          const bgPosY = -lensTop * config.scale

          this._lensEl.style.backgroundSize = `${rect.width * config.scale}px ${rect.height * config.scale}px`
          this._lensEl.style.backgroundPosition = `${bgPosX}px ${bgPosY}px`
        }

        // INNER MODE: CSS transform with custom properties
        if (config.zoomType === 'inner' && this._imageEl) {
          const xPercent = (x / rect.width) * 100
          const yPercent = (y / rect.height) * 100
          this._imageEl.style.setProperty('--zoom-x', `${xPercent}%`)
          this._imageEl.style.setProperty('--zoom-y', `${yPercent}%`)
        }
      },

      handleMouseEnter() {
        this.isHovering = true
      },

      handleMouseLeave() {
        this.isHovering = false
      },

      init(this: any) {
        this._resizeObserver = new ResizeObserver(() => {})

        if (this._imageEl) {
          this._resizeObserver.observe(this._imageEl)
        }
      },

      destroy() {
        this._resizeObserver?.disconnect()
      },
    }
  }),

  parts: {
    root(api) {
      return {
        'data-scope': 'image-zoom',
        'data-part': 'root',
        id: api.rootId,
        ':data-zoom-type': () => api._config.zoomType,
        ':style': () => ({
          position: 'relative',
          display: 'inline-block',
          // Clip scaled image to original bounds in inner mode
          overflow: api._config.zoomType === 'inner' ? 'hidden' : 'visible',
        }),
        'x-init'(this: any) {
          api.init.call(this)
        },
        'x-on:destroy'() {
          api.destroy()
        },
      }
    },

    image(api, el) {
      return {
        'data-scope': 'image-zoom',
        'data-part': 'image',
        'x-init'() {
          api._imageEl = el as HTMLImageElement
        },
        'x-on:mousemove'(event: MouseEvent) {
          api.handleMouseMove(event)
        },
        'x-on:mouseenter'() {
          api.handleMouseEnter()
        },
        'x-on:mouseleave'() {
          api.handleMouseLeave()
        },
        ':style': () => {
          if (api._config.zoomType === 'inner') {
            return {
              transform: api.isHovering ? `scale(${api._config.scale})` : 'scale(1)',
              transformOrigin: 'var(--zoom-x, 50%) var(--zoom-y, 50%)',
            }
          }
          return {}
        },
      }
    },

    lens(api, el) {
      return {
        'data-scope': 'image-zoom',
        'data-part': 'lens',
        'x-init'() {
          api._lensEl = el
        },
        'x-show': () => api.isHovering && (api._config.zoomType === 'window' || api._config.zoomType === 'lens'),
        ':style': () => {
          const baseStyle = {
            pointerEvents: 'none' as const,
          }

          // For LENS mode, add background image styles
          if (api._config.zoomType === 'lens') {
            return {
              ...baseStyle,
              backgroundImage: `url(${api.imageUrl})`,
              backgroundRepeat: 'no-repeat',
            }
          }

          return baseStyle
        },
        'aria-hidden': 'true',
      }
    },

    result(api, el) {
      return {
        'data-scope': 'image-zoom',
        'data-part': 'result',
        'x-init'() {
          api._resultEl = el
        },
        'x-show': () => api.isHovering && api._config.zoomType === 'window',
        ':style': () => ({
          pointerEvents: 'none' as const,
          backgroundImage: `url(${api.imageUrl})`,
          backgroundRepeat: 'no-repeat',
        }),
        'aria-hidden': 'true',
      }
    },
  },
})
