import { defineComponent, setup } from 'alpine-define-component'
import { createFocusTrap } from '../utils/focus-trap'
import { lockScroll, unlockScroll } from '../utils/scroll-lock'

interface Props {
  name?: string
  open?: boolean
  modal?: boolean
  closeOnInteractOutside?: boolean
  closeOnEscape?: boolean
  trapFocus?: boolean
  preventScroll?: boolean
  role?: 'dialog' | 'alertdialog'
}

export default defineComponent({
  name: 'dialog',

  setup: setup((props: Props, { generateId }) => {
    const rootId = generateId('root')
    const triggerId = generateId('trigger')
    const backdropId = generateId('backdrop')
    const positionerId = generateId('positioner')
    const contentId = generateId('content')
    const titleId = generateId('title')
    const descriptionId = generateId('description')

    const config = {
      name: props.name,
      modal: props.modal ?? true,
      closeOnInteractOutside: props.closeOnInteractOutside ?? true,
      closeOnEscape: props.closeOnEscape ?? true,
      trapFocus: props.trapFocus ?? true,
      preventScroll: props.preventScroll ?? true,
      role: props.role ?? 'dialog',
    }

    return {
      rootId,
      triggerId,
      backdropId,
      positionerId,
      contentId,
      titleId,
      descriptionId,
      _config: config,

      isOpen: props.open ?? false,
      _contentEl: null as HTMLElement | null,
      _focusTrap: null as ReturnType<typeof createFocusTrap> | null,

      open() {
        if (this.isOpen) {
          return
        }

        this.isOpen = true
        this.$dispatch('open', { open: true })

        this.$nextTick(() => {
          if (this._config.modal && this._config.preventScroll) {
            lockScroll()
          }

          if (this._config.modal && this._config.trapFocus && this._contentEl) {
            this._focusTrap = createFocusTrap(this._contentEl)
            this._focusTrap.attachListeners()
            this._focusTrap.activate()
          }
        })
      },

      close() {
        if (!this.isOpen) {
          return
        }

        this.isOpen = false
        this.$dispatch('close', { open: false })

        if (this._focusTrap) {
          this._focusTrap.detachListeners()
          this._focusTrap.deactivate()
          this._focusTrap = null
        }

        if (this._config.modal && this._config.preventScroll) {
          unlockScroll()
        }
      },

      toggle() {
        if (this.isOpen) {
          this.close()
        } else {
          this.open()
        }
      },
    }
  }),

  parts: {
    root(api) {
      return {
        id: api.rootId,
        'data-scope': 'dialog',
        'data-part': 'root',
        'x-bind:data-state': () => (api.isOpen ? 'open' : 'closed'),
        'x-on:modal:open.window'(e: CustomEvent<string>) {
          if (api._config.name && api._config.name === e.detail) {
            api.open()
          }
        },
        'x-on:modal:close.window'(e: CustomEvent<string>) {
          if (api._config.name && api._config.name === e.detail) {
            api.close()
          }
        },
      }
    },

    trigger(api) {
      return {
        id: api.triggerId,
        'data-scope': 'dialog',
        'data-part': 'trigger',
        type: 'button',
        'aria-haspopup': 'dialog',
        'x-bind:aria-expanded': () => api.isOpen,
        'x-on:click'() {
          api.open()
        },
      }
    },

    backdrop(api) {
      return {
        id: api.backdropId,
        'data-scope': 'dialog',
        'data-part': 'backdrop',
        'x-show': () => api.isOpen,
        'x-on:click'() {
          if (api._config.closeOnInteractOutside) {
            api.close()
          }
        },
      }
    },

    positioner(api) {
      return {
        id: api.positionerId,
        'data-scope': 'dialog',
        'data-part': 'positioner',
        'x-show': () => api.isOpen,
        'x-on:click.self'() {
          if (api._config.closeOnInteractOutside) {
            api.close()
          }
        },
      }
    },

    content(api, el) {
      return {
        id: api.contentId,
        'data-scope': 'dialog',
        'data-part': 'content',
        role: api._config.role,
        'x-bind:aria-modal': () => (api._config.modal ? 'true' : undefined),
        'x-bind:aria-labelledby': () => api.titleId,
        'x-bind:aria-describedby': () => api.descriptionId,
        'x-init'() {
          api._contentEl = el
        },
        'x-on:keydown.escape'() {
          if (api._config.closeOnEscape) {
            api.close()
          }
        },
      }
    },

    title(api) {
      return {
        id: api.titleId,
        'data-scope': 'dialog',
        'data-part': 'title',
      }
    },

    description(api) {
      return {
        id: api.descriptionId,
        'data-scope': 'dialog',
        'data-part': 'description',
      }
    },

    closeTrigger(api) {
      return {
        'data-scope': 'dialog',
        'data-part': 'close-trigger',
        type: 'button',
        'x-on:click'() {
          api.close()
        },
      }
    },
  },
})
