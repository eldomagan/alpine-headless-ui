import { defineComponent, defineScope, setup } from 'alpine-define-component'
import { animateCollapse } from '../utils/collapse-animation'

interface Props {
  value?: string[]
  multiple?: boolean
  collapsible?: boolean
  disabled?: boolean
}

export default defineComponent({
  name: 'accordion',

  setup: setup((props: Props, { generateId }) => {
    const rootId = generateId('root')

    return {
      rootId,
      value: props.value ?? [],
      multiple: props.multiple ?? false,
      collapsible: props.collapsible ?? true,
      disabled: props.disabled ?? false,
      focusedValue: null as string | null,

      init() {
        if (!this.multiple && this.value.length > 1 && this.value[0]) {
          this.value = [this.value[0]]
        }
      },

      setValue(newValue: string[]) {
        const changed = JSON.stringify(this.value) !== JSON.stringify(newValue)
        this.value = newValue

        if (changed) {
          this.$dispatch('change', { value: newValue })
        }
      },

      toggle(id: string) {
        if (this.disabled) {
          return
        }

        const isOpen = this.value.includes(id)

        if (isOpen) {
          if (!this.collapsible && this.value.length === 1) {
            return
          }
          this.setValue(this.value.filter((i: string) => i !== id))
        } else {
          if (this.multiple) {
            this.setValue([...this.value, id])
          } else {
            this.setValue([id])
          }
        }
      },

      isOpen(id: string) {
        return this.value.includes(id)
      },

      setFocusedValue(id: string | null) {
        const changed = this.focusedValue !== id
        this.focusedValue = id

        if (changed) {
          this.$dispatch('focus-change', { value: id })
        }
      },
    }
  }),

  parts: ({ withScopes }) =>
    withScopes<{
      $item: {
        id: string
        disabled: boolean
        triggerId: string
        contentId: string
        opened: boolean
        toggle: () => void
      }
    }>({
      root(api) {
      return {
        id: api.rootId,
        'data-scope': 'accordion',
        'data-part': 'root',
        'x-bind:data-disabled': () => (api.disabled ? '' : undefined),
        'x-on:keydown.down.prevent'(this: any, event: KeyboardEvent) {
          const triggers = Array.from(this.$el.querySelectorAll('[data-scope="accordion"][data-part="item-trigger"]'))
          const currentIndex = triggers.findIndex((t: any) => t === event.target)
          if (currentIndex < triggers.length - 1) {
            ;(triggers[currentIndex + 1] as HTMLElement).focus()
          }
        },
        'x-on:keydown.up.prevent'(this: any, event: KeyboardEvent) {
          const triggers = Array.from(this.$el.querySelectorAll('[data-scope="accordion"][data-part="item-trigger"]'))
          const currentIndex = triggers.findIndex((t: any) => t === event.target)
          if (currentIndex > 0) {
            ;(triggers[currentIndex - 1] as HTMLElement).focus()
          }
        },
        'x-on:keydown.home.prevent'(this: any) {
          const triggers = this.$el.querySelectorAll('[data-scope="accordion"][data-part="item-trigger"]')
          if (triggers.length > 0) {
            ;(triggers[0] as HTMLElement).focus()
          }
        },
        'x-on:keydown.end.prevent'(this: any) {
          const triggers = this.$el.querySelectorAll('[data-scope="accordion"][data-part="item-trigger"]')
          if (triggers.length > 0) {
            ;(triggers[triggers.length - 1] as HTMLElement).focus()
          }
        },
      }
    },

      item: defineScope({
        name: 'item',
        setup: (api, _, { value, generateId }) => {
          const id = value ?? generateId('item')
          const disabled = api.disabled
          const triggerId = generateId('trigger')
          const contentId = generateId('content')

          return {
            id,
            disabled,
            triggerId,
            contentId,
            get opened() {
              return api.isOpen(id)
            },
            toggle() {
              api.toggle(id)
            },
          }
        },
        bindings: (_, scope) => ({
          'data-scope': 'accordion',
          'data-part': 'item',
          'x-bind:data-state': () => (scope.opened ? 'open' : 'closed'),
          'x-bind:data-disabled': () => (scope.disabled ? '' : undefined),
        }),
      }),

      itemTrigger(api) {
        return {
          'x-bind:id': () => api.$item.triggerId,
          'data-scope': 'accordion',
          'data-part': 'item-trigger',
          type: 'button',
          'x-bind:aria-controls': () => api.$item.contentId,
          'x-bind:aria-expanded': () => api.$item.opened,
          'x-bind:data-state': () => (api.$item.opened ? 'open' : 'closed'),
          'x-bind:data-disabled': () => (api.$item.disabled ? '' : undefined),
          'x-bind:disabled': () => api.$item.disabled,
          'x-on:click'() {
            if (!api.$item.disabled) {
              api.$item.toggle()
            }
          },
          'x-on:focus'() {
            api.setFocusedValue(api.$item.id)
          },
          'x-on:blur'() {
            api.setFocusedValue(null)
          },
        }
      },

      itemContent(api) {
        return {
          'x-bind:id': () => api.$item.contentId,
          'data-scope': 'accordion',
          'data-part': 'item-content',
          role: 'region',
          'x-bind:data-state': () => (api.$item.opened ? 'open' : 'closed'),
          'x-bind:data-disabled': () => (api.$item.disabled ? '' : undefined),
          'x-init'(this: any) {
            const el = this.$el as HTMLElement
            let isAnimating = false

            const initialOpen = api.$item.opened
            if (!initialOpen) {
              el.style.display = 'none'
              el.style.height = '0px'
              el.style.overflow = 'hidden'
            }

            this.$watch(() => api.value, () => {
              if (isAnimating) {
                return
              }

              const isOpen = api.$item.opened
              const currentlyVisible = el.style.display !== 'none'

              if (isOpen === currentlyVisible) {
                return
              }

              isAnimating = true
              animateCollapse(el, isOpen, {
                onComplete: () => {
                  isAnimating = false
                },
              })
            })
          },
        }
      },

      itemIndicator(api) {
        return {
          'data-scope': 'accordion',
          'data-part': 'item-indicator',
          'x-bind:data-state': () => (api.$item.opened ? 'open' : 'closed'),
          'x-bind:data-disabled': () => (api.$item.disabled ? '' : undefined),
        }
      },
    }),
})
