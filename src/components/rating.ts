import { defineComponent, setup } from 'alpine-define-component'

interface Props {
  value?: number
  count?: number
  allowHalf?: boolean
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  name?: string
  translations?: {
    itemLabel?: (index: number) => string
  }
}

export default defineComponent({
  name: 'rating',
  // @ts-ignore - modelable is a valid option but not in types
  modelable: 'value',

  setup: setup((props: Props, { generateId }) => {
    const rootId = generateId('root')
    const inputId = generateId('input')

    const config = {
      value: props.value ?? 0,
      count: props.count ?? 5,
      allowHalf: props.allowHalf ?? false,
      disabled: props.disabled ?? false,
      readOnly: props.readOnly ?? false,
      required: props.required ?? false,
      name: props.name,
      translations: {
        itemLabel: props.translations?.itemLabel ?? ((index: number) => `${index} star${index !== 1 ? 's' : ''}`),
      },
    }

    return {
      rootId,
      inputId,
      _config: config,

      value: config.value,
      hoveredValue: -1,
      focusedValue: -1,
      isHovering: false,

      get displayValue(): number {
        if (this.isHovering && this.hoveredValue >= 0) {
          return this.hoveredValue
        }
        return this.value
      },

      init() {},

      setValue(newValue: number, dispatch = false) {
        if (config.disabled || config.readOnly) {
          return
        }

        const clamped = Math.max(0, Math.min(config.count, newValue))
        const rounded = config.allowHalf ? Math.round(clamped * 2) / 2 : Math.round(clamped)

        this.value = rounded

        if (dispatch) {
          this.$dispatch('change', { value: rounded })
        }
      },

      handleItemClick(index: number) {
        if (config.disabled || config.readOnly) {
          return
        }

        this.setValue(index, true)
      },

      handleItemPointerMove(index: number, event: PointerEvent) {
        if (config.disabled || config.readOnly) {
          return
        }

        this.isHovering = true

        if (config.allowHalf) {
          const target = event.currentTarget as HTMLElement
          const rect = target.getBoundingClientRect()
          const x = event.clientX - rect.left
          const isLeftHalf = x < rect.width / 2

          this.hoveredValue = isLeftHalf ? index - 0.5 : index
        } else {
          this.hoveredValue = index
        }
      },

      handleItemPointerLeave() {
        this.isHovering = false
        this.hoveredValue = -1
      },

      handleKeydown(event: KeyboardEvent) {
        if (config.disabled || config.readOnly) {
          return
        }

        const step = config.allowHalf ? 0.5 : 1

        switch (event.key) {
          case 'ArrowRight':
          case 'ArrowUp':
            event.preventDefault()
            this.setValue(Math.min(config.count, this.value + step), true)
            break
          case 'ArrowLeft':
          case 'ArrowDown':
            event.preventDefault()
            this.setValue(Math.max(0, this.value - step), true)
            break
          case 'Home':
            event.preventDefault()
            this.setValue(0, true)
            break
          case 'End':
            event.preventDefault()
            this.setValue(config.count, true)
            break
        }
      },
    }
  }),

  parts: {
    root(api) {
      return {
        id: api.rootId,
        'data-scope': 'rating',
        'data-part': 'root',
        'x-modelable': 'value',
        'x-bind:data-disabled': () => (api._config.disabled ? '' : undefined),
        'x-bind:data-readonly': () => (api._config.readOnly ? '' : undefined),
      }
    },

    control(api) {
      return {
        'data-scope': 'rating',
        'data-part': 'control',
        role: 'radiogroup',
        'aria-label': 'Rating',
        'x-bind:aria-disabled': () => (api._config.disabled ? 'true' : undefined),
        'x-bind:aria-readonly': () => (api._config.readOnly ? 'true' : undefined),
        'x-bind:aria-required': () => (api._config.required ? 'true' : undefined),
        'x-on:keydown'(event: KeyboardEvent) {
          api.handleKeydown(event)
        },
        'x-on:pointerleave'() {
          api.handleItemPointerLeave()
        },
      }
    },

    label(api) {
      return {
        'data-scope': 'rating',
        'data-part': 'label',
        id: `${api.rootId}-label`,
      }
    },

    item(api, _el, { value }) {
      const index = value !== undefined && value !== null && value !== '' ? Number(value) : 1

      return {
        'data-scope': 'rating',
        'data-part': 'item',
        'data-index': index,
        role: 'radio',
        'aria-label': api._config.translations.itemLabel(index),
        'x-bind:aria-checked': () => (index <= api.value ? 'true' : 'false'),
        'x-bind:aria-disabled': () => (api._config.disabled ? 'true' : undefined),
        'x-bind:data-checked': () => (index <= api.displayValue ? '' : undefined),
        'x-bind:data-half': () => {
          if (!api._config.allowHalf) return undefined
          const displayValue = api.displayValue
          return index - 0.5 === displayValue ? '' : undefined
        },
        'x-bind:data-highlighted': () => (index <= api.displayValue ? '' : undefined),
        'x-bind:tabindex': () => {
          if (api._config.disabled) return -1
          const currentIndex = Math.ceil(api.value) || 1
          return index === currentIndex ? 0 : -1
        },
        'x-on:click'() {
          api.handleItemClick(index)
        },
        'x-on:pointermove'(event: PointerEvent) {
          api.handleItemPointerMove(index, event)
        },
        'x-on:focus'() {
          api.focusedValue = index
        },
        'x-on:blur'() {
          api.focusedValue = -1
        },
      }
    },

    hiddenInput(api) {
      return {
        id: api.inputId,
        'data-scope': 'rating',
        'data-part': 'hidden-input',
        type: 'text',
        hidden: true,
        'x-bind:name': () => api._config.name || undefined,
        'x-bind:value': () => api.value,
        'x-bind:disabled': () => (api._config.disabled ? true : undefined),
        'x-bind:required': () => (api._config.required ? true : undefined),
      }
    },
  },
})
