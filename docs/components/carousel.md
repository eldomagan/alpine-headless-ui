# Carousel

A transform-based carousel component. Uses CSS transforms (`translateX`) for smooth, performant sliding with no external dependencies.

## Features

- ✅ **CSS transform-based**: Smooth `translateX` animations
- ✅ **No dependencies**: Fully self-contained
- ✅ **Touch/swipe gestures**: Drag slides with mouse or touch
- ✅ **Infinite loop**: Optional looping
- ✅ **Autoplay**: With configurable delay and pause on hover/focus
- ✅ **Responsive**: Media query-based breakpoints
- ✅ **Pagination**: Dots, fraction, and progress bar
- ✅ **Keyboard navigation**: Arrow keys, Home, and End support
- ✅ **Accessible**: ARIA attributes, live region announcements, reduced motion support

## Basic Example

<ComponentExample>
<div x-cloak x-carousel="{ slidesPerView: 1, spaceBetween: 16 }">
  <div x-carousel:viewport>
    <div x-carousel:track>
      <div x-carousel:slide class="bg-blue-100 rounded-lg p-8 flex items-center justify-center min-h-50"><span class="text-2xl font-bold">Slide 1</span></div>
      <div x-carousel:slide class="bg-purple-100 rounded-lg p-8 flex items-center justify-center min-h-50"><span class="text-2xl font-bold">Slide 2</span></div>
      <div x-carousel:slide class="bg-pink-100 rounded-lg p-8 flex items-center justify-center min-h-50"><span class="text-2xl font-bold">Slide 3</span></div>
    </div>
  </div>
  <div class="flex items-center justify-center gap-4 mt-4">
    <button x-carousel:prev-button class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">Previous</button>
    <button x-carousel:next-button class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">Next</button>
  </div>
</div>
</ComponentExample>

## Multiple Slides Per View

Show multiple slides at once with `slidesPerView`.

<ComponentExample>
<div x-cloak x-carousel="{ slidesPerView: 3, spaceBetween: 12 }">
  <div x-carousel:viewport>
    <div x-carousel:track>
      <div x-carousel:slide class="bg-blue-100 rounded-lg p-6 flex items-center justify-center min-h-25"><span class="font-bold">1</span></div>
      <div x-carousel:slide class="bg-purple-100 rounded-lg p-6 flex items-center justify-center min-h-25"><span class="font-bold">2</span></div>
      <div x-carousel:slide class="bg-pink-100 rounded-lg p-6 flex items-center justify-center min-h-25"><span class="font-bold">3</span></div>
      <div x-carousel:slide class="bg-green-100 rounded-lg p-6 flex items-center justify-center min-h-25"><span class="font-bold">4</span></div>
      <div x-carousel:slide class="bg-yellow-100 rounded-lg p-6 flex items-center justify-center min-h-25"><span class="font-bold">5</span></div>
      <div x-carousel:slide class="bg-red-100 rounded-lg p-6 flex items-center justify-center min-h-25"><span class="font-bold">6</span></div>
    </div>
  </div>
  <div class="flex justify-center gap-2 mt-4">
    <button x-carousel:prev-button class="px-3 py-1.5 bg-gray-200 rounded text-sm disabled:opacity-50">←</button>
    <button x-carousel:next-button class="px-3 py-1.5 bg-gray-200 rounded text-sm disabled:opacity-50">→</button>
  </div>
</div>
</ComponentExample>

## Pagination Dots

Add pagination dots for visual page indicators.

<ComponentExample>
<div x-cloak x-carousel="{ slidesPerView: 1, spaceBetween: 16 }">
  <div x-carousel:viewport>
    <div x-carousel:track>
      <div x-carousel:slide class="bg-blue-100 rounded-lg p-8 flex items-center justify-center min-h-37.5"><span class="text-xl">Slide 1</span></div>
      <div x-carousel:slide class="bg-purple-100 rounded-lg p-8 flex items-center justify-center min-h-37.5"><span class="text-xl">Slide 2</span></div>
      <div x-carousel:slide class="bg-pink-100 rounded-lg p-8 flex items-center justify-center min-h-37.5"><span class="text-xl">Slide 3</span></div>
      <div x-carousel:slide class="bg-green-100 rounded-lg p-8 flex items-center justify-center min-h-37.5"><span class="text-xl">Slide 4</span></div>
    </div>
  </div>
  <div class="flex justify-center gap-2 mt-4">
    <button x-carousel:pagination="0" class="w-2 h-2 rounded-full bg-gray-300 data-active:bg-blue-600 data-active:w-6 transition-all"></button>
    <button x-carousel:pagination="1" class="w-2 h-2 rounded-full bg-gray-300 data-active:bg-blue-600 data-active:w-6 transition-all"></button>
    <button x-carousel:pagination="2" class="w-2 h-2 rounded-full bg-gray-300 data-active:bg-blue-600 data-active:w-6 transition-all"></button>
    <button x-carousel:pagination="3" class="w-2 h-2 rounded-full bg-gray-300 data-active:bg-blue-600 data-active:w-6 transition-all"></button>
  </div>
</div>
</ComponentExample>

## Pagination Fraction

Show current page position as a fraction.

<ComponentExample>
<div x-cloak x-carousel="{ slidesPerView: 1, spaceBetween: 16 }">
  <div x-carousel:viewport>
    <div x-carousel:track>
      <div x-carousel:slide class="bg-blue-100 rounded-lg p-8 flex items-center justify-center min-h-37.5"><span class="text-xl">Slide 1</span></div>
      <div x-carousel:slide class="bg-purple-100 rounded-lg p-8 flex items-center justify-center min-h-37.5"><span class="text-xl">Slide 2</span></div>
      <div x-carousel:slide class="bg-pink-100 rounded-lg p-8 flex items-center justify-center min-h-37.5"><span class="text-xl">Slide 3</span></div>
    </div>
  </div>
  <div class="flex items-center justify-center gap-4 mt-4">
    <button x-carousel:prev-button class="px-3 py-1.5 bg-gray-200 rounded disabled:opacity-50">←</button>
    <div x-carousel:pagination-fraction class="text-sm font-medium"></div>
    <button x-carousel:next-button class="px-3 py-1.5 bg-gray-200 rounded disabled:opacity-50">→</button>
  </div>
</div>
</ComponentExample>

## Progress Bar

Display a progress bar showing carousel position.

<ComponentExample>
<div x-cloak x-carousel="{ slidesPerView: 1, spaceBetween: 16 }">
  <div x-carousel:viewport>
    <div x-carousel:track>
      <div x-carousel:slide class="bg-blue-100 rounded-lg p-8 flex items-center justify-center min-h-37.5"><span class="text-xl">Slide 1</span></div>
      <div x-carousel:slide class="bg-purple-100 rounded-lg p-8 flex items-center justify-center min-h-37.5"><span class="text-xl">Slide 2</span></div>
      <div x-carousel:slide class="bg-pink-100 rounded-lg p-8 flex items-center justify-center min-h-37.5"><span class="text-xl">Slide 3</span></div>
      <div x-carousel:slide class="bg-green-100 rounded-lg p-8 flex items-center justify-center min-h-37.5"><span class="text-xl">Slide 4</span></div>
    </div>
  </div>
  <div class="flex items-center justify-center gap-4 mt-4">
    <button x-carousel:prev-button class="px-3 py-1.5 bg-gray-200 rounded disabled:opacity-50">←</button>
    <span x-carousel:pagination-fraction class="text-sm font-medium"></span>
    <button x-carousel:next-button class="px-3 py-1.5 bg-gray-200 rounded disabled:opacity-50">→</button>
  </div>
  <div class="mt-4">
    <div class="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
      <div x-carousel:pagination-progress class="h-full bg-blue-600 transition-all"></div>
    </div>
  </div>
</div>
</ComponentExample>

## Autoplay

Enable automatic slide progression. Use `loop: true` with autoplay so slides cycle continuously.

<ComponentExample>
<div x-cloak x-carousel="{ slidesPerView: 1, spaceBetween: 16, loop: true, autoplay: { delay: 2000, pauseOnHover: true } }">
  <div x-carousel:viewport>
    <div x-carousel:track>
      <div x-carousel:slide class="bg-blue-100 rounded-lg p-8 flex items-center justify-center min-h-37.5"><span class="text-xl">Auto 1</span></div>
      <div x-carousel:slide class="bg-purple-100 rounded-lg p-8 flex items-center justify-center min-h-37.5"><span class="text-xl">Auto 2</span></div>
      <div x-carousel:slide class="bg-pink-100 rounded-lg p-8 flex items-center justify-center min-h-37.5"><span class="text-xl">Auto 3</span></div>
    </div>
  </div>
  <div class="flex justify-center gap-2 mt-4">
    <button x-carousel:pagination="0" class="w-2 h-2 rounded-full bg-gray-300 data-active:bg-blue-600"></button>
    <button x-carousel:pagination="1" class="w-2 h-2 rounded-full bg-gray-300 data-active:bg-blue-600"></button>
    <button x-carousel:pagination="2" class="w-2 h-2 rounded-full bg-gray-300 data-active:bg-blue-600"></button>
  </div>
</div>
</ComponentExample>

## Loop Mode

Enable infinite looping with `loop: true`.

<ComponentExample>
<div x-cloak x-carousel="{ slidesPerView: 1, spaceBetween: 16, loop: true }">
  <div x-carousel:viewport>
    <div x-carousel:track>
      <div x-carousel:slide class="bg-blue-100 rounded-lg p-8 flex items-center justify-center min-h-37.5"><span class="text-xl">Loop 1</span></div>
      <div x-carousel:slide class="bg-purple-100 rounded-lg p-8 flex items-center justify-center min-h-37.5"><span class="text-xl">Loop 2</span></div>
      <div x-carousel:slide class="bg-pink-100 rounded-lg p-8 flex items-center justify-center min-h-37.5"><span class="text-xl">Loop 3</span></div>
    </div>
  </div>
  <div class="flex justify-center gap-4 mt-4">
    <button x-carousel:prev-button class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">Previous</button>
    <button x-carousel:next-button class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">Next</button>
  </div>
</div>
</ComponentExample>

## Responsive Breakpoints

Use media query strings as keys for breakpoint-specific settings.

<ComponentExample>
<div x-cloak x-carousel="{ slidesPerView: 1, spaceBetween: 12, breakpoints: { '(min-width: 640px)': { slidesPerView: 2, spaceBetween: 16 }, '(min-width: 1024px)': { slidesPerView: 3, spaceBetween: 20 } } }">
  <div x-carousel:viewport>
    <div x-carousel:track>
      <div x-carousel:slide class="bg-blue-100 rounded-lg p-6 flex items-center justify-center min-h-25"><span class="font-bold">1</span></div>
      <div x-carousel:slide class="bg-purple-100 rounded-lg p-6 flex items-center justify-center min-h-25"><span class="font-bold">2</span></div>
      <div x-carousel:slide class="bg-pink-100 rounded-lg p-6 flex items-center justify-center min-h-25"><span class="font-bold">3</span></div>
      <div x-carousel:slide class="bg-green-100 rounded-lg p-6 flex items-center justify-center min-h-25"><span class="font-bold">4</span></div>
      <div x-carousel:slide class="bg-yellow-100 rounded-lg p-6 flex items-center justify-center min-h-25"><span class="font-bold">5</span></div>
      <div x-carousel:slide class="bg-red-100 rounded-lg p-6 flex items-center justify-center min-h-25"><span class="font-bold">6</span></div>
    </div>
  </div>
  <div class="flex justify-center gap-2 mt-4">
    <button x-carousel:prev-button class="px-3 py-1.5 bg-gray-200 rounded text-sm disabled:opacity-50">←</button>
    <button x-carousel:next-button class="px-3 py-1.5 bg-gray-200 rounded text-sm disabled:opacity-50">→</button>
  </div>
</div>
</ComponentExample>

## Data Attributes

### Slide Attributes

- `data-active` - Current active slide
- `data-prev` - Previous slide
- `data-next` - Next slide
- `data-visible` - Slide is visible in viewport
- `data-index` - Slide index number

### Pagination Attributes

- `data-active` - Active pagination bullet

### Example Styling

```html
<div x-carousel:slide class="
  data-active:scale-105
  data-active:shadow-lg
  transition-transform
">
  Slide content
</div>

<button x-carousel:pagination class="
  data-active:bg-blue-600
  data-active:w-6
">
</button>
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `slidesPerView` | `number` | `1` | Number of slides visible at once |
| `spaceBetween` | `number` | `0` | Space between slides in pixels |
| `loop` | `boolean` | `false` | Enable infinite looping |
| `keyboard` | `boolean` | `true` | Enable keyboard navigation |
| `draggable` | `boolean` | `true` | Enable mouse/touch drag |
| `freeMode` | `boolean` | `false` | Snap to nearest slide instead of using drag direction |
| `threshold` | `number` | `20` | Minimum drag distance to trigger slide change |
| `resistance` | `boolean` | `true` | Resistance effect at edges when not looping |
| `autoplay` | `boolean \| AutoplayConfig` | `false` | Enable autoplay |
| `speed` | `number` | `300` | Transition speed in ms |
| `breakpoints` | `object` | `{}` | Responsive breakpoint settings |
| `a11y` | `A11yConfig` | see below | Accessibility configuration |

### Autoplay Config

```typescript
{
  delay?: number          // Delay between slides in ms (default: 3000)
  pauseOnHover?: boolean  // Pause on mouse hover (default: true)
  pauseOnFocus?: boolean  // Pause when focused (default: true)
}
```

### A11y Config

```typescript
{
  enabled?: boolean           // Enable accessibility features (default: true)
  prevSlideMessage?: string   // Aria label for prev button (default: 'Previous slide')
  nextSlideMessage?: string   // Aria label for next button (default: 'Next slide')
}
```

### Breakpoints

```typescript
{
  '(min-width: 640px)': { slidesPerView: 2 },
  '(min-width: 1024px)': { slidesPerView: 3, spaceBetween: 24 }
}
```

### State Properties

Access via `$carousel` in Alpine expressions (e.g., `$carousel.activeIndex`):

| Property | Type | Description |
|----------|------|-------------|
| `activeIndex` | `number` | Index of the first visible slide |
| `pageIndex` | `number` | Same as `activeIndex` (each page is one slide position) |
| `firstVisibleIndex` | `number` | Index of the first visible slide |
| `lastVisibleIndex` | `number` | Index of the last visible slide |
| `totalSlides` | `number` | Total number of slides |
| `totalPages` | `number` | Number of navigable positions (`totalSlides - slidesPerView + 1`) |
| `canGoPrev` | `boolean` | Whether previous navigation is possible |
| `canGoNext` | `boolean` | Whether next navigation is possible |
| `progress` | `number` | Progress percentage (0 to 100) |
| `isAutoplayPaused` | `boolean` | Whether autoplay is currently paused |

### Methods

| Method | Description |
|--------|-------------|
| `goTo(index, smooth?)` | Go to specific slide |
| `next()` | Go to next slide |
| `prev()` | Go to previous slide |
| `update(settings)` | Update carousel settings at runtime |
| `startAutoplay()` | Start autoplay |
| `stopAutoplay()` | Stop autoplay |
| `pauseAutoplay()` | Pause autoplay temporarily |
| `resumeAutoplay()` | Resume autoplay |

### Events

| Event | Description | Payload |
|-------|-------------|---------|
| `slidechange` | Fired when active slide changes | `{ index: number }` |

### Parts

| Part | Description |
|------|-------------|
| `viewport` | Overflow container |
| `track` | Flex container with translateX (wraps slides) |
| `slide` | Individual slide element |
| `prev-button` | Previous slide button |
| `next-button` | Next slide button |
| `pagination` | Pagination bullet (requires page index value) |
| `pagination-fraction` | Fraction display (e.g., "1 / 3") |
| `pagination-progress` | Progress bar element |

### Slide Scope (`$slide`)

| Property | Type | Description |
|----------|------|-------------|
| `index` | `number` | Slide index |
| `isActive` | `boolean` | Whether this is the active slide |
| `isPrev` | `boolean` | Whether this is the previous slide |
| `isNext` | `boolean` | Whether this is the next slide |
| `isVisible` | `boolean` | Whether the slide is in the visible range |
| `activate()` | `function` | Navigate to this slide |

### Pagination Scope (`$pagination`)

| Property | Type | Description |
|----------|------|-------------|
| `index` | `number` | Page index |
| `isActive` | `boolean` | Whether this is the active page |
| `label` | `string` | Display label (e.g., "1") |
| `goTo()` | `function` | Navigate to this page |

## Accessibility

The carousel follows accessibility best practices:

- **Keyboard navigation**: Arrow keys to navigate, Home/End for first/last
- **ARIA attributes**: Proper roles and labels for screen readers
- **Focus management**: Keyboard focus support with visible indicators
- **Reduced motion**: Respects `prefers-reduced-motion` setting
- **Announcements**: Live region announces slide changes

### Keyboard Interactions

| Key | Action |
|-----|--------|
| `ArrowLeft` | Go to previous slide |
| `ArrowRight` | Go to next slide |
| `Home` | Go to first slide |
| `End` | Go to last slide |
| `Tab` | Focus next interactive element |
