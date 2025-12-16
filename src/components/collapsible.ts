import { defineComponent, setup } from 'alpine-define-component'
import { animateCollapse } from '../utils/collapse-animation'

interface Props {
  open?: boolean
  disabled?: boolean
}

export default defineComponent({
  name: 'collapsible',

  setup: setup((props: Props, { generateId }) => {
    const rootId = generateId('root')
    const triggerId = generateId('trigger')
    const contentId = generateId('content')

    return {
      rootId,
      triggerId,
      contentId,

      open: props.open ?? false,
      disabled: props.disabled ?? false,
      contentEl: null as HTMLElement | null,
      isInitialized: false,

      get visible() {
        return this.open
      },

      setOpen(value: boolean) {
        if (this.disabled) {
          return
        }

        const changed = this.open !== value
        this.open = value

        if (changed) {
          this.$dispatch('change', { open: value })

          if (this.isInitialized && this.contentEl) {
            animateCollapse(this.contentEl, value)
          }
        }
      },

      toggle() {
        if (this.disabled) {
          return
        }

        this.setOpen(!this.open)
      },

    }
  }),

  parts: {
    root(api) {
      return {
        id: api.rootId,
        'data-scope': 'collapsible',
        'data-part': 'root',
        'x-bind:data-state': () => (api.open ? 'open' : 'closed'),
        'x-bind:data-disabled': () => (api.disabled ? '' : undefined),
      }
    },

    trigger(api) {
      return {
        id: api.triggerId,
        'data-scope': 'collapsible',
        'data-part': 'trigger',
        type: 'button',
        'aria-controls': api.contentId,
        'x-bind:aria-expanded': () => api.open,
        'x-bind:data-state': () => (api.open ? 'open' : 'closed'),
        'x-bind:data-disabled': () => (api.disabled ? '' : undefined),
        'x-bind:disabled': () => api.disabled,
        'x-on:click'() {
          api.toggle()
        },
      }
    },

    content(api) {
      return {
        id: api.contentId,
        'data-scope': 'collapsible',
        'data-part': 'content',
        'x-bind:data-state': () => (api.open ? 'open' : 'closed'),
        'x-bind:data-disabled': () => (api.disabled ? '' : undefined),
        'x-init'(this: typeof api) {
          api.contentEl = this.$el as HTMLElement

          if (!api.open) {
            this.$el.style.display = 'none'
            this.$el.style.height = '0px'
            this.$el.style.overflow = 'hidden'
          }

          this.$nextTick(() => {
            api.isInitialized = true
          })
        },
      }
    },

    indicator(api) {
      return {
        'data-scope': 'collapsible',
        'data-part': 'indicator',
        'x-bind:data-state': () => (api.open ? 'open' : 'closed'),
        'x-bind:data-disabled': () => (api.disabled ? '' : undefined),
      }
    },
  },
})
