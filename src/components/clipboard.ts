import { defineComponent, setup } from 'alpine-define-component'

interface Props {
  value?: string
  timeout?: number
}

export default defineComponent({
  name: 'clipboard',

  setup: setup((props: Props, { generateId }) => {
    const rootId = generateId('root')
    const labelId = generateId('label')
    const inputId = generateId('input')

    return {
      rootId,
      labelId,
      inputId,
      value: props.value ?? '',
      timeout: props.timeout ?? 3000,
      copied: false,
      _timeoutId: null as ReturnType<typeof setTimeout> | null,

      get isSupported(): boolean {
        return (
          typeof navigator !== 'undefined' &&
          typeof navigator.clipboard?.writeText === 'function'
        )
      },

      async copy(): Promise<boolean> {
        if (!this.value) {
          return false
        }

        if (!this.isSupported) {
          const error = new Error('Clipboard API not available')
          this.$dispatch('copy-error', { value: this.value, error })
          return false
        }

        try {
          await navigator.clipboard.writeText(this.value)
          this.copied = true

          if (this._timeoutId !== null) {
            clearTimeout(this._timeoutId)
          }

          this._timeoutId = setTimeout(() => {
            this.copied = false
            this._timeoutId = null
          }, this.timeout)

          this.$dispatch('copy', { value: this.value, copied: true })
          return true
        } catch (error) {
          this.$dispatch('copy-error', { value: this.value, error })
          return false
        }
      },

      destroy() {
        if (this._timeoutId !== null) {
          clearTimeout(this._timeoutId)
          this._timeoutId = null
        }
      },
    }
  }),

  parts: {
    root(api) {
      return {
        id: api.rootId,
        'x-bind:data-copied': () => (api.copied ? '' : undefined),
      }
    },

    label(api) {
      return {
        id: api.labelId,
        'x-bind:data-copied': () => (api.copied ? '' : undefined),
      }
    },

    control(api) {
      return {
        'x-bind:data-copied': () => (api.copied ? '' : undefined),
      }
    },

    trigger(api) {
      return {
        type: 'button',
        'x-bind:data-copied': () => (api.copied ? '' : undefined),
        'x-on:click'() {
          api.copy()
        },
      }
    },

    input(api) {
      return {
        id: api.inputId,
        'aria-labelledby': api.labelId,
        'x-bind:value': () => api.value,
        'x-bind:data-copied': () => (api.copied ? '' : undefined),
      }
    },

    indicator(api) {
      return {
        role: 'status',
        'aria-live': 'polite',
        'aria-atomic': 'true',
        'x-bind:data-copied': () => (api.copied ? '' : undefined),
        'x-show': () => api.copied,
      }
    },
  },
})
