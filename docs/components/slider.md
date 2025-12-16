# Slider

An accessible slider component for selecting numeric values from a range.

## Basic Usage

<ComponentExample>

<div x-slider="{ value: 50 }" class="space-y-2">
  <label x-slider:label class="block text-sm font-medium text-gray-700 dark:text-zinc-300">
    Volume
  </label>
  <div x-slider:control class="relative h-2 w-full">
    <div x-slider:track class="absolute inset-0 bg-gray-200 dark:bg-zinc-700 rounded"></div>
    <div x-slider:range class="absolute h-full bg-blue-500 rounded"></div>
    <button x-slider:thumb="0" class="absolute w-5 h-5 bg-white border-2 border-blue-500 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-grab active:cursor-grabbing"></button>
  </div>
  <div x-slider:output class="text-sm text-gray-600 dark:text-zinc-400"></div>
</div>

</ComponentExample>

## Range Slider (Two Thumbs)

Use an array value to create a range slider with multiple thumbs.

<ComponentExample>

<div x-slider="{ value: [25, 75] }" class="space-y-2">
  <label x-slider:label class="block text-sm font-medium text-gray-700 dark:text-zinc-300">
    Price Range
  </label>
  <div x-slider:control class="relative h-2 w-full">
    <div x-slider:track class="absolute inset-0 bg-gray-200 dark:bg-zinc-700 rounded"></div>
    <div x-slider:range class="absolute h-full bg-green-500 rounded"></div>
    <button x-slider:thumb="0" class="absolute w-5 h-5 bg-white border-2 border-green-500 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-grab active:cursor-grabbing"></button>
    <button x-slider:thumb="1" class="absolute w-5 h-5 bg-white border-2 border-green-500 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-grab active:cursor-grabbing"></button>
  </div>
  <div x-slider:output class="text-sm text-gray-600 dark:text-zinc-400"></div>
</div>

</ComponentExample>

## Multi-Range Slider

Create sliders with 3 or more thumbs for complex selections.

<ComponentExample>

<div x-slider="{ value: [20, 50, 80] }" class="space-y-2">
  <label x-slider:label class="block text-sm font-medium text-gray-700 dark:text-zinc-300">
    Multi-point Selection
  </label>
  <div x-slider:control class="relative h-2 w-full">
    <div x-slider:track class="absolute inset-0 bg-gray-200 dark:bg-zinc-700 rounded"></div>
    <div x-slider:range class="absolute h-full bg-purple-500 rounded"></div>
    <button x-slider:thumb="0" class="absolute w-5 h-5 bg-white border-2 border-purple-500 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 cursor-grab active:cursor-grabbing"></button>
    <button x-slider:thumb="1" class="absolute w-5 h-5 bg-white border-2 border-purple-500 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 cursor-grab active:cursor-grabbing"></button>
    <button x-slider:thumb="2" class="absolute w-5 h-5 bg-white border-2 border-purple-500 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 cursor-grab active:cursor-grabbing"></button>
  </div>
  <div x-slider:output class="text-sm text-gray-600 dark:text-zinc-400"></div>
</div>

</ComponentExample>

## Vertical Slider

<ComponentExample>

<div x-slider="{ value: 60, orientation: 'vertical' }" class="flex gap-4">
  <div x-slider:control class="relative w-2 h-48">
    <div x-slider:track class="absolute inset-0 bg-gray-200 dark:bg-zinc-700 rounded"></div>
    <div x-slider:range class="absolute w-full bg-red-500 rounded"></div>
    <button x-slider:thumb="0" class="absolute w-5 h-5 -left-1.5 bg-white border-2 border-red-500 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-grab active:cursor-grabbing"></button>
  </div>
  <div class="flex flex-col justify-between">
    <label x-slider:label class="text-sm font-medium text-gray-700 dark:text-zinc-300">Temperature</label>
    <div x-slider:output class="text-sm text-gray-600 dark:text-zinc-400"></div>
  </div>
</div>

</ComponentExample>

## Custom Min, Max, and Step

<ComponentExample>

<div x-slider="{ value: 0, min: -10, max: 10, step: 0.5 }" class="space-y-2">
  <label x-slider:label class="block text-sm font-medium text-gray-700 dark:text-zinc-300">
    Adjustment (-10 to 10)
  </label>
  <div x-slider:control class="relative h-2 w-full">
    <div x-slider:track class="absolute inset-0 bg-gray-200 dark:bg-zinc-700 rounded"></div>
    <div x-slider:range class="absolute h-full bg-orange-500 rounded"></div>
    <button x-slider:thumb="0" class="absolute w-5 h-5 bg-white border-2 border-orange-500 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 cursor-grab active:cursor-grabbing"></button>
  </div>
  <div x-slider:output class="text-sm text-gray-600 dark:text-zinc-400"></div>
</div>

</ComponentExample>

## With x-model

<ComponentExample>

<div x-data="{ volume: 50 }">
  <div x-slider x-model="volume" class="space-y-2">
    <label x-slider:label class="block text-sm font-medium text-gray-700 dark:text-zinc-300">
      Volume
    </label>
    <div x-slider:control class="relative h-2 w-full">
      <div x-slider:track class="absolute inset-0 bg-gray-200 dark:bg-zinc-700 rounded"></div>
      <div x-slider:range class="absolute h-full bg-blue-500 rounded"></div>
      <button x-slider:thumb="0" class="absolute w-5 h-5 bg-white border-2 border-blue-500 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-grab active:cursor-grabbing"></button>
    </div>
    <div x-slider:output class="text-sm text-gray-600 dark:text-zinc-400"></div>
  </div>
  <p class="mt-4 text-sm text-gray-600 dark:text-zinc-400">
    Current volume: <span x-text="volume" class="font-mono"></span>
  </p>
</div>

</ComponentExample>

## With Markers

Add visual markers at specific values along the track.

<ComponentExample>

<div x-slider="{ value: 50 }" class="space-y-2">
  <label x-slider:label class="block text-sm font-medium text-gray-700 dark:text-zinc-300">
    Volume
  </label>
  <div x-slider:control class="relative h-2 w-full">
    <div x-slider:track class="absolute inset-0 bg-gray-200 dark:bg-zinc-700 rounded"></div>
    <div x-slider:range class="absolute h-full bg-blue-500 rounded"></div>
    <div x-slider:marker="0" class="w-1 h-1 bg-gray-400 rounded-full"></div>
    <div x-slider:marker="25" class="w-1 h-1 bg-gray-400 rounded-full"></div>
    <div x-slider:marker="50" class="w-1 h-1 bg-gray-400 rounded-full"></div>
    <div x-slider:marker="75" class="w-1 h-1 bg-gray-400 rounded-full"></div>
    <div x-slider:marker="100" class="w-1 h-1 bg-gray-400 rounded-full"></div>
    <button x-slider:thumb="0" class="absolute w-5 h-5 bg-white border-2 border-blue-500 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-grab active:cursor-grabbing"></button>
  </div>
  <div x-slider:output class="text-sm text-gray-600 dark:text-zinc-400"></div>
</div>

</ComponentExample>

## Read-Only State

<ComponentExample>

<div x-slider="{ value: 65, readOnly: true }" class="space-y-2">
  <label x-slider:label class="block text-sm font-medium text-gray-700 dark:text-zinc-300">
    Progress (read-only)
  </label>
  <div x-slider:control class="relative h-2 w-full">
    <div x-slider:track class="absolute inset-0 bg-gray-200 dark:bg-zinc-700 rounded"></div>
    <div x-slider:range class="absolute h-full bg-gray-400 rounded"></div>
    <span x-slider:thumb="0" class="absolute w-5 h-5 bg-gray-400 rounded-full pointer-events-none"></span>
  </div>
  <div x-slider:output class="text-sm text-gray-600 dark:text-zinc-400"></div>
</div>

</ComponentExample>

## Disabled State

<ComponentExample>

<div x-slider="{ value: 30, disabled: true }" class="space-y-2">
  <label x-slider:label class="block text-sm font-medium text-gray-400">
    Volume (disabled)
  </label>
  <div x-slider:control class="relative h-2 w-full opacity-50 cursor-not-allowed">
    <div x-slider:track class="absolute inset-0 bg-gray-200 rounded"></div>
    <div x-slider:range class="absolute h-full bg-gray-400 rounded"></div>
    <span x-slider:thumb="0" class="absolute w-5 h-5 bg-gray-400 border-2 border-gray-300 rounded-full pointer-events-none"></span>
  </div>
  <div x-slider:output class="text-sm text-gray-400"></div>
</div>

</ComponentExample>

## Formatted Values

<ComponentExample>

<div x-slider="{ value: 1250, min: 0, max: 5000, step: 50, formatOptions: { style: 'currency', currency: 'USD' } }" class="space-y-2">
  <label x-slider:label class="block text-sm font-medium text-gray-700 dark:text-zinc-300">
    Budget
  </label>
  <div x-slider:control class="relative h-2 w-full">
    <div x-slider:track class="absolute inset-0 bg-gray-200 dark:bg-zinc-700 rounded"></div>
    <div x-slider:range class="absolute h-full bg-emerald-500 rounded"></div>
    <button x-slider:thumb="0" class="absolute w-5 h-5 bg-white border-2 border-emerald-500 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 cursor-grab active:cursor-grabbing"></button>
  </div>
  <div x-slider:output class="text-sm font-medium text-gray-700 dark:text-zinc-300"></div>
</div>

</ComponentExample>

## With Change Event

<ComponentExample>

<div x-data="{ message: '' }">
  <div x-slider="{ value: 50 }" x-on:change="message = `Value changed to: ${$event.detail.value}`" class="space-y-2">
    <label x-slider:label class="block text-sm font-medium text-gray-700 dark:text-zinc-300">
      Slider
    </label>
    <div x-slider:control class="relative h-2 w-full">
      <div x-slider:track class="absolute inset-0 bg-gray-200 dark:bg-zinc-700 rounded"></div>
      <div x-slider:range class="absolute h-full bg-blue-500 rounded"></div>
      <button x-slider:thumb="0" class="absolute w-5 h-5 bg-white border-2 border-blue-500 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-grab active:cursor-grabbing"></button>
    </div>
  </div>
  <p class="mt-4 text-sm text-gray-600 dark:text-zinc-400" x-text="message"></p>
</div>

</ComponentExample>

## API Reference

### Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number \| number[]` | `0` | Single value or array of values for multiple thumbs |
| `min` | `number` | `0` | Minimum allowed value |
| `max` | `number` | `100` | Maximum allowed value |
| `step` | `number` | `1` | Value increment/decrement step |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Slider orientation |
| `disabled` | `boolean` | `false` | Whether the slider is disabled |
| `readOnly` | `boolean` | `false` | Whether the slider is read-only |
| `name` | `string` | - | Name for form submission |
| `formatOptions` | `Intl.NumberFormatOptions` | - | Options for formatting displayed values |

### Parts

| Part | Description |
|------|-------------|
| `x-slider:root` | Root container element |
| `x-slider:label` | Label element |
| `x-slider:control` | Track container (clickable area) |
| `x-slider:track` | Background track |
| `x-slider:range` | Filled range (from min to value, or between thumbs) |
| `x-slider:thumb="index"` | Draggable thumb element (index starts at 0) |
| `x-slider:marker="value"` | Visual marker at a specific value position |
| `x-slider:output` | Value display element |
| `x-slider:hidden-input="index"` | Hidden input for form submission (optional) |

### Data Attributes

| Attribute | Description |
|-----------|-------------|
| `data-disabled` | Present when slider is disabled |
| `data-orientation` | Current orientation (`horizontal` or `vertical`) |
| `data-index` | Thumb index (on thumb elements) |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `change` | `{ value, values }` | Fired when slider value changes |

### Keyboard Interactions

| Key | Description |
|-----|-------------|
| `ArrowRight` / `ArrowUp` | Increase value by step |
| `ArrowLeft` / `ArrowDown` | Decrease value by step |
| `PageUp` | Increase value by 10× step |
| `PageDown` | Decrease value by 10× step |
| `Home` | Set to minimum value |
| `End` | Set to maximum value |
| `Tab` | Move focus to next/previous thumb |

## Accessibility

This component follows the [WAI-ARIA Slider Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/slider/):

- Uses `role="slider"` on thumb elements
- Provides `aria-valuenow`, `aria-valuemin`, `aria-valuemax` attributes
- Supports `aria-valuetext` for formatted value announcements
- Implements all required keyboard interactions
- Manages focus properly between multiple thumbs
- Prevents thumbs from crossing each other

## Styling

The slider is completely unstyled by default. Use the data attributes and parts to style it:

```css
/* Track */
[data-part="track"] {
  /* Background track styles */
}

/* Filled range */
[data-part="range"] {
  /* Filled portion styles */
}

/* Thumb */
[data-part="thumb"] {
  /* Thumb styles */
}

/* Disabled state */
[data-disabled] [data-part="thumb"] {
  /* Disabled thumb styles */
}

/* Vertical orientation */
[data-orientation="vertical"] [data-part="control"] {
  /* Vertical slider styles */
}
```

## Tips

- Use arrays for the `value` prop to create range sliders with multiple thumbs
- Thumbs automatically prevent crossing each other
- Click anywhere on the track to move the nearest thumb to that position
- The `range` part automatically positions itself between the first and last thumb
- For vertical sliders, set appropriate height on the control element
- Use `formatOptions` to display currency, percentages, or other formatted values
