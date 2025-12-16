# Carousel

A flexible carousel component with touch gestures, keyboard navigation, and multiple display modes.

## Features

- ✅ **Touch/swipe gestures**: Drag slides with mouse or touch
- ✅ **Keyboard navigation**: Arrow keys, Home, and End support
- ✅ **Flexible layouts**: Fixed slides per view or auto-width slides
- ✅ **Autoplay**: Optional automatic sliding with pause on hover/focus
- ✅ **Loop mode**: Infinite looping of slides
- ✅ **Pagination**: Multiple styles (dots, fraction, progress bar)
- ✅ **Responsive breakpoints**: Different settings per screen size
- ✅ **Accessible**: Full keyboard support and ARIA attributes

## Basic Example

<ComponentExample>
<div x-data x-cloak x-carousel="{ slidesPerView: 1, spaceBetween: 16 }">
  <div x-carousel:root>
    <div x-carousel:viewport class="overflow-hidden">
      <div class="flex" style="gap: var(--slide-spacing, 0px)">
        <div x-carousel:slide style="width: var(--slide-item-size)" class="flex-shrink-0 bg-blue-100 rounded-lg p-8 flex items-center justify-center min-h-[200px]"><span class="text-2xl font-bold">Slide 1</span></div>
        <div x-carousel:slide style="width: var(--slide-item-size)" class="flex-shrink-0 bg-purple-100 rounded-lg p-8 flex items-center justify-center min-h-[200px]"><span class="text-2xl font-bold">Slide 2</span></div>
        <div x-carousel:slide style="width: var(--slide-item-size)" class="flex-shrink-0 bg-pink-100 rounded-lg p-8 flex items-center justify-center min-h-[200px]"><span class="text-2xl font-bold">Slide 3</span></div>
      </div>
    </div>
    <div class="flex items-center justify-center gap-4 mt-4">
      <button x-carousel:prev-button class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">Previous</button>
      <button x-carousel:next-button class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">Next</button>
    </div>
  </div>
</div>
</ComponentExample>

## Multiple Slides Per View

Show multiple slides at once with `slidesPerView`.

<ComponentExample>
<div x-data x-cloak x-carousel="{ slidesPerView: 3, spaceBetween: 16 }">
  <div x-carousel:root>
    <div x-carousel:viewport class="overflow-hidden">
      <div class="flex" style="gap: var(--slide-spacing, 0px)">
        <div x-carousel:slide style="width: calc((100% - 32px) / 3)" class="flex-shrink-0 bg-blue-100 rounded-lg p-6 flex items-center justify-center min-h-[100px]"><span class="font-bold">1</span></div>
        <div x-carousel:slide style="width: calc((100% - 32px) / 3)" class="flex-shrink-0 bg-purple-100 rounded-lg p-6 flex items-center justify-center min-h-[100px]"><span class="font-bold">2</span></div>
        <div x-carousel:slide style="width: calc((100% - 32px) / 3)" class="flex-shrink-0 bg-pink-100 rounded-lg p-6 flex items-center justify-center min-h-[100px]"><span class="font-bold">3</span></div>
        <div x-carousel:slide style="width: calc((100% - 32px) / 3)" class="flex-shrink-0 bg-green-100 rounded-lg p-6 flex items-center justify-center min-h-[100px]"><span class="font-bold">4</span></div>
        <div x-carousel:slide style="width: calc((100% - 32px) / 3)" class="flex-shrink-0 bg-yellow-100 rounded-lg p-6 flex items-center justify-center min-h-[100px]"><span class="font-bold">5</span></div>
      </div>
    </div>
    <div class="flex justify-center gap-2 mt-4">
      <button x-carousel:prev-button class="px-3 py-1.5 bg-gray-200 rounded text-sm">←</button>
      <button x-carousel:next-button class="px-3 py-1.5 bg-gray-200 rounded text-sm">→</button>
    </div>
  </div>
</div>
</ComponentExample>

## Auto-Width Slides

Use `slidesPerView: 'auto'` for slides with custom widths.

<ComponentExample>
<div x-data x-cloak x-carousel="{ slidesPerView: 'auto', spaceBetween: 12 }">
  <div x-carousel:root>
    <div x-carousel:viewport class="overflow-hidden">
      <div class="flex" style="gap: var(--slide-spacing, 0px)">
        <div x-carousel:slide style="width: 200px" class="shrink-0 bg-blue-100 rounded-lg p-4 flex items-center justify-center"><span>200px</span></div>
        <div x-carousel:slide style="width: 300px" class="shrink-0 bg-purple-100 rounded-lg p-4 flex items-center justify-center"><span>300px</span></div>
        <div x-carousel:slide style="width: 250px" class="shrink-0 bg-pink-100 rounded-lg p-4 flex items-center justify-center"><span>250px</span></div>
        <div x-carousel:slide style="width: 180px" class="shrink-0 bg-green-100 rounded-lg p-4 flex items-center justify-center"><span>180px</span></div>
      </div>
    </div>
    <div class="flex justify-center gap-2 mt-4">
      <button x-carousel:prev-button class="px-3 py-1.5 bg-gray-200 rounded">←</button>
      <button x-carousel:next-button class="px-3 py-1.5 bg-gray-200 rounded">→</button>
    </div>
  </div>
</div>
</ComponentExample>

## Pagination Dots

Add pagination dots for visual slide indicators.

<ComponentExample>
<div x-data x-cloak x-carousel="{ slidesPerView: 1, spaceBetween: 16 }">
  <div x-carousel:root>
    <div x-carousel:viewport class="overflow-hidden">
      <div class="flex" style="gap: var(--slide-spacing, 0px)">
        <div x-carousel:slide style="width: var(--slide-item-size)" class="shrink-0 bg-blue-100 rounded-lg p-8 flex items-center justify-center min-h-37.5"><span class="text-xl">Slide 1</span></div>
        <div x-carousel:slide style="width: var(--slide-item-size)" class="shrink-0 bg-purple-100 rounded-lg p-8 flex items-center justify-center min-h-37.5"><span class="text-xl">Slide 2</span></div>
        <div x-carousel:slide style="width: var(--slide-item-size)" class="shrink-0 bg-pink-100 rounded-lg p-8 flex items-center justify-center min-h-37.5"><span class="text-xl">Slide 3</span></div>
        <div x-carousel:slide style="width: var(--slide-item-size)" class="shrink-0 bg-green-100 rounded-lg p-8 flex items-center justify-center min-h-37.5"><span class="text-xl">Slide 4</span></div>
      </div>
    </div>
    <div class="flex justify-center gap-2 mt-4">
      <button x-carousel:pagination="0" class="w-2 h-2 rounded-full bg-gray-300 data-active:bg-blue-600 data-active:w-6 transition-all"></button>
      <button x-carousel:pagination="1" class="w-2 h-2 rounded-full bg-gray-300 data-active:bg-blue-600 data-active:w-6 transition-all"></button>
      <button x-carousel:pagination="2" class="w-2 h-2 rounded-full bg-gray-300 data-active:bg-blue-600 data-active:w-6 transition-all"></button>
      <button x-carousel:pagination="3" class="w-2 h-2 rounded-full bg-gray-300 data-active:bg-blue-600 data-active:w-6 transition-all"></button>
    </div>
  </div>
</div>
</ComponentExample>

## Pagination Fraction

Show current slide position as a fraction.

<ComponentExample>
<div x-data x-cloak x-carousel>
  <div x-carousel:root>
    <div x-carousel:viewport class="overflow-hidden">
      <div class="flex" style="gap: var(--slide-spacing, 0px)">
        <div x-carousel:slide style="width: var(--slide-item-size)" class="shrink-0 bg-blue-100 rounded-lg p-8 flex items-center justify-center min-h-37.5"><span class="text-xl">Slide 1</span></div>
        <div x-carousel:slide style="width: var(--slide-item-size)" class="shrink-0 bg-purple-100 rounded-lg p-8 flex items-center justify-center min-h-37.5"><span class="text-xl">Slide 2</span></div>
        <div x-carousel:slide style="width: var(--slide-item-size)" class="shrink-0 bg-pink-100 rounded-lg p-8 flex items-center justify-center min-h-37.5"><span class="text-xl">Slide 3</span></div>
      </div>
    </div>
    <div class="flex items-center justify-center gap-4 mt-4">
      <button x-carousel:prev-button class="px-3 py-1.5 bg-gray-200 rounded">←</button>
      <div x-carousel:pagination-fraction class="text-sm font-medium"></div>
      <button x-carousel:next-button class="px-3 py-1.5 bg-gray-200 rounded">→</button>
    </div>
  </div>
</div>
</ComponentExample>

## Progress Bar

Display a progress bar showing carousel position.

<ComponentExample>
<div x-data x-cloak x-carousel="{ slidesPerView: 1 }">
  <div x-carousel:root>
    <div x-carousel:viewport class="overflow-hidden">
      <div class="flex" style="gap: var(--slide-spacing, 0px)">
        <div x-carousel:slide style="width: var(--slide-item-size)" class="shrink-0 bg-blue-100 rounded-lg p-8 flex items-center justify-center min-h-37.5"><span class="text-xl">Slide 1</span></div>
        <div x-carousel:slide style="width: var(--slide-item-size)" class="shrink-0 bg-purple-100 rounded-lg p-8 flex items-center justify-center min-h-37.5"><span class="text-xl">Slide 2</span></div>
        <div x-carousel:slide style="width: var(--slide-item-size)" class="shrink-0 bg-pink-100 rounded-lg p-8 flex items-center justify-center min-h-37.5"><span class="text-xl">Slide 3</span></div>
        <div x-carousel:slide style="width: var(--slide-item-size)" class="shrink-0 bg-green-100 rounded-lg p-8 flex items-center justify-center min-h-37.5"><span class="text-xl">Slide 4</span></div>
      </div>
    </div>
    <div class="mt-4">
      <div class="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
        <div x-carousel:pagination-progress class="h-full bg-blue-600 transition-all"></div>
      </div>
    </div>
  </div>
</div>
</ComponentExample>

## Autoplay

Enable automatic slide progression.

<ComponentExample>
<div x-data x-cloak x-carousel="{ slidesPerView: 1, autoplay: { delay: 2000, pauseOnHover: true } }">
  <div x-carousel:root>
    <div x-carousel:viewport class="overflow-hidden">
      <div class="flex" style="gap: var(--slide-spacing, 0px)">
        <div x-carousel:slide style="width: var(--slide-item-size)" class="shrink-0 bg-blue-100 rounded-lg p-8 flex items-center justify-center min-h-37.5"><span class="text-xl">Auto 1</span></div>
        <div x-carousel:slide style="width: var(--slide-item-size)" class="shrink-0 bg-purple-100 rounded-lg p-8 flex items-center justify-center min-h-37.5"><span class="text-xl">Auto 2</span></div>
        <div x-carousel:slide style="width: var(--slide-item-size)" class="shrink-0 bg-pink-100 rounded-lg p-8 flex items-center justify-center min-h-37.5"><span class="text-xl">Auto 3</span></div>
      </div>
    </div>
    <div class="flex justify-center gap-2 mt-4">
      <button x-carousel:pagination="0" class="w-2 h-2 rounded-full bg-gray-300 data-active:bg-blue-600"></button>
      <button x-carousel:pagination="1" class="w-2 h-2 rounded-full bg-gray-300 data-active:bg-blue-600"></button>
      <button x-carousel:pagination="2" class="w-2 h-2 rounded-full bg-gray-300 data-active:bg-blue-600"></button>
    </div>
  </div>
</div>
</ComponentExample>

## Loop Mode

Enable infinite looping of slides.

<ComponentExample>
<div x-data x-cloak x-carousel="{ slidesPerView: 1, loop: true }">
  <div x-carousel:root>
    <div x-carousel:viewport class="overflow-hidden">
      <div class="flex" style="gap: var(--slide-spacing, 0px)">
        <div x-carousel:slide style="width: var(--slide-item-size)" class="shrink-0 bg-blue-100 rounded-lg p-8 flex items-center justify-center min-h-37.5"><span class="text-xl">Loop 1</span></div>
        <div x-carousel:slide style="width: var(--slide-item-size)" class="shrink-0 bg-purple-100 rounded-lg p-8 flex items-center justify-center min-h-37.5"><span class="text-xl">Loop 2</span></div>
        <div x-carousel:slide style="width: var(--slide-item-size)" class="shrink-0 bg-pink-100 rounded-lg p-8 flex items-center justify-center min-h-37.5"><span class="text-xl">Loop 3</span></div>
      </div>
    </div>
    <div class="flex justify-center gap-2 mt-4">
      <button x-carousel:prev-button class="px-4 py-2 bg-gray-200 rounded">Previous</button>
      <button x-carousel:next-button class="px-4 py-2 bg-gray-200 rounded">Next</button>
    </div>
  </div>
</div>
</ComponentExample>

## Data Attributes

All parts include data attributes for styling based on state.

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
  shrink-0
  w-full
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
| `slidesPerView` | `number \| 'auto'` | `1` | Number of slides visible or 'auto' for custom widths |
| `spaceBetween` | `number` | `0` | Space between slides in pixels |
| `loop` | `boolean` | `false` | Enable infinite looping |
| `keyboard` | `boolean` | `true` | Enable keyboard navigation |
| `draggable` | `boolean` | `true` | Enable mouse/touch drag |
| `freeMode` | `boolean` | `false` | Disable snap to slides |
| `snapToSlides` | `boolean` | `true` | Snap to closest slide after drag |
| `threshold` | `number` | `10` | Minimum drag distance to trigger slide |
| `resistance` | `boolean` | `true` | Resistance at carousel edges |
| `autoplay` | `boolean \| AutoplayConfig` | `false` | Enable autoplay |
| `speed` | `number` | `300` | Transition speed in ms |
| `breakpoints` | `object` | `{}` | Responsive breakpoint settings |

### Autoplay Config

```typescript
{
  delay: number          // Delay between slides in ms
  pauseOnHover?: boolean // Pause on mouse hover
  pauseOnFocus?: boolean // Pause when focused
}
```

### Breakpoints

```typescript
{
  640: { slidesPerView: 2 },
  1024: { slidesPerView: 3, spaceBetween: 24 }
}
```

### Methods

Access via `$carousel` in Alpine expressions:

| Method | Description |
|--------|-------------|
| `goTo(index, smooth?)` | Go to specific slide |
| `next()` | Go to next slide |
| `prev()` | Go to previous slide |
| `startAutoplay()` | Start autoplay |
| `stopAutoplay()` | Stop autoplay |
| `pauseAutoplay()` | Pause autoplay temporarily |
| `resumeAutoplay()` | Resume autoplay |

### Events

| Event | Description | Payload |
|-------|-------------|---------|
| `slidechange` | Fired when active slide changes | `{ index: number }` |
| `slide:visibility` | Fired when slide visibility changes | `{ index: number, isVisible: boolean }` |

### Parts

| Part | Description |
|------|-------------|
| `root` | Root container element |
| `viewport` | Scrollable viewport container |
| `slide` | Individual slide element |
| `prev-button` | Previous slide button |
| `next-button` | Next slide button |
| `pagination` | Pagination bullet (requires index value) |
| `pagination-fraction` | Fraction display (e.g., "1 / 5") |
| `pagination-progress` | Progress bar element |

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
