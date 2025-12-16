import { defineComponent, setup } from 'alpine-define-component'
import { createFocusTrap } from '../utils/focus-trap'
import { createPositioning, type Placement } from '../utils/positioning'
import type { PositioningResult } from '../utils/positioning'

interface Props {
  name?: string
  open?: boolean
  modal?: boolean
  closeOnInteractOutside?: boolean
  closeOnEscape?: boolean
  trapFocus?: boolean
  placement?: Placement
  offset?: number
}

export default defineComponent({
  name: 'popover',

  setup: setup((props: Props, { generateId }) => {
    const rootId = generateId('root')
    const triggerId = generateId('trigger')
    const positionerId = generateId('positioner')
    const contentId = generateId('content')
    const titleId = generateId('title')
    const descriptionId = generateId('description')
    const arrowId = generateId('arrow')
    const arrowTipId = generateId('arrow-tip')

    const config = {
      name: props.name,
      modal: props.modal ?? false,
      closeOnInteractOutside: props.closeOnInteractOutside ?? true,
      closeOnEscape: props.closeOnEscape ?? true,
      trapFocus: props.trapFocus ?? false,
      placement: props.placement ?? 'bottom',
      offset: props.offset ?? 8,
    }

    return {
      rootId,
      triggerId,
      positionerId,
      contentId,
      titleId,
      descriptionId,
      arrowId,
      arrowTipId,
      _config: config,

      isOpen: props.open ?? false,
      _triggerEl: null as HTMLElement | null,
      _positionerEl: null as HTMLElement | null,
      _arrowEl: null as HTMLElement | null,
      _arrowTipEl: null as HTMLElement | null,
      _focusTrap: null as ReturnType<typeof createFocusTrap> | null,
      _positioning: null as PositioningResult | null,

      open() {
        if (this.isOpen) {
          return
        }

        this.isOpen = true
        this.$dispatch('open', { open: true })

        this.$nextTick(() => {
          if (this._triggerEl && this._positionerEl) {
            this._positioning = createPositioning(
              this._triggerEl,
              this._positionerEl,
              {
                placement: this._config.placement,
                offset: this._config.offset,
                arrow: this._arrowEl,
                arrowTip: this._arrowTipEl,
              }
            )
          }

          if (this._config.modal && this._config.trapFocus && this._positionerEl) {
            this._focusTrap = createFocusTrap(this._positionerEl)
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

        if (this._positioning) {
          this._positioning.cleanup()
          this._positioning = null
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
        'data-scope': 'popover',
        'data-part': 'root',
        'x-bind:data-state': () => (api.isOpen ? 'open' : 'closed'),
        'x-on:popover:open.window'(e: CustomEvent<string>) {
          if (api._config.name && api._config.name === e.detail) {
            api.open()
          }
        },
        'x-on:popover:close.window'(e: CustomEvent<string>) {
          if (api._config.name && api._config.name === e.detail) {
            api.close()
          }
        },
      }
    },

    trigger(api, el) {
      return {
        id: api.triggerId,
        'data-scope': 'popover',
        'data-part': 'trigger',
        type: 'button',
        'aria-haspopup': 'dialog',
        'x-bind:aria-expanded': () => api.isOpen,
        'x-bind:data-state': () => (api.isOpen ? 'open' : 'closed'),
        'x-init'() {
          api._triggerEl = el
        },
        'x-on:click'() {
          api.toggle()
        },
      }
    },

    positioner(api, el) {
      return {
        id: api.positionerId,
        'data-scope': 'popover',
        'data-part': 'positioner',
        'x-show': () => api.isOpen,
        'x-bind:data-state': () => (api.isOpen ? 'open' : 'closed'),
        'x-init'() {
          api._positionerEl = el
        },
      }
    },

    content(api) {
      return {
        id: api.contentId,
        'data-scope': 'popover',
        'data-part': 'content',
        role: 'dialog',
        'x-bind:aria-modal': () => (api._config.modal ? 'true' : undefined),
        'x-bind:aria-labelledby': () => api.titleId,
        'x-bind:aria-describedby': () => api.descriptionId,
        'x-on:keydown.escape'() {
          if (api._config.closeOnEscape) {
            api.close()
          }
        },
        'x-on:click.outside'() {
          if (api._config.closeOnInteractOutside) {
            api.close()
          }
        },
      }
    },

    arrow(api, el) {
      return {
        id: api.arrowId,
        'data-scope': 'popover',
        'data-part': 'arrow',
        'x-init'() {
          api._arrowEl = el
        },
        style: 'position: absolute;',
      }
    },

    arrowTip(api, el) {
      return {
        id: api.arrowTipId,
        'data-scope': 'popover',
        'data-part': 'arrow-tip',
        'x-init'() {
          api._arrowTipEl = el
        },
      }
    },

    title(api) {
      return {
        id: api.titleId,
        'data-scope': 'popover',
        'data-part': 'title',
      }
    },

    description(api) {
      return {
        id: api.descriptionId,
        'data-scope': 'popover',
        'data-part': 'description',
      }
    },

    closeTrigger(api) {
      return {
        'data-scope': 'popover',
        'data-part': 'close-trigger',
        type: 'button',
        'x-on:click'() {
          api.close()
        },
      }
    },
  },
})
