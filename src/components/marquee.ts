import { defineComponent, setup } from 'alpine-define-component'

interface Props {
  vertical?: boolean
  reverse?: boolean
  pauseOnHover?: boolean
  pauseOnFocus?: boolean
  defaultPaused?: boolean
  speed?: number
  delay?: number
  loopCount?: number
}

const CONTENT_SELECTOR = '[data-part="content"]'

export default defineComponent({
  name: 'marquee',

  setup: setup((props: Props, { generateId }) => {
    const rootId = generateId('root')
    const viewportId = generateId('viewport')
    const controlId = generateId('control')

    return {
      rootId,
      viewportId,
      controlId,

      vertical: props.vertical ?? false,
      reverse: props.reverse ?? false,
      pauseOnHover: props.pauseOnHover ?? true,
      pauseOnFocus: props.pauseOnFocus ?? true,
      defaultPaused: props.defaultPaused ?? false,
      speed: props.speed ?? 50,
      delay: props.delay ?? 0,
      loopCount: props.loopCount ?? Infinity,

      state: (props.defaultPaused ? 'paused' : 'playing') as 'playing' | 'paused',
      _prefersReducedMotion: false,
      _contentEl: null as HTMLElement | null,
      _duration: 0,
      _currentLoop: 0,
      _delayTimeout: null as number | null,

      get isPaused() {
        return this.state === 'paused'
      },

      get isPlaying() {
        return this.state === 'playing'
      },

      get isComplete() {
        return this._currentLoop >= this.loopCount
      },

      _calculateDuration() {
        if (!this._contentEl) return

        const contentWidth = this._contentEl.scrollWidth
        const contentHeight = this._contentEl.scrollHeight
        const size = this.vertical ? contentHeight : contentWidth

        this._duration = size / this.speed
      },

      _handleResize() {
        this._calculateDuration()
      },

      _handleLoopComplete() {
        this._currentLoop++
        this.$dispatch('loop-complete', { loop: this._currentLoop })

        if (this.isComplete) {
          this.pause()
          this.$dispatch('complete', { totalLoops: this._currentLoop })
        }
      },

      init() {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        this._prefersReducedMotion = mediaQuery.matches

        mediaQuery.addEventListener('change', (e) => {
          this._prefersReducedMotion = e.matches
          if (e.matches) {
            this.pause()
          }
        })

        this.$watch('state', (newState, oldState) => {
          if (oldState !== newState) {
            this.$dispatch(newState === 'playing' ? 'play' : 'pause')
            this.$dispatch('pause-change', { paused: newState === 'paused' })
          }
        })

        this.$nextTick(() => {
          this._contentEl = this.$root.querySelector(CONTENT_SELECTOR)
          this._calculateDuration()

          if (this._contentEl) {
            this._contentEl.addEventListener('animationiteration', () => {
              this._handleLoopComplete()
            })

            this._contentEl.addEventListener('animationend', () => {
              if (this.loopCount !== Infinity) {
                this._handleLoopComplete()
              }
            })
          }

          window.addEventListener('resize', () => this._handleResize())
        })

        if (!this._prefersReducedMotion && !this.defaultPaused) {
          this.play()
        }
      },

      play() {
        if (this._prefersReducedMotion || this.isComplete) {
          return
        }

        if (this.delay > 0 && this._currentLoop === 0) {
          this._delayTimeout = window.setTimeout(() => {
            this.state = 'playing'
          }, this.delay)
        } else {
          this.state = 'playing'
        }
      },

      pause() {
        if (this._delayTimeout) {
          window.clearTimeout(this._delayTimeout)
          this._delayTimeout = null
        }
        this.state = 'paused'
      },

      toggle() {
        if (this.isPaused) {
          this.play()
        } else {
          this.pause()
        }
      },

      resume() {
        this.play()
      },

      restart() {
        this._currentLoop = 0
        this.state = 'paused'

        this.$nextTick(() => {
          if (!this._prefersReducedMotion) {
            this.play()
          }
        })
      },
    }
  }),

  parts: {
    root(api) {
      return {
        id: api.rootId,
        'data-scope': 'marquee',
        'data-part': 'root',
        'x-bind:data-vertical': () => String(api.vertical),
        'x-bind:data-reverse': () => String(api.reverse),
        'x-bind:data-pause-on-hover': () => String(api.pauseOnHover),
        'x-bind:data-pause-on-focus': () => String(api.pauseOnFocus),
        'x-bind:data-state': () => api.state,
        'x-bind:style'() {
          const animationDelay = api.delay > 0 && api._currentLoop === 0 ? `${api.delay}ms` : '0s'
          const iterationCount = api.loopCount === Infinity ? 'infinite' : String(api.loopCount)

          return {
            '--marquee-duration': `${api._duration}s`,
            '--marquee-delay': animationDelay,
            '--marquee-iteration-count': iterationCount,
          }
        },
      }
    },

    viewport(api) {
      return {
        id: api.viewportId,
        'data-scope': 'marquee',
        'data-part': 'viewport',
        tabindex: api.pauseOnFocus ? '0' : undefined,
        'x-on:mouseenter'() {
          if (api.pauseOnHover) {
            api.pause()
          }
        },
        'x-on:mouseleave'() {
          if (api.pauseOnHover && !api._prefersReducedMotion) {
            api.play()
          }
        },
        'x-on:focus'() {
          if (api.pauseOnFocus) {
            api.pause()
          }
        },
        'x-on:blur'() {
          if (api.pauseOnFocus && !api._prefersReducedMotion) {
            api.play()
          }
        },
        'x-bind:style'() {
          return {
            overflow: 'hidden',
            display: 'flex',
            flexDirection: api.vertical ? 'column' : 'row',
          }
        },
      }
    },

    content() {
      return {
        'data-scope': 'marquee',
        'data-part': 'content',
      }
    },

    item() {
      return {
        'data-scope': 'marquee',
        'data-part': 'item',
        style: 'flex-shrink: 0;',
      }
    },

    control(api) {
      return {
        id: api.controlId,
        'data-scope': 'marquee',
        'data-part': 'control',
        type: 'button',
        'x-bind:aria-label': () => (api.isPaused ? 'Play' : 'Pause'),
        'x-on:click'() {
          api.toggle()
        },
      }
    },
  },
})
