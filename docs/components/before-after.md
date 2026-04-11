# Before After

An accessible before/after comparison component with a draggable slider.

## Basic Usage

<ComponentExample>

<div x-before-after="{ value: 50 }" class="relative w-full max-w-2xl aspect-video rounded-lg">
  <div x-before-after:before>
    <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80&bri=-15&con=-10" alt="Before" class="w-full h-full object-cover" />
  </div>
  <div x-before-after:after>
    <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80" alt="After" class="w-full h-full object-cover" />
  </div>
  <div x-before-after:separator class="w-0.5 bg-white/80"></div>
  <div x-before-after:handle class="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-blue-500">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 8L22 12L18 16" /><path d="M6 8L2 12L6 16" />
    </svg>
  </div>
  <span class="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded">Before</span>
  <span class="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded">After</span>
</div>

</ComponentExample>

## Custom Initial Position

Start the slider at a different position by setting the `value` prop.

<ComponentExample>

<div x-before-after="{ value: 25 }" class="relative w-full max-w-2xl aspect-video rounded-lg">
  <div x-before-after:before>
    <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80&bri=-15&con=-10" alt="Before" class="w-full h-full object-cover" />
  </div>
  <div x-before-after:after>
    <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80" alt="After" class="w-full h-full object-cover" />
  </div>
  <div x-before-after:separator class="w-0.5 bg-white/80"></div>
  <div x-before-after:handle class="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-blue-500">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 8L22 12L18 16" /><path d="M6 8L2 12L6 16" />
    </svg>
  </div>
</div>

</ComponentExample>

## Vertical Orientation

<ComponentExample>

<div x-before-after="{ value: 50, orientation: 'vertical' }" class="relative w-full max-w-md aspect-3/4 rounded-lg">
  <div x-before-after:before>
    <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80&bri=-15&con=-10" alt="Before" class="w-full h-full object-cover" />
  </div>
  <div x-before-after:after>
    <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80" alt="After" class="w-full h-full object-cover" />
  </div>
  <div x-before-after:separator class="h-0.5 bg-white/80"></div>
  <div x-before-after:handle class="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-blue-500">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 6L12 2L16 6" /><path d="M8 18L12 22L16 18" />
    </svg>
  </div>
  <span class="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded">Before</span>
  <span class="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded">After</span>
</div>

</ComponentExample>

## With x-model

<ComponentExample>

<div x-data="{ position: 50 }">
  <div x-before-after x-model="position" class="relative w-full max-w-2xl aspect-video rounded-lg">
    <div x-before-after:before>
      <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80&bri=-15&con=-10" alt="Before" class="w-full h-full object-cover" />
    </div>
    <div x-before-after:after>
      <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80" alt="After" class="w-full h-full object-cover" />
    </div>
    <div x-before-after:separator class="w-0.5 bg-white/80"></div>
    <div x-before-after:handle class="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-blue-500">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 8L22 12L18 16" /><path d="M6 8L2 12L6 16" />
      </svg>
    </div>
  </div>
  <p class="mt-4 text-sm text-gray-600 dark:text-zinc-400">
    Position: <span x-text="Math.round(position)" class="font-mono"></span>%
  </p>
</div>

</ComponentExample>

## Disabled State

<ComponentExample>

<div x-before-after="{ value: 40, disabled: true }" class="relative w-full max-w-2xl aspect-video rounded-lg opacity-75">
  <div x-before-after:before>
    <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80&bri=-15&con=-10" alt="Before" class="w-full h-full object-cover" />
  </div>
  <div x-before-after:after>
    <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80" alt="After" class="w-full h-full object-cover" />
  </div>
  <div x-before-after:separator class="w-0.5 bg-white/50"></div>
  <div x-before-after:handle class="w-10 h-10 bg-white/50 rounded-full shadow-lg flex items-center justify-center cursor-not-allowed">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 8L22 12L18 16" /><path d="M6 8L2 12L6 16" />
    </svg>
  </div>
</div>

</ComponentExample>

## API Reference

### Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `50` | Position of the divider as a percentage (0 to 100) |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientation of the comparison slider |
| `disabled` | `boolean` | `false` | Whether the slider is disabled |
| `step` | `number` | `1` | Keyboard step increment |

### Parts

| Part | Description |
|------|-------------|
| `x-before-after` | Root container element |
| `x-before-after:before` | Container for the "before" image (clipped based on position) |
| `x-before-after:after` | Container for the "after" image (clipped inversely) |
| `x-before-after:separator` | Visual divider line at the current position |
| `x-before-after:handle` | Draggable thumb element for controlling the position |

### Data Attributes

| Attribute | Description |
|-----------|-------------|
| `data-orientation` | Current orientation (`horizontal` or `vertical`) |
| `data-disabled` | Present when the slider is disabled |
| `data-dragging` | Present while the handle is being dragged |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `change` | `{ value }` | Fired when the slider position changes |

### Keyboard Interactions

| Key | Description |
|-----|-------------|
| `ArrowRight` / `ArrowUp` | Increase position by step |
| `ArrowLeft` / `ArrowDown` | Decrease position by step |
| `PageUp` | Increase position by 10x step |
| `PageDown` | Decrease position by 10x step |
| `Home` | Set position to 0% |
| `End` | Set position to 100% |

## Accessibility

This component follows the [WAI-ARIA Slider Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/slider/):

- Uses `role="slider"` on the handle element
- Provides `aria-valuenow`, `aria-valuemin`, `aria-valuemax` attributes
- Supports `aria-orientation` for vertical mode
- Provides `aria-valuetext` for human-readable announcements
- Implements all required keyboard interactions
- Add an `aria-label` on the handle for context-specific descriptions (e.g., `aria-label="Photo brightness comparison"`)
- Include descriptive `alt` text on both images for screen readers

## Styling

The component is completely unstyled by default. Use the data attributes and parts to style it:

```css
/* Root container */
[data-scope="before-after"][data-part="root"] {
  /* Container styles, set dimensions here */
}

/* Separator line */
[data-part="separator"] {
  /* Divider line styles */
}

/* Handle */
[data-part="handle"] {
  /* Thumb/handle styles */
}

/* Dragging state */
[data-dragging] [data-part="handle"] {
  /* Styles while actively dragging */
}

/* Disabled state */
[data-disabled] {
  /* Disabled appearance */
}
```

## Tips

- Both `before` and `after` containers should hold full-size content. The component clips them using `clip-path`.
- Set explicit dimensions on the root element (e.g., `aspect-video`, fixed height/width) so both images align correctly.
- Use `object-cover` on images to prevent distortion when aspect ratios differ.
- The `before` and `after` parts can contain any content, not just images.
- Add labels (e.g., "Before" / "After" badges) outside the clipped containers so they remain visible at all positions.
