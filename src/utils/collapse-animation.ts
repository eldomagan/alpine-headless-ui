export function animateCollapse(
  el: HTMLElement,
  show: boolean,
  options?: {
    duration?: number
    onComplete?: () => void
  }
) {
  const duration = options?.duration ?? 250
  const onComplete = options?.onComplete

  if (show) {
    el.style.height = '0px'
    el.style.overflow = 'hidden'
    el.style.display = 'block'

    requestAnimationFrame(() => {
      const endHeight = el.scrollHeight
      el.style.transition = `height ${duration}ms cubic-bezier(0.4, 0.0, 0.2, 1)`
      el.style.height = `${endHeight}px`

      const onTransitionEnd = () => {
        el.style.height = ''
        el.style.overflow = ''
        el.style.transition = ''
        el.removeEventListener('transitionend', onTransitionEnd)
        if (onComplete) {
          onComplete()
        }
      }
      el.addEventListener('transitionend', onTransitionEnd)
    })
  } else {
    const startHeight = el.scrollHeight
    el.style.height = `${startHeight}px`
    el.style.overflow = 'hidden'

    requestAnimationFrame(() => {
      el.style.transition = `height ${duration}ms cubic-bezier(0.4, 0.0, 0.2, 1)`
      el.style.height = '0px'

      const onTransitionEnd = () => {
        el.style.display = 'none'
        el.style.transition = ''
        el.removeEventListener('transitionend', onTransitionEnd)
        if (onComplete) {
          onComplete()
        }
      }
      el.addEventListener('transitionend', onTransitionEnd)
    })
  }
}
