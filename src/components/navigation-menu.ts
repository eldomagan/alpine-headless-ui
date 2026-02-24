import { defineComponent, defineScope, setup } from 'alpine-define-component'
import { createPositioning, type Placement } from '../utils/positioning'
import type { PositioningResult } from '../utils/positioning'

interface Props {
  orientation?: 'horizontal' | 'vertical'
  delay?: number
  closeDelay?: number
  value?: string | null
  placement?: Placement
  offset?: number
}

interface ItemScope {
  value: string
  triggerId: string
  isActive: boolean
  hasContent: boolean
  open: () => void
  close: () => void
}

type NavigationMenuScopes = {
  $item: ItemScope
}

export default defineComponent({
  name: 'navigation-menu',

  setup: setup((props: Props, { generateId }) => {
    const rootId = generateId('root')
    const listId = generateId('list')
    const viewportId = generateId('viewport')

    let rootEl: HTMLElement | null = null
    let positionerEl: HTMLElement | null = null
    let openTimer: ReturnType<typeof setTimeout> | null = null
    let closeTimer: ReturnType<typeof setTimeout> | null = null
    let pointerType: string = 'mouse'

    const triggerElements = new Map<string, HTMLElement>()
    let arrowEl: HTMLElement | null = null
    const positioningResults = new Map<string, PositioningResult>()
    const contentValues = new Set<string>()

    const config = {
      orientation: props.orientation ?? 'horizontal',
      delay: props.delay ?? 50,
      closeDelay: props.closeDelay ?? 50,
      placement: props.placement ?? ('bottom' as Placement),
      offset: props.offset ?? 8,
    }

    return {
      rootId,
      listId,
      viewportId,
      _config: config,

      value: (props.value ?? null) as string | null,
      previousValue: null as string | null,
      itemValues: [] as string[],

      get isOpen() {
        return this.value !== null
      },

      get activationDirection(): 'forward' | 'backward' | 'none' {
        if (!this.previousValue || !this.value) {
          return 'none'
        }
        const prevIndex = this.itemValues.indexOf(this.previousValue)
        const currIndex = this.itemValues.indexOf(this.value)
        if (prevIndex < 0 || currIndex < 0) {
          return 'none'
        }
        return currIndex > prevIndex ? 'forward' : 'backward'
      },

      // --- Registration ---

      registerItem(value: string) {
        if (!this.itemValues.includes(value)) {
          this.itemValues.push(value)
        }
      },

      unregisterItem(value: string) {
        const idx = this.itemValues.indexOf(value)
        if (idx !== -1) {
          this.itemValues.splice(idx, 1)
        }
        triggerElements.delete(value)
        contentValues.delete(value)
      },

      registerTrigger(value: string, el: HTMLElement) {
        triggerElements.set(value, el)
      },

      registerPositioner(el: HTMLElement) {
        positionerEl = el
      },

      registerArrow(el: HTMLElement) {
        arrowEl = el
      },

      registerContent(value: string) {
        contentValues.add(value)
      },

      unregisterContent(value: string) {
        contentValues.delete(value)
      },

      hasContent(value: string): boolean {
        return contentValues.has(value)
      },

      getContentId(value: string): string {
        return `${rootId}-content-${value}`
      },

      getTriggerEl(value: string): HTMLElement | undefined {
        return triggerElements.get(value)
      },

      // --- Open / Close ---

      setValue(newValue: string | null) {
        if (this.value === newValue) {
          return
        }

        this._cleanupPositioning()

        this.previousValue = this.value
        this.value = newValue
        this.$dispatch('value-change', { value: newValue, previousValue: this.previousValue })

        if (newValue) {
          this.$nextTick(() => {
            this._setupPositioning()
          })
        } else if (positionerEl) {
          positionerEl.style.left = ''
          positionerEl.style.top = ''
        }
      },

      open(itemValue: string) {
        this._clearTimers()
        if (this.value === itemValue) {
          return
        }
        if (this.isOpen) {
          this.setValue(itemValue)
          return
        }
        openTimer = setTimeout(() => {
          this.setValue(itemValue)
        }, config.delay)
      },

      close() {
        this._clearTimers()
        if (!this.isOpen) {
          return
        }
        closeTimer = setTimeout(() => {
          this.setValue(null)
        }, config.closeDelay)
      },

      closeImmediate() {
        this._clearTimers()
        this.setValue(null)
      },

      _clearTimers() {
        if (openTimer) {
          clearTimeout(openTimer)
          openTimer = null
        }
        if (closeTimer) {
          clearTimeout(closeTimer)
          closeTimer = null
        }
      },

      // --- Positioning ---

      _setupPositioning() {
        if (!positionerEl || !this.value) {
          return
        }

        const triggerEl = triggerElements.get(this.value)
        if (!triggerEl) {
          return
        }

        const result = createPositioning(triggerEl, positionerEl, {
          placement: config.placement,
          offset: config.offset,
          arrow: arrowEl,
        })
        positioningResults.set('__pos__', result)
      },

      _cleanupPositioning() {
        const result = positioningResults.get('__pos__')
        if (result) {
          result.cleanup()
          positioningResults.delete('__pos__')
        }
      },

      // --- Hover intent ---

      handlePointerDown(event: PointerEvent) {
        pointerType = event.pointerType
      },

      handleTriggerPointerEnter(itemValue: string) {
        if (pointerType !== 'mouse') {
          return
        }
        this.open(itemValue)
      },

      handleTriggerPointerLeave() {
        if (pointerType !== 'mouse') {
          return
        }
        this.close()
      },

      handleContentPointerEnter() {
        this._clearTimers()
      },

      handleContentPointerLeave() {
        if (pointerType !== 'mouse') {
          return
        }
        this.close()
      },

      // --- Keyboard ---

      handleListKeydown(event: KeyboardEvent) {
        if (this.itemValues.length === 0) {
          return
        }

        const currentValue = this._getFocusedItemValue()
        if (!currentValue) {
          return
        }

        const currentIndex = this.itemValues.indexOf(currentValue)
        if (currentIndex === -1) {
          return
        }

        const isHorizontal = config.orientation === 'horizontal'
        const len = this.itemValues.length
        let nextIndex = currentIndex

        switch (event.key) {
          case 'ArrowRight':
            if (isHorizontal) {
              event.preventDefault()
              nextIndex = (currentIndex + 1) % len
            }
            break

          case 'ArrowLeft':
            if (isHorizontal) {
              event.preventDefault()
              nextIndex = (currentIndex - 1 + len) % len
            }
            break

          case 'ArrowDown':
            if (!isHorizontal) {
              event.preventDefault()
              nextIndex = (currentIndex + 1) % len
            } else if (this.isOpen && this.value === currentValue) {
              event.preventDefault()
              this._focusFirstContentLink()
              return
            }
            break

          case 'ArrowUp':
            if (!isHorizontal) {
              event.preventDefault()
              nextIndex = (currentIndex - 1 + len) % len
            }
            break

          case 'Home':
            event.preventDefault()
            nextIndex = 0
            break

          case 'End':
            event.preventDefault()
            nextIndex = len - 1
            break

          case 'Enter':
          case ' ':
            if (contentValues.has(currentValue)) {
              event.preventDefault()
              if (this.value === currentValue) {
                this.closeImmediate()
              } else {
                this.setValue(currentValue)
              }
            }
            return

          case 'Escape':
            if (this.isOpen) {
              event.preventDefault()
              const prevValue = this.value
              this.closeImmediate()
              if (prevValue) {
                const trigger = triggerElements.get(prevValue)
                if (trigger) {
                  trigger.focus()
                }
              }
            }
            return

          default:
            return
        }

        if (nextIndex !== currentIndex) {
          const nextValue = this.itemValues[nextIndex]
          if (nextValue) {
            const nextTrigger = triggerElements.get(nextValue)
            if (nextTrigger) {
              nextTrigger.focus()
            }
          }
        }
      },

      _getFocusedItemValue(): string | null {
        const focused = document.activeElement as HTMLElement
        if (!focused) {
          return null
        }
        for (const [value, el] of triggerElements.entries()) {
          if (el === focused || el.contains(focused)) {
            return value
          }
        }
        return null
      },

      _focusFirstContentLink() {
        if (!rootEl || !this.value) {
          return
        }
        this.$nextTick(() => {
          const contentEl = rootEl?.querySelector(
            `[data-scope="navigation-menu"][data-part="content"][data-value="${this.value}"]`
          ) as HTMLElement
          if (contentEl) {
            const firstLink = contentEl.querySelector(
              'a, [role="menuitem"]'
            ) as HTMLElement
            if (firstLink) {
              firstLink.focus()
            }
          }
        })
      },

      // --- Lifecycle ---

      _setRootEl(el: HTMLElement) {
        rootEl = el
      },

      destroy() {
        this._clearTimers()
        this._cleanupPositioning()
        positionerEl = null
        triggerElements.clear()
        arrowEl = null
        contentValues.clear()
        this.itemValues.length = 0
      },
    }
  }),

  parts: ({ withScopes }) =>
    withScopes<NavigationMenuScopes>({

      // --- ROOT ---
      root(api, el) {
        return {
          id: api.rootId,
          'data-scope': 'navigation-menu',
          'data-part': 'root',
          role: 'navigation',
          'aria-label': 'Main',
          'data-orientation': api._config.orientation,
          'x-bind:data-state': () => (api.isOpen ? 'open' : 'closed'),
          'x-modelable': 'value',
          'x-init'() {
            api._setRootEl(el)
          },
          'x-on:pointerdown'(event: PointerEvent) {
            api.handlePointerDown(event)
          },
        }
      },

      // --- LIST ---
      list(api) {
        return {
          id: api.listId,
          'data-scope': 'navigation-menu',
          'data-part': 'list',
          role: 'menubar',
          'data-orientation': api._config.orientation,
          'x-on:keydown'(event: KeyboardEvent) {
            api.handleListKeydown(event)
          },
        }
      },

      // --- ITEM (scope) ---
      item: defineScope({
        name: 'item',
        setup(api, _el, { value, generateId }) {
          const itemValue = String(value)
          const triggerId = generateId('trigger')

          api.registerItem(itemValue)

          return {
            value: itemValue,
            triggerId,

            get isActive() {
              return api.value === itemValue
            },

            get hasContent() {
              return api.hasContent(itemValue)
            },

            open() {
              api.setValue(itemValue)
            },

            close() {
              api.closeImmediate()
            },
          }
        },

        bindings(api, scope) {
          return {
            'data-scope': 'navigation-menu',
            'data-part': 'item',
            'data-value': scope.value,
            role: 'none',
            'x-bind:data-state': () => (scope.isActive ? 'open' : 'closed'),
            'x-destroy'() {
              api.unregisterItem(scope.value)
            },
          }
        },
      }),

      // --- TRIGGER ---
      trigger(api, el) {
        const itemValue = api.$item.value

        return {
          'x-bind:id': () => api.$item.triggerId,
          'data-scope': 'navigation-menu',
          'data-part': 'trigger',
          'data-value': itemValue,
          type: 'button',
          role: 'menuitem',
          'x-bind:aria-expanded': () => {
            if (!api.$item.hasContent) {
              return undefined
            }
            return api.$item.isActive
          },
          'x-bind:aria-controls': () => {
            if (!api.$item.hasContent) {
              return undefined
            }
            return api.getContentId(itemValue)
          },
          'x-bind:aria-haspopup': () => {
            if (!api.$item.hasContent) {
              return undefined
            }
            return 'menu'
          },
          'x-bind:tabindex': () => {
            if (api.value === itemValue) {
              return 0
            }
            if (!api.isOpen && api.itemValues.indexOf(itemValue) === 0) {
              return 0
            }
            return -1
          },
          'x-bind:data-state': () => (api.$item.isActive ? 'open' : 'closed'),
          'x-init'() {
            api.registerTrigger(itemValue, el)
          },
          'x-on:pointerenter'() {
            api.handleTriggerPointerEnter(itemValue)
          },
          'x-on:pointerleave'() {
            api.handleTriggerPointerLeave()
          },
          'x-on:click'() {
            if (api.$item.hasContent) {
              if (api.value === itemValue) {
                api.closeImmediate()
              } else {
                api.setValue(itemValue)
              }
            }
          },
        }
      },

      // --- POSITIONER ---
      positioner(api, el) {
        return {
          'data-scope': 'navigation-menu',
          'data-part': 'positioner',
          style: 'position: absolute;',
          'x-show': () => api.isOpen,
          'x-bind:data-state': () => (api.isOpen ? 'open' : 'closed'),
          'x-init'() {
            api.registerPositioner(el)
          },
          'x-on:pointerenter'() {
            api.handleContentPointerEnter()
          },
          'x-on:pointerleave'() {
            api.handleContentPointerLeave()
          },
        }
      },

      // --- CONTENT ---
      content(api, _el, { value: directValue }) {
        const itemValue = String(directValue)

        return {
          id: api.getContentId(itemValue),
          'data-scope': 'navigation-menu',
          'data-part': 'content',
          'data-value': itemValue,
          role: 'menu',
          'x-show': () => api.value === itemValue,
          'x-bind:data-state': () => (api.value === itemValue ? 'open' : 'closed'),
          'x-bind:data-activation-direction': () => api.activationDirection,
          'x-init'() {
            api.registerContent(itemValue)
          },
          'x-destroy'() {
            api.unregisterContent(itemValue)
          },
        }
      },

      // --- LINK ---
      link(api) {
        return {
          'data-scope': 'navigation-menu',
          'data-part': 'link',
          role: 'menuitem',
          tabindex: -1,
          'x-on:click'() {
            api.closeImmediate()
          },
          'x-on:keydown'(event: KeyboardEvent) {
            if (event.key === 'Escape') {
              event.preventDefault()
              const currentValue = api.value
              api.closeImmediate()
              if (currentValue) {
                const triggerEl = api.getTriggerEl(currentValue)
                if (triggerEl) {
                  triggerEl.focus()
                }
              }
            }
          },
        }
      },

      // --- VIEWPORT ---
      viewport(api) {
        return {
          id: api.viewportId,
          'data-scope': 'navigation-menu',
          'data-part': 'viewport',
          'x-bind:data-state': () => (api.isOpen ? 'open' : 'closed'),
          'x-bind:data-activation-direction': () => api.activationDirection,
        }
      },

      // --- ARROW (optional) ---
      arrow(api, el) {
        return {
          'data-scope': 'navigation-menu',
          'data-part': 'arrow',
          'aria-hidden': 'true',
          style: 'position: absolute;',
          'x-init'() {
            api.registerArrow(el)
          },
        }
      },

      // --- INDICATOR (optional) ---
      indicator(api) {
        return {
          'data-scope': 'navigation-menu',
          'data-part': 'indicator',
          'aria-hidden': 'true',
          'x-bind:data-state': () => (api.$item.isActive ? 'open' : 'closed'),
        }
      },
    }),
})
