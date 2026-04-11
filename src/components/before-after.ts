import { defineComponent, setup } from 'alpine-define-component'

interface Props {
  value?: number
  orientation?: 'horizontal' | 'vertical'
  disabled?: boolean
  step?: number
}

export default defineComponent({
  name: 'before-after',
  // @ts-ignore - modelable is a valid option but not in types
  modelable: 'value',

  setup: setup((props: Props, { generateId }) => {
    const rootId = generateId('root')

    const config = {
      orientation: props.orientation ?? 'horizontal',
      disabled: props.disabled ?? false,
      step: props.step ?? 1,
    }

    const initialValue = Math.max(0, Math.min(100, props.value ?? 50))

    let rootEl: HTMLElement | null = null
    let cleanupDrag: (() => void) | null = null

    function clamp(value: number): number {
      return Math.max(0, Math.min(100, value))
    }

    function roundToStep(value: number): number {
      return Math.round(value / config.step) * config.step
    }

    function getValueFromPoint(clientX: number, clientY: number, rect: DOMRect): number {
      if (config.orientation === 'horizontal') {
        const position = clientX - rect.left
        return clamp((position / rect.width) * 100)
      } else {
        const position = clientY - rect.top
        return clamp((position / rect.height) * 100)
      }
    }

    return {
      rootId,
      _config: config,

      value: initialValue,
      isDragging: false,

      setValue(newValue: number, dispatch = false) {
        if (config.disabled) {
          return
        }

        this.value = clamp(roundToStep(newValue))

        if (dispatch) {
          this.$dispatch('change', { value: this.value })
        }
      },

      handlePointerDown(event: PointerEvent) {
        if (config.disabled) {
          return
        }

        event.preventDefault()

        this.isDragging = true

        const target = event.currentTarget as HTMLElement
        target.setPointerCapture(event.pointerId)

        const handlePointerMove = (e: PointerEvent) => {
          if (!this.isDragging || !rootEl) {
            return
          }

          const rect = rootEl.getBoundingClientRect()
          const newValue = getValueFromPoint(e.clientX, e.clientY, rect)
          this.setValue(newValue, true)
        }

        const cleanup = () => {
          this.isDragging = false
          document.removeEventListener('pointermove', handlePointerMove)
          document.removeEventListener('pointerup', handlePointerUp)
          cleanupDrag = null
        }

        const handlePointerUp = (e: PointerEvent) => {
          target.releasePointerCapture(e.pointerId)
          cleanup()
        }

        document.addEventListener('pointermove', handlePointerMove)
        document.addEventListener('pointerup', handlePointerUp)
        cleanupDrag = cleanup
      },

      handleKeydown(event: KeyboardEvent) {
        if (config.disabled) {
          return
        }

        let newValue = this.value
        const largeStep = config.step * 10

        switch (event.key) {
          case 'ArrowRight':
          case 'ArrowUp':
            event.preventDefault()
            newValue = this.value + config.step
            break
          case 'ArrowLeft':
          case 'ArrowDown':
            event.preventDefault()
            newValue = this.value - config.step
            break
          case 'PageUp':
            event.preventDefault()
            newValue = this.value + largeStep
            break
          case 'PageDown':
            event.preventDefault()
            newValue = this.value - largeStep
            break
          case 'Home':
            event.preventDefault()
            newValue = 0
            break
          case 'End':
            event.preventDefault()
            newValue = 100
            break
          default:
            return
        }

        this.setValue(newValue, true)
      },

      handleRootPointerDown(event: PointerEvent) {
        if (config.disabled) {
          return
        }

        // Only handle direct clicks on root, not bubbled from handle
        if ((event.target as HTMLElement).closest('[data-part="handle"]')) {
          return
        }

        if (!rootEl) {
          return
        }

        const rect = rootEl.getBoundingClientRect()
        const newValue = getValueFromPoint(event.clientX, event.clientY, rect)
        this.setValue(newValue, true)

        // Focus the handle for keyboard follow-up
        const handle = rootEl.querySelector('[data-part="handle"]') as HTMLElement
        handle?.focus()
      },

      update(settings: Partial<Props>) {
        if (settings.orientation !== undefined) {
          config.orientation = settings.orientation
        }
        if (settings.disabled !== undefined) {
          config.disabled = settings.disabled
          if (config.disabled) {
            cleanupDrag?.()
          }
        }
        if (settings.step !== undefined) {
          config.step = settings.step
        }
        if (settings.value !== undefined) {
          this.value = clamp(roundToStep(settings.value))
        }
      },

      init(this: any) {
        rootEl = this.$el
      },

      destroy() {
        cleanupDrag?.()
        rootEl = null
      },
    }
  }),

  parts: {
    root(api) {
      return {
        'data-scope': 'before-after',
        'data-part': 'root',
        id: api.rootId,
        'data-orientation': api._config.orientation,
        ':data-disabled': () => (api._config.disabled ? '' : undefined),
        ':data-dragging': () => (api.isDragging ? '' : undefined),
        'x-modelable': 'value',
        ':style': () => ({
          position: 'relative',
          overflow: 'hidden',
          userSelect: 'none',
          touchAction: 'none',
        }),
        'x-on:pointerdown'(event: PointerEvent) {
          api.handleRootPointerDown(event)
        },
      }
    },

    before(api) {
      const isHorizontal = api._config.orientation === 'horizontal'
      return {
        'data-scope': 'before-after',
        'data-part': 'before',
        ':style': () => {
          if (isHorizontal) {
            return {
              position: 'absolute',
              inset: '0',
              clipPath: `inset(0 ${100 - api.value}% 0 0)`,
            }
          } else {
            return {
              position: 'absolute',
              inset: '0',
              clipPath: `inset(0 0 ${100 - api.value}% 0)`,
            }
          }
        },
      }
    },

    after(api) {
      const isHorizontal = api._config.orientation === 'horizontal'
      return {
        'data-scope': 'before-after',
        'data-part': 'after',
        ':style': () => {
          if (isHorizontal) {
            return {
              position: 'absolute',
              inset: '0',
              clipPath: `inset(0 0 0 ${api.value}%)`,
            }
          } else {
            return {
              position: 'absolute',
              inset: '0',
              clipPath: `inset(${api.value}% 0 0 0)`,
            }
          }
        },
      }
    },

    separator(api) {
      const isHorizontal = api._config.orientation === 'horizontal'
      return {
        'data-scope': 'before-after',
        'data-part': 'separator',
        'aria-hidden': 'true',
        ':style': () => {
          if (isHorizontal) {
            return {
              position: 'absolute',
              top: '0',
              bottom: '0',
              left: `${api.value}%`,
              transform: 'translateX(-50%)',
            }
          } else {
            return {
              position: 'absolute',
              left: '0',
              right: '0',
              top: `${api.value}%`,
              transform: 'translateY(-50%)',
            }
          }
        },
      }
    },

    handle(api) {
      const isHorizontal = api._config.orientation === 'horizontal'
      return {
        'data-scope': 'before-after',
        'data-part': 'handle',
        role: 'slider',
        tabindex: api._config.disabled ? -1 : 0,
        ':aria-valuenow': () => Math.round(api.value),
        ':aria-valuetext': () => `${Math.round(api.value)} percent`,
        'aria-valuemin': 0,
        'aria-valuemax': 100,
        ':aria-orientation': () => api._config.orientation,
        ':aria-disabled': () => api._config.disabled,
        'x-on:pointerdown'(event: PointerEvent) {
          api.handlePointerDown(event)
        },
        'x-on:keydown'(event: KeyboardEvent) {
          api.handleKeydown(event)
        },
        ':style': () => {
          if (isHorizontal) {
            return {
              position: 'absolute',
              top: '50%',
              left: `${api.value}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
            }
          } else {
            return {
              position: 'absolute',
              left: '50%',
              top: `${api.value}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
            }
          }
        },
      }
    },
  },
})
