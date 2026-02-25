let lockCount = 0
let originalBodyOverflow: string | null = null
let originalBodyPaddingRight: string | null = null

export function lockScroll() {
  if (lockCount === 0) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    originalBodyOverflow = document.body.style.overflow
    originalBodyPaddingRight = document.body.style.paddingRight

    document.body.style.overflow = 'hidden'

    // Add padding to prevent layout shift when scrollbar disappears
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`)
  }

  lockCount++
}

export function unlockScroll() {
  if (lockCount > 0) {
    lockCount--
  }

  if (lockCount === 0) {
    if (originalBodyOverflow !== null) {
      document.body.style.overflow = originalBodyOverflow
      originalBodyOverflow = null
    }

    if (originalBodyPaddingRight !== null) {
      document.body.style.paddingRight = originalBodyPaddingRight
      originalBodyPaddingRight = null
    }

    document.documentElement.style.removeProperty('--scrollbar-width')
  }
}
