import { defineComponent, defineScope, setup } from 'alpine-define-component'
import { animateCollapse } from '../utils/collapse-animation'

interface Props {
  value?: string[]
  multiple?: boolean
  collapsible?: boolean
  disabled?: boolean
}

const ITEM_TRIGGER_SELECTOR = '[data-scope="accordion"][data-part="item-trigger"]'

export default defineComponent({
  name: 'accordion',

  setup: setup((props: Props, { generateId }) => {
    const rootId = generateId('root')
    const multiple = props.multiple ?? false
    const initialValue =
      !multiple && (props.value?.length ?? 0) > 1
        ? [props.value![0]!]
        : props.value ?? []

    return {
      rootId,
      value: initialValue,
      multiple,
      collapsible: props.collapsible ?? true,
      disabled: props.disabled ?? false,
      focusedValue: null as string | null,
      itemIds: [] as string[],

      registerItem(id: string) {
        if (!this.itemIds.includes(id)) {
          this.itemIds.push(id)
        }
      },

      unregisterItem(id: string) {
        this.itemIds = this.itemIds.filter((itemId: string) => itemId !== id)
      },

      setValue(newValue: string[]) {
        this.value = newValue
        this.$dispatch('change', { value: newValue })
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

      handleRootKeydown(event: KeyboardEvent) {
        if (this.disabled || this.itemIds.length === 0) {
          return
        }

        const target = event.target as HTMLElement | null
        if (!target || !target.matches(ITEM_TRIGGER_SELECTOR)) {
          return
        }

        const itemId = target.getAttribute('data-value')
        if (!itemId) {
          return
        }

        const currentIndex = this.itemIds.indexOf(itemId)
        if (currentIndex === -1) {
          return
        }

        let nextIndex = currentIndex

        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault()
            nextIndex = Math.min(currentIndex + 1, this.itemIds.length - 1)
            break
          case 'ArrowUp':
            event.preventDefault()
            nextIndex = Math.max(currentIndex - 1, 0)
            break
          case 'Home':
            event.preventDefault()
            nextIndex = 0
            break
          case 'End':
            event.preventDefault()
            nextIndex = this.itemIds.length - 1
            break
          default:
            return
        }

        if (nextIndex !== currentIndex) {
          const nextItemId = this.itemIds[nextIndex] as string
          const nextTriggerId = `${this.rootId}-trigger-${nextItemId}`
          const el = document.getElementById(nextTriggerId) as HTMLElement | null
          el?.focus()
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
          'x-bind:data-disabled': () => (api.disabled ? '' : undefined),
          'x-on:keydown'(event: KeyboardEvent) {
            api.handleRootKeydown(event)
          },
        }
      },

      item: defineScope({
        name: 'item',
        setup: (api, _, { value, generateId, cleanup }) => {
          const id = value ?? generateId('item')
          const triggerId = `${api.rootId}-trigger-${id}`
          const contentId = `${api.rootId}-content-${id}`

          api.registerItem(id)
          cleanup(() => api.unregisterItem(id))

          return {
            id,
            triggerId,
            contentId,
            get disabled() {
              return api.disabled
            },
            get opened() {
              return api.isOpen(id)
            },
            toggle() {
              api.toggle(id)
            },
          }
        },
        bindings: (_, scope) => ({
          'x-bind:data-state': () => (scope.opened ? 'open' : 'closed'),
          'x-bind:data-disabled': () => (scope.disabled ? '' : undefined),
        }),
      }),

      itemHeader() {
        return {
          role: 'heading',
        }
      },

      itemTrigger(api) {
        return {
          'x-bind:id': () => api.$item.triggerId,
          'x-bind:data-value': () => api.$item.id,
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
          role: 'region',
          'x-bind:aria-labelledby': () => api.$item.triggerId,
          'x-bind:data-state': () => (api.$item.opened ? 'open' : 'closed'),
          'x-bind:data-disabled': () => (api.$item.disabled ? '' : undefined),
          'x-init'(this: any) {
            const el = this.$el as HTMLElement
            let isAnimating = false

            if (!api.$item.opened) {
              el.style.display = 'none'
              el.style.height = '0px'
              el.style.overflow = 'hidden'
            }

            this.$watch(() => api.$item.opened, (isOpen: boolean) => {
              if (isAnimating) {
                return
              }

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
          'x-bind:data-state': () => (api.$item.opened ? 'open' : 'closed'),
          'x-bind:data-disabled': () => (api.$item.disabled ? '' : undefined),
        }
      },
    }),
})
