import { defineScope, defineComponent, setup } from 'alpine-define-component'

interface AutoplayConfig {
  delay?: number
  pauseOnHover?: boolean
  pauseOnFocus?: boolean
}

interface A11yConfig {
  enabled?: boolean
  prevSlideMessage?: string
  nextSlideMessage?: string
}

interface Props {
  slidesPerView?: number
  spaceBetween?: number
  loop?: boolean
  keyboard?: boolean
  draggable?: boolean
  freeMode?: boolean
  threshold?: number
  resistance?: boolean
  autoplay?: boolean | AutoplayConfig
  speed?: number
  easing?: string
  breakpoints?: Record<string, Partial<Props>>
  a11y?: A11yConfig
  label?: string
  labelledBy?: string
}

interface SlideScope {
  index: number
  isActive: boolean
  isPrev: boolean
  isNext: boolean
  isVisible: boolean
  activate(): void
}

interface PaginationScope {
  index: number
  isActive: boolean
  label: string
  goTo(): void
}

type CarouselScopes = {
  $slide: SlideScope
  $pagination: PaginationScope
}

type NormalizedAutoplay = {
  delay: number
  pauseOnHover: boolean
  pauseOnFocus: boolean
} | null

type PauseSource = 'hover' | 'focus' | 'drag'

type Config = {
  slidesPerView: number
  spaceBetween: number
  loop: boolean
  keyboard: boolean
  draggable: boolean
  freeMode: boolean
  threshold: number
  resistance: boolean
  speed: number
  easing: string
  autoplay: NormalizedAutoplay
  a11y: Required<A11yConfig>
  breakpoints: Record<string, Partial<Props>>
  label?: string
  labelledBy?: string
}

function normalizeAutoplay(value: boolean | AutoplayConfig | undefined): NormalizedAutoplay {
  if (typeof value === 'object' && value !== null) {
    return {
      delay: value.delay ?? 3000,
      pauseOnHover: value.pauseOnHover ?? true,
      pauseOnFocus: value.pauseOnFocus ?? true,
    }
  }

  if (value) {
    return { delay: 3000, pauseOnHover: true, pauseOnFocus: true }
  }

  return null
}

function assignSettings(config: Config, input: Partial<Props>): void {
  if (input.slidesPerView !== undefined) {
    config.slidesPerView = Math.max(1, input.slidesPerView)
  }

  if (input.spaceBetween !== undefined) {
    config.spaceBetween = input.spaceBetween
  }

  if (input.loop !== undefined) {
    config.loop = input.loop
  }

  if (input.keyboard !== undefined) {
    config.keyboard = input.keyboard
  }

  if (input.draggable !== undefined) {
    config.draggable = input.draggable
  }

  if (input.freeMode !== undefined) {
    config.freeMode = input.freeMode
  }

  if (input.threshold !== undefined) {
    config.threshold = input.threshold
  }

  if (input.resistance !== undefined) {
    config.resistance = input.resistance
  }

  if (input.speed !== undefined) {
    config.speed = input.speed
  }

  if (input.easing !== undefined) {
    config.easing = input.easing
  }

  if (input.autoplay !== undefined) {
    config.autoplay = normalizeAutoplay(input.autoplay)
  }

  if (input.a11y !== undefined) {
    config.a11y = { ...config.a11y, ...input.a11y }
  }

  if (input.breakpoints !== undefined) {
    config.breakpoints = input.breakpoints
  }

  if (input.label !== undefined) {
    config.label = input.label
  }

  if (input.labelledBy !== undefined) {
    config.labelledBy = input.labelledBy
  }
}

export default defineComponent({
  name: 'carousel',

  setup: setup((props: Props, { generateId }) => {
    const rootId = generateId('root')
    const viewportId = generateId('viewport')

    const config: Config = {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: false,
      keyboard: true,
      draggable: true,
      freeMode: false,
      threshold: 20,
      resistance: true,
      speed: 300,
      easing: 'ease',
      autoplay: null,
      a11y: {
        enabled: true,
        prevSlideMessage: 'Previous slide',
        nextSlideMessage: 'Next slide',
      },
      breakpoints: {},
      label: undefined,
      labelledBy: undefined,
    }

    assignSettings(config, props)

    let originalSpeed = config.speed

    let rootEl: HTMLElement | null = null
    let viewportEl: HTMLElement | null = null
    let trackEl: HTMLElement | null = null
    let destroyed = false
    let isRtl = false
    let lastTransition = ''

    let trackOffset = 0
    let containerWidth = 0

    let autoplayTimer: ReturnType<typeof setInterval> | null = null
    let resizeObserver: ResizeObserver | null = null
    let mediaListeners: Array<{ mql: MediaQueryList; query: string; handler: () => void }> = []
    let reducedMotionMql: MediaQueryList | null = null
    let reducedMotionHandler: (() => void) | null = null

    let activeSlidesPerView = config.slidesPerView
    let activeSpaceBetween = config.spaceBetween

    let isDragging = false
    let dragStartX = 0
    let dragStartOffset = 0

    function getSlideWidth(): number {
      if (containerWidth <= 0 || activeSlidesPerView <= 0) {
        return 0
      }
      const totalGaps = activeSlidesPerView - 1
      return (containerWidth - totalGaps * activeSpaceBetween) / activeSlidesPerView
    }

    function getStepSize(): number {
      return getSlideWidth() + activeSpaceBetween
    }

    function getTrackWidth(slideCount: number): number {
      if (slideCount <= 0) {
        return 0
      }
      return slideCount * getSlideWidth() + (slideCount - 1) * activeSpaceBetween
    }

    function getMaxOffset(slideCount: number): number {
      return Math.max(0, getTrackWidth(slideCount) - containerWidth)
    }

    function applyTransform(offset: number, animate: boolean) {
      if (!trackEl) {
        return
      }

      const nextTransition = animate
        ? `transform ${config.speed}ms ${config.easing}`
        : 'none'

      if (nextTransition !== lastTransition) {
        trackEl.style.transition = nextTransition
        lastTransition = nextTransition
      }

      const x = isRtl ? -offset : offset
      trackEl.style.transform = `translateX(${x}px)`
    }

    function updateSlideWidths() {
      if (!trackEl || containerWidth <= 0 || activeSlidesPerView <= 0) {
        return
      }

      const w = getSlideWidth()
      trackEl.style.gap = `${activeSpaceBetween}px`

      const slides = trackEl.querySelectorAll('[x-carousel\\:slide]')
      slides.forEach((el) => {
        ;(el as HTMLElement).style.width = `${w}px`
        ;(el as HTMLElement).style.flexShrink = '0'
      })
    }

    function announceSlide(index: number, total: number) {
      if (!config.a11y.enabled) {
        return
      }

      const liveRegion = document.createElement('div')
      liveRegion.setAttribute('role', 'status')
      liveRegion.setAttribute('aria-live', 'polite')
      liveRegion.setAttribute('aria-atomic', 'true')
      liveRegion.style.cssText =
        'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap'
      liveRegion.textContent = `Slide ${index + 1} of ${total}`
      document.body.appendChild(liveRegion)
      setTimeout(() => liveRegion.remove(), 1000)
    }

    function applyReducedMotion() {
      if (reducedMotionMql && reducedMotionMql.matches) {
        config.speed = 0
      } else {
        config.speed = originalSpeed
      }
    }

    return {
      rootId,
      viewportId,
      activeIndex: 0,
      slideIds: [] as string[],
      _pausedByHover: false,
      _pausedByFocus: false,
      _pausedByDrag: false,
      _activeSlidesPerView: config.slidesPerView,
      _config: config,

      get totalSlides() {
        return this.slideIds.length
      },

      // totalPages = number of valid starting positions
      // (totalSlides - slidesPerView + 1). For slidesPerView=3 over 10 slides
      // this is 8 distinct scroll stops, not 4 visual pages.
      get pageIndex() {
        return this.activeIndex
      },

      get totalPages() {
        return Math.max(1, this.totalSlides - this._activeSlidesPerView + 1)
      },

      get canGoPrev() {
        return this._config.loop || this.activeIndex > 0
      },

      get canGoNext() {
        return this._config.loop || this.activeIndex < this.totalSlides - this._activeSlidesPerView
      },

      get progress() {
        if (this.totalPages <= 1) {
          return 100
        }
        return ((this.pageIndex + 1) / this.totalPages) * 100
      },

      get isAutoplayPaused() {
        return this._pausedByHover || this._pausedByFocus || this._pausedByDrag
      },

      goTo(index: number, smooth = true, silent = false) {
        const slideCount = this.slideIds.length

        if (slideCount === 0) {
          return
        }

        const maxPage = Math.max(0, slideCount - activeSlidesPerView)
        let targetIndex: number

        if (config.loop) {
          if (index < 0) {
            targetIndex = maxPage
          } else if (index > maxPage) {
            targetIndex = 0
          } else {
            targetIndex = index
          }
        } else {
          targetIndex = Math.max(0, Math.min(maxPage, index))
        }

        const changed = this.activeIndex !== targetIndex

        this.activeIndex = targetIndex

        trackOffset = -(targetIndex * getStepSize())
        applyTransform(trackOffset, smooth)

        if (changed && !silent) {
          announceSlide(targetIndex, slideCount)

          rootEl?.dispatchEvent(new CustomEvent('slidechange', {
            detail: { index: targetIndex },
            bubbles: true,
          }))
        }
      },

      next() {
        this.goTo(this.activeIndex + 1)
      },

      prev() {
        this.goTo(this.activeIndex - 1)
      },

      startAutoplay() {
        if (!config.autoplay || autoplayTimer || !rootEl || destroyed) {
          return
        }

        autoplayTimer = setInterval(() => {
          if (!this.isAutoplayPaused) {
            this.next()
          }
        }, config.autoplay.delay)
      },

      stopAutoplay() {
        if (autoplayTimer) {
          clearInterval(autoplayTimer)
          autoplayTimer = null
        }
      },

      pauseAutoplay(source: PauseSource = 'hover') {
        if (source === 'hover') {
          this._pausedByHover = true
        } else if (source === 'focus') {
          this._pausedByFocus = true
        } else {
          this._pausedByDrag = true
        }
      },

      resumeAutoplay(source: PauseSource = 'hover') {
        if (source === 'hover') {
          this._pausedByHover = false
        } else if (source === 'focus') {
          this._pausedByFocus = false
        } else {
          this._pausedByDrag = false
        }
      },

      onPointerDown(e: PointerEvent) {
        if (!config.draggable || !trackEl) {
          return
        }

        const tag = (e.target as HTMLElement).tagName

        if (tag === 'A' || tag === 'BUTTON' || tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') {
          return
        }

        const target = e.currentTarget as HTMLElement
        target.setPointerCapture(e.pointerId)

        isDragging = true
        dragStartX = e.clientX
        dragStartOffset = trackOffset

        if (config.autoplay) {
          this.pauseAutoplay('drag')
        }

        applyTransform(trackOffset, false)
        e.preventDefault()
      },

      onPointerMove(e: PointerEvent) {
        if (!isDragging) {
          return
        }

        const slideCount = this.slideIds.length
        // RTL note: this direction flip maps the screen delta into LTR-logical
        // sign space (negative = forward through slides). applyTransform then
        // negates again when rendering, so the same resistance branches below
        // work for both directions.
        const direction = isRtl ? -1 : 1
        let newOffset = dragStartOffset + direction * (e.clientX - dragStartX)

        if (config.resistance) {
          const max = getMaxOffset(slideCount)
          if (newOffset > 0) {
            newOffset = newOffset * 0.3
          } else if (-newOffset > max) {
            newOffset = -(max + (-newOffset - max) * 0.3)
          }
        }

        trackOffset = newOffset
        applyTransform(trackOffset, false)
      },

      onPointerUp(e: PointerEvent) {
        if (!isDragging) {
          return
        }

        const target = e.currentTarget as HTMLElement

        if (target.hasPointerCapture(e.pointerId)) {
          target.releasePointerCapture(e.pointerId)
        }

        isDragging = false

        if (config.freeMode) {
          const step = getStepSize()
          const nearest = step > 0 ? Math.round(-trackOffset / step) : 0

          this.goTo(nearest)
        } else {
          const distance = trackOffset - dragStartOffset
          const step = getStepSize()

          if (Math.abs(distance) > config.threshold && step > 0) {
            const direction = distance > 0 ? -1 : 1
            const steps = Math.max(1, Math.round(Math.abs(distance) / step))

            this.goTo(this.activeIndex + direction * steps)
          } else {
            this.goTo(this.activeIndex)
          }
        }

        if (config.autoplay) {
          this.resumeAutoplay('drag')
        }
      },

      applyBreakpoints() {
        activeSlidesPerView = config.slidesPerView
        activeSpaceBetween = config.spaceBetween

        for (const { mql, query } of mediaListeners) {
          if (!mql.matches) {
            continue
          }

          const bp = config.breakpoints[query]

          if (!bp) {
            continue
          }

          if (bp.slidesPerView !== undefined) {
            activeSlidesPerView = bp.slidesPerView
          }

          if (bp.spaceBetween !== undefined) {
            activeSpaceBetween = bp.spaceBetween
          }
        }

        this._activeSlidesPerView = activeSlidesPerView

        updateSlideWidths()
        this.goTo(this.activeIndex, false, true)
      },

      registerSlide(id: string): void {
        if (!this.slideIds.includes(id)) {
          this.slideIds.push(id)
        }
      },

      unregisterSlide(id: string): void {
        this.slideIds = this.slideIds.filter((s: string) => s !== id)
      },

      isSlideVisible(index: number): boolean {
        return index >= this.activeIndex && index < this.activeIndex + this._activeSlidesPerView
      },

      update(settings: Partial<Props>) {
        const autoplayChanging = settings.autoplay !== undefined
        const speedChanging = settings.speed !== undefined
        const breakpointsChanging = settings.breakpoints !== undefined

        if (autoplayChanging) {
          this.stopAutoplay()
        }

        assignSettings(config, settings)

        if (speedChanging) {
          originalSpeed = config.speed
          applyReducedMotion()
        }

        if (breakpointsChanging) {
          for (const { mql, handler } of mediaListeners) {
            mql.removeEventListener('change', handler)
          }

          mediaListeners = []

          for (const query of Object.keys(config.breakpoints)) {
            const mql = window.matchMedia(query)
            const handler = () => this.applyBreakpoints()
            mql.addEventListener('change', handler)
            mediaListeners.push({ mql, query, handler })
          }
        }

        if (autoplayChanging && config.autoplay) {
          this.startAutoplay()
        }

        this.applyBreakpoints()
      },

      init(this: any) {
        rootEl = this.$el as HTMLElement
        viewportEl = rootEl.querySelector('[x-carousel\\:viewport]') as HTMLElement

        if (!viewportEl) {
          return
        }

        trackEl = viewportEl.querySelector('[x-carousel\\:track]') as HTMLElement

        if (!trackEl) {
          return
        }

        destroyed = false
        isRtl = getComputedStyle(rootEl).direction === 'rtl'

        viewportEl.style.overflow = 'hidden'

        trackEl.style.display = 'flex'
        trackEl.style.flexShrink = '0'
        trackEl.style.willChange = 'transform'
        trackEl.style.touchAction = 'pan-y'

        if (config.draggable) {
          trackEl.style.userSelect = 'none'
        }

        trackEl.style.gap = `${activeSpaceBetween}px`

        containerWidth = viewportEl.clientWidth

        for (const query of Object.keys(config.breakpoints)) {
          const mql = window.matchMedia(query)
          const handler = () => this.applyBreakpoints()
          mql.addEventListener('change', handler)
          mediaListeners.push({ mql, query, handler })
        }

        this.applyBreakpoints()

        resizeObserver = new ResizeObserver(() => {
          if (viewportEl && !destroyed) {
            containerWidth = viewportEl.clientWidth
            updateSlideWidths()
            this.goTo(this.activeIndex, false, true)
          }
        })

        resizeObserver.observe(viewportEl)

        reducedMotionMql = window.matchMedia('(prefers-reduced-motion: reduce)')
        reducedMotionHandler = () => applyReducedMotion()
        reducedMotionMql.addEventListener('change', reducedMotionHandler)
        applyReducedMotion()

        if (config.autoplay) {
          this.startAutoplay()
        }
      },

      destroy() {
        destroyed = true

        this.stopAutoplay()

        resizeObserver?.disconnect()
        resizeObserver = null

        for (const { mql, handler } of mediaListeners) {
          mql.removeEventListener('change', handler)
        }

        mediaListeners = []

        if (reducedMotionMql && reducedMotionHandler) {
          reducedMotionMql.removeEventListener('change', reducedMotionHandler)
        }

        reducedMotionMql = null
        reducedMotionHandler = null

        if (viewportEl) {
          viewportEl.style.overflow = ''
        }

        if (trackEl) {
          trackEl.style.display = ''
          trackEl.style.flexShrink = ''
          trackEl.style.willChange = ''
          trackEl.style.touchAction = ''
          trackEl.style.userSelect = ''
          trackEl.style.gap = ''
          trackEl.style.transform = ''
          trackEl.style.transition = ''
        }

        lastTransition = ''
      },
    }
  }),

  parts: ({ withScopes }) =>
    withScopes<CarouselScopes>({
      root(api) {
        const bindings: Record<string, unknown> = {
          id: api.rootId,
          'data-scope': 'carousel',
          'data-part': 'root',
          role: 'region',
          'aria-roledescription': 'carousel',
        }

        if (api._config.labelledBy) {
          bindings['aria-labelledby'] = api._config.labelledBy
        } else {
          bindings['aria-label'] = api._config.label ?? 'Carousel'
        }

        return bindings
      },

      viewport(api) {
        return {
          id: api.viewportId,
          'data-scope': 'carousel',
          'data-part': 'viewport',
          role: 'group',
          'aria-label': 'Carousel',
          tabindex: 0,
          'x-on:keydown'(e: KeyboardEvent) {
            if (!api._config.keyboard) {
              return
            }

            const prevKey = 'ArrowLeft'
            const nextKey = 'ArrowRight'

            switch (e.key) {
              case prevKey:
                e.preventDefault()
                api.prev()
                break

              case nextKey:
                e.preventDefault()
                api.next()
                break

              case 'Home':
                e.preventDefault()
                api.goTo(0)
                break

              case 'End':
                e.preventDefault()
                api.goTo(api.totalPages - 1)
                break
            }
          },
          'x-on:mouseenter'() {
            if (api._config.autoplay?.pauseOnHover) {
              api.pauseAutoplay('hover')
            }
          },
          'x-on:mouseleave'() {
            if (api._config.autoplay?.pauseOnHover) {
              api.resumeAutoplay('hover')
            }
          },
          'x-on:focusin'() {
            if (api._config.autoplay?.pauseOnFocus) {
              api.pauseAutoplay('focus')
            }
          },
          'x-on:focusout'(e: FocusEvent) {
            if (!api._config.autoplay?.pauseOnFocus) {
              return
            }

            const related = e.relatedTarget as Node | null
            const current = e.currentTarget as Node

            if (!related || !current.contains(related)) {
              api.resumeAutoplay('focus')
            }
          },
        }
      },

      track(api) {
        return {
          'data-scope': 'carousel',
          'data-part': 'track',
          'x-bind:aria-live': () => (api._config.autoplay ? 'off' : 'polite'),
          'x-on:pointerdown'(e: PointerEvent) {
            api.onPointerDown(e)
          },
          'x-on:pointermove'(e: PointerEvent) {
            api.onPointerMove(e)
          },
          'x-on:pointerup'(e: PointerEvent) {
            api.onPointerUp(e)
          },
          'x-on:pointercancel'(e: PointerEvent) {
            api.onPointerUp(e)
          },
        }
      },

      slide: defineScope({
        name: 'slide',

        setup(api, el, { generateId, cleanup }) {
          const id = generateId('slide')

          api.registerSlide(id)

          cleanup(() => {
            api.unregisterSlide(id)
          })

          const hasUserLabel = el.hasAttribute('aria-label')

          return {
            _hasUserLabel: hasUserLabel,

            get index() {
              return api.slideIds.indexOf(id)
            },

            get isActive() {
              return api.activeIndex === this.index
            },

            get isPrev() {
              return api.activeIndex - 1 === this.index
            },

            get isNext() {
              return api.activeIndex + 1 === this.index
            },

            get isVisible() {
              return api.isSlideVisible(this.index)
            },

            activate() {
              api.goTo(this.index)
            },
          }
        },

        bindings(api, scope) {
          const bindings: Record<string, unknown> = {
            'data-scope': 'carousel',
            'data-part': 'slide',
            'x-bind:data-active': () => (scope.isActive ? '' : undefined),
            'x-bind:data-prev': () => (scope.isPrev ? '' : undefined),
            'x-bind:data-next': () => (scope.isNext ? '' : undefined),
            'x-bind:data-visible': () => (scope.isVisible ? '' : undefined),
            'x-bind:data-index': () => scope.index,
            'x-bind:aria-hidden': () => (!scope.isVisible ? 'true' : undefined),
            'x-bind:inert': () => (!scope.isVisible ? '' : undefined),
            role: 'group',
            'aria-roledescription': 'slide',
          }

          if (!(scope as { _hasUserLabel: boolean })._hasUserLabel) {
            bindings['x-bind:aria-label'] = () => `Slide ${scope.index + 1} of ${api.totalSlides}`
          }

          return bindings
        },
      }),

      prevButton(api) {
        return {
          'data-scope': 'carousel',
          'data-part': 'prev-button',
          type: 'button',
          'x-on:click'() {
            api.prev()
          },
          'x-bind:disabled': () => !api.canGoPrev,
          'aria-label': api._config.a11y.prevSlideMessage,
          'aria-controls': api.viewportId,
        }
      },

      nextButton(api) {
        return {
          'data-scope': 'carousel',
          'data-part': 'next-button',
          type: 'button',
          'x-on:click'() {
            api.next()
          },
          'x-bind:disabled': () => !api.canGoNext,
          'aria-label': api._config.a11y.nextSlideMessage,
          'aria-controls': api.viewportId,
        }
      },

      pagination: defineScope({
        name: 'pagination',

        setup(api, _el, { value }) {
          const hasValue = value !== undefined && value !== null && value !== ''
          const parsed = hasValue ? Number(value) : NaN
          const valid = hasValue && Number.isFinite(parsed) && parsed >= 0

          if (!valid) {
            console.warn(
              '[carousel] x-carousel:pagination requires an explicit non-negative page index value, e.g. x-carousel:pagination="0"',
            )

            return {
              index: -1,
              get isActive() {
                return false
              },
              get label() {
                return ''
              },
              goTo() {
                // no-op for invalid pagination entry
              },
            }
          }

          const index = parsed

          return {
            index,

            get isActive() {
              return api.pageIndex === index
            },

            get label() {
              return `${index + 1}`
            },

            goTo() {
              if (index >= api.totalPages) {
                console.warn(
                  `[carousel] x-carousel:pagination="${index}" is out of range (totalPages=${api.totalPages})`,
                )

                return
              }

              api.goTo(index)
            },
          }
        },

        bindings(api, scope) {
          if (scope.index < 0) {
            return {
              'data-scope': 'carousel',
              'data-part': 'pagination',
              type: 'button',
              hidden: true,
              'aria-hidden': 'true',
              disabled: true,
            }
          }

          return {
            'data-scope': 'carousel',
            'data-part': 'pagination',
            type: 'button',
            'aria-controls': api.viewportId,
            'x-on:click'() {
              scope.goTo()
            },
            'x-bind:data-active': () => (scope.isActive ? '' : undefined),
            'x-bind:aria-label': () => `Go to slide ${scope.index + 1}`,
            'x-bind:aria-current': () => (scope.isActive ? 'true' : undefined),
          }
        },
      }),

      paginationFraction(api) {
        return {
          'data-scope': 'carousel',
          'data-part': 'pagination-fraction',
          'x-text': () => `${api.pageIndex + 1} / ${api.totalPages}`,
        }
      },

      paginationProgress(api) {
        return {
          'data-scope': 'carousel',
          'data-part': 'pagination-progress',
          role: 'progressbar',
          'x-bind:aria-valuenow': () => api.progress,
          'aria-valuemin': 0,
          'aria-valuemax': 100,
          'x-bind:style': () => ({ width: `${api.progress}%` }),
        }
      },
    }),
})
