import { defineComponent, setup } from 'alpine-define-component'

interface Props {
  value?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  readonly?: boolean
  allowMouseWheel?: boolean
  clampValueOnBlur?: boolean
  formatOptions?: Intl.NumberFormatOptions
  translations?: {
    incrementLabel?: string
    decrementLabel?: string
  }
}

export default defineComponent({
  name: 'number-input',

  setup: setup((props: Props, { generateId }) => {
    const inputId = generateId('input')
    const incrementId = generateId('increment')
    const decrementId = generateId('decrement')

    const config = {
      value: props.value ?? 0,
      min: props.min,
      max: props.max,
      step: props.step ?? 1,
      disabled: props.disabled ?? false,
      readonly: props.readonly ?? false,
      allowMouseWheel: props.allowMouseWheel ?? false,
      clampValueOnBlur: props.clampValueOnBlur ?? true,
      formatOptions: props.formatOptions,
      translations: {
        incrementLabel: props.translations?.incrementLabel ?? 'Increment',
        decrementLabel: props.translations?.decrementLabel ?? 'Decrement',
      },
    }

    let isFocused = false

    function clamp(value: number): number {
      let result = value

      if (config.min !== undefined && result < config.min) {
        result = config.min
      }

      if (config.max !== undefined && result > config.max) {
        result = config.max
      }

      return result
    }

    function roundToPrecision(value: number, step: number): number {
      const decimals = (step.toString().split('.')[1] || '').length
      return Number(value.toFixed(decimals))
    }

    function formatValue(value: number): string {
      if (config.formatOptions) {
        try {
          return new Intl.NumberFormat(undefined, config.formatOptions).format(value)
        } catch {
          return value.toString()
        }
      }
      return value.toString()
    }

    function parseValue(valueStr: string): number {
      const cleaned = valueStr.replace(/[^\d.-]/g, '')
      const parsed = parseFloat(cleaned)
      return isNaN(parsed) ? config.value : parsed
    }

    return {
      inputId,
      incrementId,
      decrementId,
      _config: config,
      _inputEl: null as HTMLInputElement | null,

      value: config.value,
      inputValue: formatValue(config.value),
      focused: false,

      get isAtMin(): boolean {
        return config.min !== undefined && this.value <= config.min
      },

      get isAtMax(): boolean {
        return config.max !== undefined && this.value >= config.max
      },

      get canIncrement(): boolean {
        return !config.disabled && !config.readonly && !this.isAtMax
      },

      get canDecrement(): boolean {
        return !config.disabled && !config.readonly && !this.isAtMin
      },

      init() {
        this.setValue(config.value)
      },

      setValue(newValue: number, dispatch = false) {
        const clamped = clamp(newValue)
        const rounded = roundToPrecision(clamped, config.step)

        this.value = rounded

        if (isFocused) {
          this.inputValue = rounded.toString()
        } else {
          this.inputValue = formatValue(rounded)
        }

        if (dispatch) {
          this.$dispatch('change', { value: rounded })
        }
      },

      increment(multiplier = 1) {
        if (!this.canIncrement) {
          return
        }

        const newValue = this.value + config.step * multiplier
        this.setValue(newValue, true)
      },

      decrement(multiplier = 1) {
        if (!this.canDecrement) {
          return
        }

        const newValue = this.value - config.step * multiplier
        this.setValue(newValue, true)
      },

      handleInputChange(event: Event) {
        const target = event.target as HTMLInputElement
        const parsed = parseValue(target.value)
        this.setValue(parsed, true)
      },

      handleInputFocus() {
        isFocused = true
        this.focused = true
        this.inputValue = this.value.toString()
        this.$dispatch('focus')
      },

      handleInputBlur() {
        isFocused = false
        this.focused = false

        if (config.clampValueOnBlur) {
          this.setValue(this.value, false)
        }

        this.inputValue = formatValue(this.value)
        this.$dispatch('blur')
      },

      handleKeydown(event: KeyboardEvent) {
        if (config.disabled || config.readonly) {
          return
        }

        switch (event.key) {
          case 'ArrowUp':
            event.preventDefault()
            this.increment()
            break
          case 'ArrowDown':
            event.preventDefault()
            this.decrement()
            break
          case 'PageUp':
            event.preventDefault()
            this.increment(10)
            break
          case 'PageDown':
            event.preventDefault()
            this.decrement(10)
            break
          case 'Home':
            if (config.min !== undefined) {
              event.preventDefault()
              this.setValue(config.min, true)
            }
            break
          case 'End':
            if (config.max !== undefined) {
              event.preventDefault()
              this.setValue(config.max, true)
            }
            break
        }
      },

      handleWheel(event: WheelEvent) {
        if (!config.allowMouseWheel || !isFocused || config.disabled || config.readonly) {
          return
        }

        event.preventDefault()

        if (event.deltaY < 0) {
          this.increment()
        } else if (event.deltaY > 0) {
          this.decrement()
        }
      },
    }
  }),

  parts: {
    root(api) {
      return {
        'data-scope': 'number-input',
        'data-part': 'root',
        'x-modelable': 'value',
        'x-bind:data-disabled': () => (api._config.disabled ? '' : undefined),
        'x-bind:data-readonly': () => (api._config.readonly ? '' : undefined),
        'x-bind:data-focused': () => (api.focused ? '' : undefined),
      }
    },

    label(api) {
      return {
        'data-scope': 'number-input',
        'data-part': 'label',
        for: api.inputId,
      }
    },

    input(api, el) {
      return {
        id: api.inputId,
        'data-scope': 'number-input',
        'data-part': 'input',
        type: 'text',
        inputmode: 'decimal',
        role: 'spinbutton',
        'x-bind:aria-valuemin': () => api._config.min,
        'x-bind:aria-valuemax': () => api._config.max,
        'x-bind:aria-valuenow': () => api.value,
        'x-bind:disabled': () => (api._config.disabled ? true : undefined),
        'x-bind:readonly': () => (api._config.readonly ? true : undefined),
        'x-model': 'inputValue',
        'x-init'() {
          api._inputEl = el as HTMLInputElement
        },
        'x-on:input'(event: Event) {
          api.handleInputChange(event)
        },
        'x-on:focus'() {
          api.handleInputFocus()
        },
        'x-on:blur'() {
          api.handleInputBlur()
        },
        'x-on:keydown'(event: KeyboardEvent) {
          api.handleKeydown(event)
        },
        'x-on:wheel.passive'(event: WheelEvent) {
          api.handleWheel(event)
        },
      }
    },

    increment(api) {
      return {
        id: api.incrementId,
        'data-scope': 'number-input',
        'data-part': 'increment',
        type: 'button',
        tabindex: -1,
        'aria-label': api._config.translations.incrementLabel,
        'x-bind:disabled': () => !api.canIncrement || undefined,
        'x-bind:data-disabled': () => (!api.canIncrement ? '' : undefined),
        'x-on:click'() {
          api.increment()
          api._inputEl?.focus()
        },
        'x-on:pointerdown.prevent'() {},
      }
    },

    decrement(api) {
      return {
        id: api.decrementId,
        'data-scope': 'number-input',
        'data-part': 'decrement',
        type: 'button',
        tabindex: -1,
        'aria-label': api._config.translations.decrementLabel,
        'x-bind:disabled': () => !api.canDecrement || undefined,
        'x-bind:data-disabled': () => (!api.canDecrement ? '' : undefined),
        'x-on:click'() {
          api.decrement()
          api._inputEl?.focus()
        },
        'x-on:pointerdown.prevent'() {},
      }
    },

    scrubber(api, el) {
      let isDragging = false
      let dragStartY = 0
      let dragStartValue = 0
      let accumulatedDelta = 0
      const pixelsPerStep = 10

      return {
        'data-scope': 'number-input',
        'data-part': 'scrubber',
        'x-bind:data-disabled': () => (api._config.disabled || api._config.readonly ? '' : undefined),
        'x-init'() {
          el.style.cursor = 'ns-resize'
          el.style.touchAction = 'none'
          el.style.userSelect = 'none'
        },
        'x-on:pointerdown'(event: PointerEvent) {
          if (api._config.disabled || api._config.readonly) {
            return
          }

          const target = event.currentTarget as HTMLElement
          if (target && target.setPointerCapture) {
            target.setPointerCapture(event.pointerId)
          }

          isDragging = true
          dragStartY = event.clientY
          dragStartValue = api.value
          accumulatedDelta = 0

          event.preventDefault()
        },
        'x-on:pointermove'(event: PointerEvent) {
          if (!isDragging) {
            return
          }

          const deltaY = dragStartY - event.clientY // Inverted: up = positive
          accumulatedDelta = deltaY

          const steps = Math.floor(Math.abs(accumulatedDelta) / pixelsPerStep)

          if (steps > 0) {
            const direction = accumulatedDelta > 0 ? 1 : -1
            const newValue = dragStartValue + direction * steps * api._config.step
            api.setValue(newValue, true)

            dragStartValue = api.value
            dragStartY = event.clientY
            accumulatedDelta = 0
          }

          event.preventDefault()
        },
        'x-on:pointerup'(event: PointerEvent) {
          if (!isDragging) {
            return
          }

          const target = event.currentTarget as HTMLElement
          if (target && target.hasPointerCapture && target.hasPointerCapture(event.pointerId)) {
            target.releasePointerCapture(event.pointerId)
          }

          isDragging = false
          event.preventDefault()
        },
        'x-on:pointercancel'(event: PointerEvent) {
          if (!isDragging) {
            return
          }

          const target = event.currentTarget as HTMLElement
          if (target && target.hasPointerCapture && target.hasPointerCapture(event.pointerId)) {
            target.releasePointerCapture(event.pointerId)
          }

          isDragging = false
        },
      }
    },
  },
})
