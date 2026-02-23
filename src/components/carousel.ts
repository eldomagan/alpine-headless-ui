import { defineScope, defineComponent, setup } from 'alpine-define-component'


interface AutoplayConfig {
  delay: number
  pauseOnHover?: boolean
  pauseOnFocus?: boolean
}

interface A11yConfig {
  enabled?: boolean
  prevSlideMessage?: string
  nextSlideMessage?: string
  paginationBulletMessage?: string
}

interface Props {
  slidesPerView?: number | 'auto'
  spaceBetween?: number
  loop?: boolean
  keyboard?: boolean
  draggable?: boolean
  freeMode?: boolean
  snapToSlides?: boolean
  threshold?: number
  resistance?: boolean
  autoplay?: boolean | AutoplayConfig
  speed?: number
  breakpoints?: {
    [width: number]: Partial<Props>
  }
  a11y?: A11yConfig
  id?: string
}

interface SlideData {
  el: HTMLElement
  index: number
  width: number
  position: number
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

    let viewportEl: HTMLElement | null = null
    let resizeObserver: ResizeObserver | null = null
    let intersectionObserver: IntersectionObserver | null = null
    let autoplayTimer: ReturnType<typeof setInterval> | null = null

    const slidesMap = new Map<number, SlideData>()

    let isDragging = false
    let dragStartX = 0
    let dragStartScrollLeft = 0
    let dragVelocity = 0
    let lastDragTime = 0
    let lastDragX = 0
    let capturedPointerId: number | null = null

    const config = {
      slidesPerView: props.slidesPerView ?? 1,
      spaceBetween: props.spaceBetween ?? 0,
      loop: props.loop ?? false,
      keyboard: props.keyboard ?? true,
      draggable: props.draggable ?? true,
      freeMode: props.freeMode ?? false,
      snapToSlides: props.snapToSlides ?? true,
      threshold: props.threshold ?? 20,
      resistance: props.resistance ?? true,
      speed: props.speed ?? 300,
      autoplay:
        typeof props.autoplay === 'object'
          ? props.autoplay
          : props.autoplay
          ? { delay: 3000, pauseOnHover: true, pauseOnFocus: true }
          : null,
      a11y: {
        enabled: true,
        prevSlideMessage: 'Previous slide',
        nextSlideMessage: 'Next slide',
        paginationBulletMessage: 'Go to slide {{index}}',
        ...props.a11y,
      },
      breakpoints: props.breakpoints ?? {},
    }

    return {
      rootId,
      viewportId,
      id: props.id || null,
      activeIndex: 0,
      viewportWidth: 0,
      visibleSlidesCount: 1,
      isAtStart: true,
      isAtEnd: false,
      isAutoplayPaused: false,
      slidesPerView: config.slidesPerView,
      spaceBetween: config.spaceBetween,
      _config: config,
      _slideCount: 0,

      get totalSlides() {
        return this._slideCount
      },

      get totalPages() {
        return Math.max(1, this.totalSlides - this.visibleSlidesCount + 1)
      },

      get canGoPrev() {
        return this._config.loop || this.activeIndex > 0
      },

      get canGoNext() {
        return this._config.loop || this.activeIndex < this.totalSlides - this.visibleSlidesCount
      },

      get progress() {
        if (this.totalPages <= 1) { return 0 }
        return (this.activeIndex / (this.totalPages - 1)) * 100
      },

      get computedSlideWidth() {
        if (this.slidesPerView === 'auto') {
          return 'auto'
        }

        const totalGaps = this.slidesPerView - 1
        const totalGapWidth = totalGaps * this.spaceBetween

        return `calc((100% - ${totalGapWidth}px) / ${this.slidesPerView})`
      },

      goTo(index: number, smooth = true) {
        if (!viewportEl || this.totalSlides === 0) {
          return
        }

        let targetIndex = index

        if (this._config.loop) {
          targetIndex = ((index % this.totalPages) + this.totalPages) % this.totalPages
        } else {
          targetIndex = Math.max(0, Math.min(this.totalPages - 1, index))
        }

        this.activeIndex = targetIndex

        const slide = Array.from(slidesMap.values()).find((s) => s.index === targetIndex)
        if (slide) {
          const scrollLeft = this.calculateScrollPosition(targetIndex)
          viewportEl.scrollTo({
            left: scrollLeft,
            behavior: smooth ? 'smooth' : 'auto',
          })
        }

        this.$dispatch('slidechange', { index: targetIndex })

        if (this._config.a11y.enabled) {
          this.announceSlide(targetIndex)
        }
      },

      next() {
        if (!this.canGoNext) {
          return
        }

        this.goTo(this.activeIndex + 1)
      },

      prev() {
        if (!this.canGoPrev) {
          return
        }

        this.goTo(this.activeIndex - 1)
      },

      calculateScrollPosition(index: number): number {
        const slides = Array.from(slidesMap.values()).sort((a, b) => a.index - b.index)

        if (index === 0) {
          return 0
        }

        if (index >= slides.length) {
          return viewportEl?.scrollWidth ?? 0
        }

        const targetSlide = slides[index]
        if (targetSlide && targetSlide.el && viewportEl) {
          const viewportRect = viewportEl.getBoundingClientRect()
          const slideRect = targetSlide.el.getBoundingClientRect()
          return slideRect.left - viewportRect.left + viewportEl.scrollLeft
        }

        return 0
      },

      updateViewportSize() {
        if (!viewportEl) {
          return
        }

        this.viewportWidth = viewportEl.clientWidth
        this.recalculateVisibleSlides()
      },

      recalculateVisibleSlides() {
        if (this.slidesPerView !== 'auto') {
          this.visibleSlidesCount = this.slidesPerView
          return
        }

        const slides = Array.from(slidesMap.values()).sort((a, b) => a.index - b.index)
        if (slides.length === 0) {
          return
        }

        let totalWidth = 0
        let count = 0

        for (const slide of slides) {
          if (totalWidth + slide.width <= this.viewportWidth) {
            totalWidth += slide.width + (count > 0 ? this.spaceBetween : 0)
            count++
          } else {
            break
          }
        }

        this.visibleSlidesCount = Math.max(1, count)
      },

      applyBreakpoints() {
        const windowWidth = window.innerWidth

        const breakpoints = Object.entries(this._config.breakpoints)
          .map(([width, settings]) => [Number(width), settings] as [number, Partial<Props>])
          .sort((a, b) => a[0] - b[0])

        let activeBreakpoint: Partial<Props> | null = null
        for (const [width, settings] of breakpoints) {
          if (windowWidth >= width) {
            activeBreakpoint = settings
          } else {
            break
          }
        }

        this.slidesPerView = activeBreakpoint?.slidesPerView ?? this._config.slidesPerView
        this.spaceBetween = activeBreakpoint?.spaceBetween ?? this._config.spaceBetween

        this.recalculateVisibleSlides()
      },

      registerSlide(el: HTMLElement, index?: number): number {
        const actualIndex = index ?? (slidesMap.size > 0 ? Math.max(...Array.from(slidesMap.keys())) + 1 : 0)

        slidesMap.set(actualIndex, {
          el,
          index: actualIndex,
          width: el.offsetWidth || 0,
          position: 0,
        })

        this._slideCount++

        resizeObserver?.observe(el)

        this.recalculateVisibleSlides()

        return actualIndex
      },

      unregisterSlide(index: number) {
        const slide = slidesMap.get(index)
        if (slide) {
          resizeObserver?.unobserve(slide.el)
          slidesMap.delete(index)
          this._slideCount--
          this.recalculateVisibleSlides()
        }
      },

      updateSlideWidth(index: number, width: number) {
        const slide = slidesMap.get(index)
        if (slide) {
          slide.width = width
          this.recalculateVisibleSlides()
        }
      },

      isSlideVisible(index: number): boolean {
        if (!viewportEl) return false

        const scrollLeft = viewportEl.scrollLeft
        const scrollRight = scrollLeft + viewportEl.clientWidth

        const position = this.calculateScrollPosition(index)
        const slide = slidesMap.get(index)
        const slideRight = position + (slide?.width || 0)

        return position < scrollRight && slideRight > scrollLeft
      },

      onPointerDown(e: PointerEvent) {
        if (!this._config.draggable || !viewportEl) {
          return
        }

        // Capture the pointer to receive move events even outside viewport
        const target = e.currentTarget as HTMLElement
        if (target && target.setPointerCapture) {
          target.setPointerCapture(e.pointerId)
          capturedPointerId = e.pointerId
        }

        isDragging = true
        dragStartX = e.clientX
        dragStartScrollLeft = viewportEl.scrollLeft
        dragVelocity = 0
        lastDragTime = Date.now()
        lastDragX = e.clientX

        viewportEl.style.scrollSnapType = 'none'
        viewportEl.style.scrollBehavior = 'auto'

        // Prevent default to avoid text selection
        e.preventDefault()
      },

      onPointerMove(e: PointerEvent) {
        if (!isDragging || !viewportEl) {
          return
        }

        const currentTime = Date.now()
        const deltaTime = currentTime - lastDragTime
        const deltaX = e.clientX - lastDragX

        if (deltaTime > 0) {
          dragVelocity = deltaX / deltaTime
        }

        const distance = dragStartX - e.clientX
        let newScrollLeft = dragStartScrollLeft + distance

        if (this._config.resistance && !this._config.loop) {
          const maxScroll = viewportEl.scrollWidth - viewportEl.clientWidth
          if (newScrollLeft < 0) {
            newScrollLeft = newScrollLeft * 0.3
          } else if (newScrollLeft > maxScroll) {
            newScrollLeft = maxScroll + (newScrollLeft - maxScroll) * 0.3
          }
        }

        viewportEl.scrollLeft = newScrollLeft

        lastDragTime = currentTime
        lastDragX = e.clientX
      },

      onPointerUp(e: PointerEvent) {
        if (!isDragging || !viewportEl) {
          return
        }

        const target = e.currentTarget as HTMLElement
        if (target && capturedPointerId !== null && target.hasPointerCapture(capturedPointerId)) {
          target.releasePointerCapture(capturedPointerId)
        }
        capturedPointerId = null

        isDragging = false

        if (!this._config.freeMode && this._config.snapToSlides) {
          const distance = viewportEl.scrollLeft - dragStartScrollLeft
          const dragDirection = distance > 0 ? 1 : -1
          const draggedDistance = Math.abs(distance)

          let targetIndex = this.activeIndex

          if (draggedDistance > this._config.threshold) {
            const momentum = Math.abs(dragVelocity) > 0.5 ? dragDirection : 0
            targetIndex = this.activeIndex + dragDirection + momentum
          } else {
            targetIndex = this.activeIndex
          }

          if (!this._config.loop) {
            targetIndex = Math.max(0, Math.min(this.totalSlides - 1, targetIndex))
          }

          this.goTo(targetIndex, true)
        }

        if (this._config.snapToSlides) {
          viewportEl.style.scrollSnapType = ''
          viewportEl.style.scrollBehavior = ''
        }
      },

      startAutoplay() {
        if (!this._config.autoplay || autoplayTimer) {
          return
        }

        autoplayTimer = setInterval(() => {
          if (!this.isAutoplayPaused) {
            this.next()
          }
        }, this._config.autoplay.delay)
      },

      stopAutoplay() {
        if (autoplayTimer) {
          clearInterval(autoplayTimer)
          autoplayTimer = null
        }
      },

      pauseAutoplay() {
        this.isAutoplayPaused = true
      },

      resumeAutoplay() {
        this.isAutoplayPaused = false
      },

      onKeydown(e: KeyboardEvent) {
        if (!this._config.keyboard) {
          return
        }

        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault()
            this.prev()
            break
          case 'ArrowRight':
            e.preventDefault()
            this.next()
            break
          case 'Home':
            e.preventDefault()
            this.goTo(0)
            break
          case 'End':
            e.preventDefault()
            this.goTo(this.totalSlides - 1)
            break
        }
      },

      announceSlide(index: number) {
        const announcement = `Slide ${index + 1} of ${this.totalSlides}`
        const liveRegion = document.createElement('div')
        liveRegion.setAttribute('role', 'status')
        liveRegion.setAttribute('aria-live', 'polite')
        liveRegion.setAttribute('aria-atomic', 'true')
        liveRegion.className = 'sr-only'
        liveRegion.textContent = announcement
        document.body.appendChild(liveRegion)
        setTimeout(() => liveRegion.remove(), 1000)
      },

      updateActiveIndexFromScroll() {
        if (!viewportEl) return

        const scrollLeft = viewportEl.scrollLeft
        const slides = Array.from(slidesMap.values()).sort((a, b) => a.index - b.index)

        let closestIndex = 0
        let minDist = Infinity

        slides.forEach((_, idx) => {
          const slidePosition = this.calculateScrollPosition(idx)
          const dist = Math.abs(scrollLeft - slidePosition)
          if (dist < minDist) {
            minDist = dist
            closestIndex = idx
          }
        })

        if (this.activeIndex !== closestIndex) {
          this.activeIndex = closestIndex
          this.$dispatch('slidechange', { index: closestIndex })
        }

        const maxScroll = viewportEl.scrollWidth - viewportEl.clientWidth
        this.isAtStart = scrollLeft <= 0
        this.isAtEnd = scrollLeft >= maxScroll
      },

      init(this: any) {
        viewportEl = this.$el.querySelector('[x-carousel\\:viewport]') as HTMLElement

        if (!viewportEl) {
          console.warn('Carousel: viewport element not found')
          return
        }

        resizeObserver = new ResizeObserver((entries) => {
          for (const entry of entries) {
            if (entry.target === viewportEl) {
              this.updateViewportSize()
              this.applyBreakpoints()
            } else {
              const slideData = Array.from(slidesMap.values()).find((s) => s.el === entry.target)
              if (slideData) {
                this.updateSlideWidth(slideData.index, entry.contentRect.width)
              }
            }
          }
        })

        resizeObserver.observe(viewportEl)

        intersectionObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const slideData = Array.from(slidesMap.values()).find((s) => s.el === entry.target)
              if (slideData) {
                this.$dispatch('slide:visibility', {
                  index: slideData.index,
                  isVisible: entry.isIntersecting,
                })
              }
            })
          },
          {
            root: viewportEl,
            threshold: 0.5,
          }
        )

        viewportEl.addEventListener('scroll', () => {
          if (!isDragging) {
            this.updateActiveIndexFromScroll()
          }
        })

        this.updateViewportSize()

        this.applyBreakpoints()

        if (this._config.autoplay) {
          this.startAutoplay()
        }

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReducedMotion) {
          this._config.speed = 0
        }
      },

      destroy() {
        resizeObserver?.disconnect()
        intersectionObserver?.disconnect()
        this.stopAutoplay()
      },

      update(settings: Partial<Props>) {
        if (settings.a11y !== undefined) {
          this._config.a11y = { ...this._config.a11y, ...settings.a11y }
        }

        if (settings.autoplay !== undefined) {
          this.stopAutoplay()
          this._config.autoplay =
            typeof settings.autoplay === 'object'
              ? settings.autoplay
              : settings.autoplay
              ? { delay: 3000, pauseOnHover: true, pauseOnFocus: true }
              : null
          if (this._config.autoplay) {
            this.startAutoplay()
          }
        }

        const simpleKeys = [
          'loop', 'keyboard', 'draggable', 'freeMode',
          'snapToSlides', 'threshold', 'resistance', 'speed',
        ] as const

        for (const key of simpleKeys) {
          if (settings[key] !== undefined) {
            ;(this._config as any)[key] = settings[key]
          }
        }

        if (settings.slidesPerView !== undefined) {
          this._config.slidesPerView = settings.slidesPerView
          this.slidesPerView = settings.slidesPerView
        }

        if (settings.spaceBetween !== undefined) {
          this._config.spaceBetween = settings.spaceBetween
          this.spaceBetween = settings.spaceBetween
        }

        if (settings.breakpoints !== undefined) {
          this._config.breakpoints = settings.breakpoints
        }

        this.applyBreakpoints()
        this.recalculateVisibleSlides()
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
          'x-init'(this: any) {
            api.init.call(this)
          },
          'x-on:destroy'() {
            api.destroy()
          },
        }
      },

      viewport(api, el) {
        return {
          id: api.viewportId,
          'data-scope': 'carousel',
          'data-part': 'viewport',
          role: 'region',
          'aria-label': 'Carousel',
          'x-init'(this: any) {
            el.style.setProperty('--slide-item-size', api.computedSlideWidth)
            el.style.setProperty('--slide-spacing', `${api.spaceBetween}px`)
            // Prevent default touch behaviors and text selection during drag
            el.style.touchAction = 'none'
            el.style.userSelect = 'none'
          },
          'x-effect'() {
            el.style.setProperty('--slide-item-size', api.computedSlideWidth)
            el.style.setProperty('--slide-spacing', `${api.spaceBetween}px`)
          },
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
          'x-on:keydown'(e: KeyboardEvent) {
            api.onKeydown(e)
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
          tabindex: 0,
        }
      },

      slide: defineScope({
        name: 'slide',
        setup(api, el, { value, cleanup }) {
          const index = api.registerSlide(
            el,
            value !== undefined && value !== null && value !== '' ? Number(value) : undefined
          )

          cleanup(() => {
            api.unregisterSlide(index)
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

        bindings(_, scope) {
          return {
            'data-scope': 'carousel',
            'data-part': 'slide',
            'x-bind:data-active': () => (scope.isActive ? '' : undefined),
            'x-bind:data-prev': () => (scope.isPrev ? '' : undefined),
            'x-bind:data-next': () => (scope.isNext ? '' : undefined),
            'x-bind:data-visible': () => (scope.isVisible ? '' : undefined),
            'x-bind:data-index': () => scope.index,
            'x-on:click'() {
              scope.activate()
            },
            role: 'group',
            'aria-roledescription': 'slide',
            'x-bind:aria-label': () => `Slide ${scope.index + 1}`,
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
          'aria-label': 'Previous slide',
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
          'aria-label': 'Next slide',
          'aria-controls': api.viewportId,
        }
      },

      pagination: defineScope({
        name: 'pagination',
        setup(api, _el, { value }) {
          const index = value !== undefined && value !== null && value !== '' ? Number(value) : 0

          return {
            index,

            get isActive() {
              return api.activeIndex === index
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
          'x-text': () => `${api.activeIndex + 1} / ${api.totalPages}`,
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
          'x-bind:style': () => `width: ${api.progress}%`,
        }
      },
    }),
})
