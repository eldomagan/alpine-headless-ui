import { defineComponent, setup } from 'alpine-define-component'

interface Props {
  value?: string
  timeout?: number
}

export default defineComponent({
  name: 'clipboard',

  setup: setup((props: Props, { generateId }) => {
    const rootId = generateId('root')

    return {
      rootId,
      value: props.value ?? '',
      timeout: props.timeout ?? 3000,
      copied: false,
      _timeoutId: null as number | null,

      setValue(newValue: string) {
        this.value = newValue
      },

      async copy() {
        if (!this.value) {
          return
        }

        try {
          await navigator.clipboard.writeText(this.value)
          this.copied = true

          if (this._timeoutId !== null) {
            clearTimeout(this._timeoutId)
          }

          this._timeoutId = window.setTimeout(() => {
            this.copied = false
            this._timeoutId = null
          }, this.timeout)

          this.$dispatch('copy', { value: this.value, copied: true })
        } catch (error) {
          console.error('Failed to copy to clipboard:', error)
          this.$dispatch('copy-error', { error })
        }
      },
    }
  }),

  parts: {
    root(api) {
      return {
        id: api.rootId,
        'data-scope': 'clipboard',
        'data-part': 'root',
        'x-bind:data-copied': () => (api.copied ? '' : undefined),
      }
    },

    label(api) {
      return {
        'data-scope': 'clipboard',
        'data-part': 'label',
        'x-bind:data-copied': () => (api.copied ? '' : undefined),
      }
    },

    control(api) {
      return {
        'data-scope': 'clipboard',
        'data-part': 'control',
        'x-bind:data-copied': () => (api.copied ? '' : undefined),
      }
    },

    trigger(api) {
      return {
        'data-scope': 'clipboard',
        'data-part': 'trigger',
        type: 'button',
        'x-bind:data-copied': () => (api.copied ? '' : undefined),
        'x-on:click'() {
          api.copy()
        },
      }
    },

    input(api) {
      return {
        'data-scope': 'clipboard',
        'data-part': 'input',
        type: 'text',
        'x-bind:value': () => api.value,
        'x-bind:data-copied': () => (api.copied ? '' : undefined),
        readonly: true,
      }
    },

    indicator(api) {
      return {
        'data-scope': 'clipboard',
        'data-part': 'indicator',
        'x-show': () => api.copied,
      }
    },
  },
})
