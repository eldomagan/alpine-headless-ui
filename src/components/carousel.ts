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
  breakpoints?: Record<string, Partial<Props>>
  a11y?: A11yConfig
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

export default defineComponent({
  name: 'carousel',

  setup: setup((props: Props, { generateId }) => {
    const rootId = generateId('root')
    const viewportId = generateId('viewport')

    const config = {
      slidesPerView: Math.max(1, props.slidesPerView ?? 1),
      spaceBetween: props.spaceBetween ?? 0,
      loop: props.loop ?? false,
      keyboard: props.keyboard ?? true,
      draggable: props.draggable ?? true,
      freeMode: props.freeMode ?? false,
      threshold: props.threshold ?? 20,
      resistance: props.resistance ?? true,
      speed: props.speed ?? 300,
      autoplay:
        typeof props.autoplay === 'object'
          ? {
              delay: props.autoplay.delay ?? 3000,
              pauseOnHover: props.autoplay.pauseOnHover ?? true,
              pauseOnFocus: props.autoplay.pauseOnFocus ?? true,
            }
          : props.autoplay
            ? { delay: 3000, pauseOnHover: true, pauseOnFocus: true }
            : null,
      a11y: {
        enabled: true,
        prevSlideMessage: 'Previous slide',
        nextSlideMessage: 'Next slide',
        ...props.a11y,
      },
      breakpoints: props.breakpoints ?? {},
    }

    let rootEl: HTMLElement | null = null
    let viewportEl: HTMLElement | null = null
    let trackEl: HTMLElement | null = null
    let initialized = false

    let slideCount = 0
    let trackOffset = 0
    let containerWidth = 0

    let autoplayTimer: ReturnType<typeof setInterval> | null = null
    let rafId: number | null = null
    let resizeObserver: ResizeObserver | null = null
    let mediaListeners: Array<{ mql: MediaQueryList; query: string; handler: () => void }> = []

    let activeSlidesPerView = config.slidesPerView
    let activeSpaceBetween = config.spaceBetween

    let isDragging = false
    let dragStartX = 0
    let dragStartOffset = 0

    function getSlideWidth(): number {
      const totalGaps = activeSlidesPerView - 1
      return (containerWidth - totalGaps * activeSpaceBetween) / activeSlidesPerView
    }

    function getStepSize(): number {
      return getSlideWidth() + activeSpaceBetween
    }

    function getMaxOffset(): number {
      const totalWidth = slideCount * getSlideWidth() + (slideCount - 1) * activeSpaceBetween
      return Math.max(0, totalWidth - containerWidth)
    }

    function applyTransform(offset: number, animate: boolean) {
      if (!trackEl) {
        return
      }

      trackEl.style.transition = animate
        ? `transform ${config.speed}ms ease`
        : 'none'
      trackEl.style.transform = `translateX(${offset}px)`
    }

    function updateSlideWidths() {
      if (!trackEl) {
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

    function announceSlide(index: number) {
      if (!config.a11y.enabled) {
        return
      }

      const liveRegion = document.createElement('div')
      liveRegion.setAttribute('role', 'status')
      liveRegion.setAttribute('aria-live', 'polite')
      liveRegion.setAttribute('aria-atomic', 'true')
      liveRegion.style.cssText =
        'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap'
      liveRegion.textContent = `Slide ${index + 1} of ${slideCount}`
      document.body.appendChild(liveRegion)
      setTimeout(() => liveRegion.remove(), 1000)
    }

    return {
      rootId,
      viewportId,
      activeIndex: 0,
      firstVisibleIndex: 0,
      lastVisibleIndex: 0,
      isAutoplayPaused: false,
      _slideCount: 0,
      _activeSlidesPerView: config.slidesPerView,
      _config: config,

      get totalSlides() {
        return this._slideCount
      },

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

      goTo(index: number, smooth = true) {
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
        this.firstVisibleIndex = targetIndex
        this.lastVisibleIndex = Math.min(targetIndex + activeSlidesPerView - 1, slideCount - 1)

        trackOffset = -(targetIndex * getStepSize())
        applyTransform(trackOffset, smooth)

        if (changed) {
          announceSlide(targetIndex)
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
        if (!config.autoplay || autoplayTimer) {
          return
        }

        if (trackEl) {
          trackEl.setAttribute('aria-live', 'off')
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

        if (trackEl) {
          trackEl.setAttribute('aria-live', 'polite')
        }
      },

      pauseAutoplay() {
        this.isAutoplayPaused = true
      },

      resumeAutoplay() {
        this.isAutoplayPaused = false
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

        applyTransform(trackOffset, false)
        e.preventDefault()
      },

      onPointerMove(e: PointerEvent) {
        if (!isDragging) {
          return
        }

        let newOffset = dragStartOffset + (e.clientX - dragStartX)

        if (!config.loop && config.resistance) {
          const max = getMaxOffset()
          if (newOffset > 0) {
            newOffset = newOffset * 0.3
          } else if (-newOffset > max) {
            newOffset = -(max + (-newOffset - max) * 0.3)
          }
        } else if (config.loop) {
          const totalWidth = slideCount * getStepSize()
          newOffset = Math.max(-totalWidth, Math.min(totalWidth, newOffset))
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
          const direction = distance > 0 ? -1 : 1

          if (Math.abs(distance) > config.threshold) {
            this.goTo(this.activeIndex + direction)
          } else {
            this.goTo(this.activeIndex)
          }
        }
      },

      applyBreakpoints() {
        activeSlidesPerView = config.slidesPerView
        activeSpaceBetween = config.spaceBetween

        for (const { mql, query } of mediaListeners) {
          if (mql.matches) {
            const bp = config.breakpoints[query]
            if (bp) {
              if (bp.slidesPerView !== undefined) {
                activeSlidesPerView = bp.slidesPerView
              }
              if (bp.spaceBetween !== undefined) {
                activeSpaceBetween = bp.spaceBetween
              }
            }
          }
        }

        this._activeSlidesPerView = activeSlidesPerView
        updateSlideWidths()
        this.goTo(this.activeIndex, false)
      },

      registerSlide(): number {
        const index = slideCount
        slideCount++
        this._slideCount = slideCount
        return index
      },

      unregisterSlide() {
        slideCount--
        this._slideCount = slideCount
      },

      isSlideVisible(index: number): boolean {
        return index >= this.firstVisibleIndex && index <= this.lastVisibleIndex
      },

      update(settings: Partial<Props>) {
        if (settings.autoplay !== undefined) {
          this.stopAutoplay()
          config.autoplay =
            typeof settings.autoplay === 'object'
              ? {
                  delay: settings.autoplay.delay ?? 3000,
                  pauseOnHover: settings.autoplay.pauseOnHover ?? true,
                  pauseOnFocus: settings.autoplay.pauseOnFocus ?? true,
                }
              : settings.autoplay
                ? { delay: 3000, pauseOnHover: true, pauseOnFocus: true }
                : null
          if (config.autoplay) {
            this.startAutoplay()
          }
        }

        if (settings.loop !== undefined) {
          config.loop = settings.loop
        }
        if (settings.keyboard !== undefined) {
          config.keyboard = settings.keyboard
        }
        if (settings.draggable !== undefined) {
          config.draggable = settings.draggable
        }
        if (settings.freeMode !== undefined) {
          config.freeMode = settings.freeMode
        }
        if (settings.threshold !== undefined) {
          config.threshold = settings.threshold
        }
        if (settings.resistance !== undefined) {
          config.resistance = settings.resistance
        }
        if (settings.speed !== undefined) {
          config.speed = settings.speed
        }
        if (settings.slidesPerView !== undefined) {
          config.slidesPerView = Math.max(1, settings.slidesPerView)
        }
        if (settings.spaceBetween !== undefined) {
          config.spaceBetween = settings.spaceBetween
        }
        if (settings.breakpoints !== undefined) {
          config.breakpoints = settings.breakpoints
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
        if (settings.a11y !== undefined) {
          config.a11y = { ...config.a11y, ...settings.a11y }
        }

        this.applyBreakpoints()
      },

      init(this: any) {
        rootEl = this.$el as HTMLElement
        viewportEl = rootEl!.querySelector('[x-carousel\\:viewport]') as HTMLElement

        if (!viewportEl) {
          return
        }

        trackEl = viewportEl.querySelector('[x-carousel\\:track]') as HTMLElement

        if (!trackEl) {
          return
        }

        viewportEl.style.overflow = 'hidden'

        trackEl.style.display = 'flex'
        trackEl.style.flexShrink = '0'
        trackEl.style.willChange = 'transform'
        trackEl.style.touchAction = 'pan-y'
        if (config.draggable) {
          trackEl.style.userSelect = 'none'
        }
        trackEl.style.gap = `${activeSpaceBetween}px`

        rafId = requestAnimationFrame(() => {
          rafId = null
          if (initialized) {
            return
          }
          initialized = true
          containerWidth = viewportEl!.clientWidth

          for (const query of Object.keys(config.breakpoints)) {
            const mql = window.matchMedia(query)
            const handler = () => this.applyBreakpoints()
            mql.addEventListener('change', handler)
            mediaListeners.push({ mql, query, handler })
          }

          this.applyBreakpoints()

          resizeObserver = new ResizeObserver(() => {
            if (viewportEl) {
              containerWidth = viewportEl.clientWidth
              updateSlideWidths()
              this.goTo(this.activeIndex, false)
            }
          })
          resizeObserver.observe(viewportEl!)

          if (config.autoplay) {
            this.startAutoplay()
          }

          if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            config.speed = 0
          }
        })
      },

      destroy() {
        if (rafId) {
          cancelAnimationFrame(rafId)
          rafId = null
        }
        this.stopAutoplay()
        resizeObserver?.disconnect()

        for (const { mql, handler } of mediaListeners) {
          mql.removeEventListener('change', handler)
        }
        mediaListeners = []
        initialized = false

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
      },
    }
  }),

  parts: ({ withScopes }) =>
    withScopes<CarouselScopes>({
      root(api) {
        return {
          id: api.rootId,
          'data-scope': 'carousel',
          'data-part': 'root',
          role: 'region',
          'aria-roledescription': 'carousel',
          'x-init'(this: any) {
            api.init.call(this)
          },
          'x-on:destroy'() {
            api.destroy()
          },
        }
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
            switch (e.key) {
              case 'ArrowLeft':
                e.preventDefault()
                api.prev()
                break
              case 'ArrowRight':
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
              api.pauseAutoplay()
            }
          },
          'x-on:mouseleave'() {
            if (api._config.autoplay?.pauseOnHover) {
              api.resumeAutoplay()
            }
          },
          'x-on:focusin'() {
            if (api._config.autoplay?.pauseOnFocus) {
              api.pauseAutoplay()
            }
          },
          'x-on:focusout'() {
            if (api._config.autoplay?.pauseOnFocus) {
              api.resumeAutoplay()
            }
          },
        }
      },

      track(api) {
        return {
          'data-scope': 'carousel',
          'data-part': 'track',
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

        setup(api, _el, { cleanup }) {
          const index = api.registerSlide()

          cleanup(() => {
            api.unregisterSlide()
          })

          return {
            index,

            get isActive() {
              return api.activeIndex === index
            },

            get isPrev() {
              return api.activeIndex - 1 === index
            },

            get isNext() {
              return api.activeIndex + 1 === index
            },

            get isVisible() {
              return api.isSlideVisible(index)
            },

            activate() {
              api.goTo(index)
            },
          }
        },

        bindings(api, scope) {
          return {
            'data-scope': 'carousel',
            'data-part': 'slide',
            'x-bind:data-active': () => (scope.isActive ? '' : undefined),
            'x-bind:data-prev': () => (scope.isPrev ? '' : undefined),
            'x-bind:data-next': () => (scope.isNext ? '' : undefined),
            'x-bind:data-visible': () => (scope.isVisible ? '' : undefined),
            'x-bind:data-index': () => scope.index,
            role: 'group',
            'aria-roledescription': 'slide',
            'x-bind:aria-label': () => `Slide ${scope.index + 1} of ${api.totalSlides}`,
          }
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
          const index = value !== undefined && value !== null && value !== ''
            ? Number(value)
            : 0

          return {
            index,

            get isActive() {
              return api.pageIndex === index
            },

            get label() {
              return `${index + 1}`
            },

            goTo() {
              api.goTo(index)
            },
          }
        },

        bindings(_, scope) {
          return {
            'data-scope': 'carousel',
            'data-part': 'pagination',
            type: 'button',
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
          'aria-live': 'polite',
          'aria-atomic': 'true',
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
