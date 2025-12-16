import { defineComponent, setup } from 'alpine-define-component'

interface Props {
  value?: string
  orientation?: 'horizontal' | 'vertical'
  activationMode?: 'automatic' | 'manual'
  disabled?: boolean
  loop?: boolean
}

export default defineComponent({
  name: 'tabs',

  setup: setup((props: Props, { generateId }) => {
    const rootId = generateId('root')
    const listId = generateId('list')

    const config = {
      orientation: props.orientation ?? 'horizontal',
      activationMode: props.activationMode ?? 'automatic',
      disabled: props.disabled ?? false,
      loop: props.loop ?? true,
    }

    return {
      rootId,
      listId,
      _config: config,

      value: props.value ?? '',
      focusedValue: '',
      tabIds: [] as string[],

      init() {
        this.$nextTick(() => {
          if (!this.value && this.tabIds.length > 0) {
            this.value = this.tabIds[0] as string
            this.focusedValue = this.tabIds[0] as string
          }
        })
      },

      registerTab(id: string) {
        if (!this.tabIds.includes(id)) {
          this.tabIds.push(id)
        }
      },

      unregisterTab(id: string) {
        this.tabIds = this.tabIds.filter((tabId) => tabId !== id)
      },

      setValue(newValue: string, dispatch = false) {
        if (config.disabled) {
          return
        }

        const changed = this.value !== newValue
        this.value = newValue

        if (dispatch && changed) {
          this.$dispatch('change', { value: newValue })
        }
      },

      setFocusedValue(newValue: string) {
        this.focusedValue = newValue

        // In automatic mode, also update the selected value
        if (config.activationMode === 'automatic') {
          this.setValue(newValue, true)
        }
      },

      selectTab(id: string) {
        this.setValue(id, true)
        this.focusedValue = id
      },

      handleListKeydown(event: KeyboardEvent) {
        if (config.disabled || this.tabIds.length === 0) {
          return
        }

        const currentIndex = this.tabIds.indexOf(this.focusedValue || this.value)
        if (currentIndex === -1) {
          return
        }

        const isHorizontal = config.orientation === 'horizontal'
        let nextIndex = currentIndex

        switch (event.key) {
          case 'ArrowRight':
          case 'ArrowDown':
            if ((event.key === 'ArrowRight' && isHorizontal) || (event.key === 'ArrowDown' && !isHorizontal)) {
              event.preventDefault()
              nextIndex = currentIndex + 1
              if (nextIndex >= this.tabIds.length) {
                nextIndex = config.loop ? 0 : this.tabIds.length - 1
              }
            }
            break

          case 'ArrowLeft':
          case 'ArrowUp':
            if ((event.key === 'ArrowLeft' && isHorizontal) || (event.key === 'ArrowUp' && !isHorizontal)) {
              event.preventDefault()
              nextIndex = currentIndex - 1
              if (nextIndex < 0) {
                nextIndex = config.loop ? this.tabIds.length - 1 : 0
              }
            }
            break

          case 'Home':
            event.preventDefault()
            nextIndex = 0
            break

          case 'End':
            event.preventDefault()
            nextIndex = this.tabIds.length - 1
            break

          case 'Enter':
          case ' ':
            // In manual mode, activate on Enter/Space
            if (config.activationMode === 'manual') {
              event.preventDefault()
              this.setValue(this.focusedValue, true)
            }
            return

          default:
            return
        }

        if (nextIndex !== currentIndex && this.tabIds[nextIndex]) {
          const nextTabId = this.tabIds[nextIndex]
          this.setFocusedValue(nextTabId as string)

          // Focus the trigger element
          this.$nextTick(() => {
            const triggerEl = document.querySelector(
              `[data-scope="tabs"][data-part="trigger"][data-value="${nextTabId}"]`
            ) as HTMLElement
            triggerEl?.focus()
          })
        }
      },
    }
  }),

  parts: {
    root(api) {
      return {
        'data-scope': 'tabs',
        'data-part': 'root',
        id: api.rootId,
        ':data-disabled': () => (api._config.disabled ? '' : undefined),
        'data-orientation': api._config.orientation,
        'x-modelable': 'value',
      }
    },

    list(api) {
      return {
        'data-scope': 'tabs',
        'data-part': 'list',
        id: api.listId,
        role: 'tablist',
        ':aria-orientation': () => api._config.orientation,
        'x-on:keydown'(event: KeyboardEvent) {
          api.handleListKeydown(event)
        },
      }
    },

    trigger(api, _el, { value }) {
      const tabId = String(value)
      const triggerId = `${api.rootId}-trigger-${tabId}`
      const contentId = `${api.rootId}-content-${tabId}`

      return {
        'data-scope': 'tabs',
        'data-part': 'trigger',
        'data-value': tabId,
        id: triggerId,
        role: 'tab',
        type: 'button',
        ':tabindex': () => (api.value === tabId ? 0 : -1),
        ':aria-selected': () => api.value === tabId,
        'aria-controls': contentId,
        ':data-state': () => (api.value === tabId ? 'active' : 'inactive'),
        ':disabled': () => api._config.disabled,
        'x-on:click'() {
          api.selectTab(tabId)
        },
        'x-on:focus'() {
          api.setFocusedValue(tabId)
        },
        'x-init'() {
          api.registerTab(tabId)
        },
        'x-destroy'() {
          api.unregisterTab(tabId)
        },
      }
    },

    content(api, _el, { value }) {
      const tabId = String(value)
      const triggerId = `${api.rootId}-trigger-${tabId}`
      const contentId = `${api.rootId}-content-${tabId}`

      return {
        'data-scope': 'tabs',
        'data-part': 'content',
        'data-value': tabId,
        id: contentId,
        role: 'tabpanel',
        tabindex: 0,
        'aria-labelledby': triggerId,
        ':data-state': () => (api.value === tabId ? 'active' : 'inactive'),
        'x-bind:hidden': () => (api.value !== tabId ? true : undefined),
      }
    },

    indicator(_api) {
      return {
        'data-scope': 'tabs',
        'data-part': 'indicator',
      }
    },
  },
})
