import { defineComponent, setup } from 'alpine-define-component'

interface Props {
  value?: number | number[]
  min?: number
  max?: number
  step?: number
  orientation?: 'horizontal' | 'vertical'
  disabled?: boolean
  readOnly?: boolean
  name?: string
  formatOptions?: Intl.NumberFormatOptions
}

export default defineComponent({
  name: 'slider',
  // @ts-ignore - modelable is a valid option but not in types
  modelable: 'value',

  setup: setup((props: Props, { generateId }) => {
    const rootId = generateId('root')

    const config = {
      min: props.min ?? 0,
      max: props.max ?? 100,
      step: props.step ?? 1,
      orientation: props.orientation ?? 'horizontal',
      disabled: props.disabled ?? false,
      readOnly: props.readOnly ?? false,
      name: props.name,
      formatOptions: props.formatOptions,
    }

    // Normalize value to array
    const initialValue = props.value ?? 0
    const isMultiThumb = Array.isArray(initialValue)
    const initialValues = Array.isArray(initialValue) ? initialValue : [initialValue]

    // Validate and clamp initial values
    const validatedValues = initialValues.map((v) => clamp(roundToPrecision(v, config.step)))

    let isDragging = false
    let activeThumbIndex = -1

    function clamp(value: number): number {
      return Math.max(config.min, Math.min(config.max, value))
    }

    function roundToPrecision(value: number, step: number): number {
      return Math.round(value / step) * step
    }

    function getPercentage(value: number): number {
      const range = config.max - config.min
      return range === 0 ? 0 : ((value - config.min) / range) * 100
    }

    function formatValue(value: number): string {
      if (config.formatOptions) {
        return new Intl.NumberFormat(undefined, config.formatOptions).format(value)
      }
      return value.toString()
    }

    function getValueFromPoint(x: number, y: number, rect: DOMRect): number {
      const isHorizontal = config.orientation === 'horizontal'
      const position = isHorizontal ? x - rect.left : rect.bottom - y
      const size = isHorizontal ? rect.width : rect.height
      const percentage = Math.max(0, Math.min(100, (position / size) * 100))
      const range = config.max - config.min
      const rawValue = (percentage / 100) * range + config.min
      return clamp(roundToPrecision(rawValue, config.step))
    }

    function findNearestThumbIndex(value: number, values: number[]): number {
      let nearestIndex = 0
      let minDistance = Math.abs(value - (values[0] ?? 0))

      for (let i = 1; i < values.length; i++) {
        const distance = Math.abs(value - (values[i] ?? 0))
        if (distance < minDistance) {
          minDistance = distance
          nearestIndex = i
        }
      }

      return nearestIndex
    }

    return {
      rootId,
      _config: config,
      _isMultiThumb: isMultiThumb,

      values: validatedValues,

      get value(): number | number[] {
        return this._isMultiThumb ? this.values : (this.values[0] ?? config.min)
      },

      set value(newValue: number | number[]) {
        const newValues = Array.isArray(newValue) ? newValue : [newValue]
        this.values = newValues.map((v) => clamp(roundToPrecision(v, config.step)))
      },

      getThumbPercentage(index: number): number {
        const value = this.values[index]
        return value !== undefined ? getPercentage(value) : 0
      },

      getRangeStart(): number {
        // For single thumb, start from min (0%)
        // For multi-thumb, start from first thumb position
        if (this.values.length === 1) {
          return 0
        }
        const value = this.values[0]
        return value !== undefined ? getPercentage(value) : 0
      },

      getRangeEnd(): number {
        const value = this.values[this.values.length - 1]
        return value !== undefined ? getPercentage(value) : 100
      },

      setValue(index: number, newValue: number, dispatch = false) {
        if (config.disabled || config.readOnly) {
          return
        }

        let clamped = clamp(roundToPrecision(newValue, config.step))

        // Prevent thumb collision - clamp to adjacent thumbs
        const prevValue = this.values[index - 1]
        const nextValue = this.values[index + 1]
        if (index > 0 && prevValue !== undefined) {
          clamped = Math.max(clamped, prevValue)
        }
        if (index < this.values.length - 1 && nextValue !== undefined) {
          clamped = Math.min(clamped, nextValue)
        }

        this.values[index] = clamped

        if (dispatch) {
          this.$dispatch('change', { value: this.value, values: this.values })
        }
      },

      handleTrackPointerDown(event: PointerEvent) {
        if (config.disabled || config.readOnly) {
          return
        }

        const target = event.currentTarget as HTMLElement
        const rect = target.getBoundingClientRect()
        const newValue = getValueFromPoint(event.clientX, event.clientY, rect)

        // Find nearest thumb and update it
        const nearestIndex = findNearestThumbIndex(newValue, this.values)
        this.setValue(nearestIndex, newValue, true)

        // Focus the thumb
        const thumbElement = target.parentElement?.querySelector(
          `[data-part="thumb"][data-index="${nearestIndex}"]`
        ) as HTMLElement
        thumbElement?.focus()
      },

      handleThumbPointerDown(index: number, event: PointerEvent) {
        if (config.disabled || config.readOnly) {
          return
        }

        event.preventDefault()
        event.stopPropagation()

        isDragging = true
        activeThumbIndex = index

        const target = event.currentTarget as HTMLElement
        target.setPointerCapture(event.pointerId)

        const handlePointerMove = (e: PointerEvent) => {
          if (!isDragging || activeThumbIndex !== index) {
            return
          }

          const track = target.closest('[data-part="control"]') as HTMLElement
          if (!track) {
            return
          }

          const rect = track.getBoundingClientRect()
          const newValue = getValueFromPoint(e.clientX, e.clientY, rect)
          this.setValue(index, newValue, true)
        }

        const handlePointerUp = (e: PointerEvent) => {
          if (activeThumbIndex !== index) {
            return
          }

          isDragging = false
          activeThumbIndex = -1
          target.releasePointerCapture(e.pointerId)

          document.removeEventListener('pointermove', handlePointerMove)
          document.removeEventListener('pointerup', handlePointerUp)
        }

        document.addEventListener('pointermove', handlePointerMove)
        document.addEventListener('pointerup', handlePointerUp)
      },

      handleThumbKeydown(index: number, event: KeyboardEvent) {
        if (config.disabled || config.readOnly) {
          return
        }

        const currentValue = this.values[index]
        if (currentValue === undefined) {
          return
        }

        const largeStep = config.step * 10
        let newValue = currentValue

        switch (event.key) {
          case 'ArrowRight':
          case 'ArrowUp':
            event.preventDefault()
            newValue = currentValue + config.step
            break
          case 'ArrowLeft':
          case 'ArrowDown':
            event.preventDefault()
            newValue = currentValue - config.step
            break
          case 'PageUp':
            event.preventDefault()
            newValue = currentValue + largeStep
            break
          case 'PageDown':
            event.preventDefault()
            newValue = currentValue - largeStep
            break
          case 'Home':
            event.preventDefault()
            newValue = config.min
            break
          case 'End':
            event.preventDefault()
            newValue = config.max
            break
          default:
            return
        }

        this.setValue(index, newValue, true)
      },

      getThumbAriaValueText(index: number): string {
        const value = this.values[index]
        return value !== undefined ? formatValue(value) : ''
      },
    }
  }),

  parts: {
    root(api) {
      return {
        'data-scope': 'slider',
        'data-part': 'root',
        id: api.rootId,
        ':data-disabled': () => (api._config.disabled ? '' : undefined),
        'data-orientation': api._config.orientation,
        'x-modelable': 'value',
      }
    },

    label() {
      return {
        'data-scope': 'slider',
        'data-part': 'label',
      }
    },

    control(api) {
      return {
        'data-scope': 'slider',
        'data-part': 'control',
        'x-on:pointerdown'(event: PointerEvent) {
          api.handleTrackPointerDown(event)
        },
        ':style': () => ({
          position: 'relative',
          userSelect: 'none',
          touchAction: 'none',
        }),
      }
    },

    track() {
      return {
        'data-scope': 'slider',
        'data-part': 'track',
      }
    },

    range(api) {
      const isHorizontal = api._config.orientation === 'horizontal'
      return {
        'data-scope': 'slider',
        'data-part': 'range',
        ':style': () => {
          const start = api.getRangeStart()
          const end = api.getRangeEnd()
          const size = end - start

          if (isHorizontal) {
            return {
              position: 'absolute',
              left: `${start}%`,
              width: `${size}%`,
            }
          } else {
            return {
              position: 'absolute',
              bottom: `${start}%`,
              height: `${size}%`,
            }
          }
        },
      }
    },

    thumb(api, _el, { value }) {
      const index = Number(value)
      const isHorizontal = api._config.orientation === 'horizontal'

      return {
        'data-scope': 'slider',
        'data-part': 'thumb',
        'data-index': index,
        role: 'slider',
        tabindex: api._config.disabled ? -1 : 0,
        ':aria-valuenow': () => api.values[index],
        ':aria-valuemin': () => {
          // Min is either config.min or previous thumb value
          return index > 0 && api.values[index - 1] !== undefined ? api.values[index - 1] : api._config.min
        },
        ':aria-valuemax': () => {
          // Max is either config.max or next thumb value
          return index < api.values.length - 1 && api.values[index + 1] !== undefined ? api.values[index + 1] : api._config.max
        },
        ':aria-valuetext': () => api.getThumbAriaValueText(index),
        ':aria-orientation': () => api._config.orientation,
        ':aria-disabled': () => api._config.disabled,
        'x-on:pointerdown'(event: PointerEvent) {
          api.handleThumbPointerDown(index, event)
        },
        'x-on:keydown'(event: KeyboardEvent) {
          api.handleThumbKeydown(index, event)
        },
        ':style': () => {
          const percentage = api.getThumbPercentage(index)

          if (isHorizontal) {
            return {
              position: 'absolute',
              left: `${percentage}%`,
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }
          } else {
            return {
              position: 'absolute',
              bottom: `${percentage}%`,
              left: '50%',
              transform: 'translate(-50%, 50%)',
            }
          }
        },
      }
    },

    output(api) {
      return {
        'data-scope': 'slider',
        'data-part': 'output',
        'x-text': () => {
          if (api._isMultiThumb) {
            return api.values.map((v) => api.getThumbAriaValueText(api.values.indexOf(v))).join(' - ')
          }
          return api.getThumbAriaValueText(0)
        },
      }
    },

    marker(api, _el, { value }) {
      const markerValue = Number(value)
      const isHorizontal = api._config.orientation === 'horizontal'
      const percentage = ((markerValue - api._config.min) / (api._config.max - api._config.min)) * 100

      return {
        'data-scope': 'slider',
        'data-part': 'marker',
        'data-value': markerValue,
        ':style': () => {
          if (isHorizontal) {
            return {
              position: 'absolute',
              left: `${percentage}%`,
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }
          } else {
            return {
              position: 'absolute',
              bottom: `${percentage}%`,
              left: '50%',
              transform: 'translate(-50%, 50%)',
            }
          }
        },
      }
    },

    hiddenInput(api, _el, { value }) {
      const index = value !== undefined ? Number(value) : 0

      return {
        'data-scope': 'slider',
        'data-part': 'hidden-input',
        type: 'hidden',
        name: api._config.name ? (api._isMultiThumb ? `${api._config.name}[${index}]` : api._config.name) : undefined,
        value: () => api.values[index] ?? '',
      }
    },
  },
})
