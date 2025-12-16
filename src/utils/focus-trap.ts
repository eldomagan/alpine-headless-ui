const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  'iframe',
  'object',
  'embed',
  '[contenteditable]',
  '[tabindex]:not([tabindex^="-"])',
].join(',')

export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const elements = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
  return elements.filter((el) => {
    const style = window.getComputedStyle(el)
    return style.display !== 'none' && style.visibility !== 'hidden' && el.offsetParent !== null
  })
}

export function createFocusTrap(container: HTMLElement) {
  let previouslyFocusedElement: HTMLElement | null = null

  const activate = () => {
    previouslyFocusedElement = document.activeElement as HTMLElement

    const focusableElements = getFocusableElements(container)
    if (focusableElements.length > 0) {
      focusableElements[0]?.focus()
    }
  }

  const deactivate = () => {
    if (previouslyFocusedElement && previouslyFocusedElement.focus) {
      previouslyFocusedElement.focus()
    }
  }

  const handleTabKey = (e: KeyboardEvent) => {
    const focusableElements = getFocusableElements(container)
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement?.focus()
        e.preventDefault()
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement?.focus()
        e.preventDefault()
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      handleTabKey(e)
    }
  }

  const attachListeners = () => {
    document.addEventListener('keydown', handleKeyDown)
  }

  const detachListeners = () => {
    document.removeEventListener('keydown', handleKeyDown)
  }

  return {
    activate,
    deactivate,
    attachListeners,
    detachListeners,
  }
}
