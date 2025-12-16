# Number Input

A fully accessible number input component with increment/decrement controls, keyboard navigation, mouse wheel support, and optional scrubbing functionality.

## Features

- ✅ Min/max value constraints
- ✅ Custom step increments
- ✅ Keyboard navigation (Arrow keys, Page Up/Down, Home/End)
- ✅ Mouse wheel support (optional)
- ✅ Virtual scrubbing (drag to change value)
- ✅ Number formatting (currency, percentage, etc.)
- ✅ WAI-ARIA spinbutton pattern
- ✅ Floating point precision handling

## Installation

```js
import Alpine from 'alpinejs'
import numberInput from 'alpine-headless-ui/number-input'

Alpine.plugin(numberInput)
Alpine.start()
```

## Examples

### Basic Number Input

A simple number input with increment and decrement buttons.

<ComponentExample>

<div x-number-input="{ value: 5, min: 0, max: 10, step: 1 }" class="space-y-2">
  <label x-number-input:label class="block text-sm font-medium text-gray-700 dark:text-zinc-300">
    Quantity
  </label>
  <div class="flex gap-2">
    <button x-number-input:decrement class="px-4 py-2 bg-gray-200 dark:bg-zinc-700 text-gray-900 dark:text-zinc-100 rounded hover:bg-gray-300 dark:hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed">
      −
    </button>
    <input x-number-input:input class="w-24 px-3 py-2 text-center border border-gray-300 dark:border-zinc-600 rounded bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400" />
    <button x-number-input:increment class="px-4 py-2 bg-gray-200 dark:bg-zinc-700 text-gray-900 dark:text-zinc-100 rounded hover:bg-gray-300 dark:hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed">
      +
    </button>
  </div>
</div>

</ComponentExample>

### With Min/Max Constraints

Number input with minimum and maximum value limits.

<ComponentExample>

<div x-number-input="{ value: 50, min: 0, max: 100, step: 5 }" class="space-y-2">
  <label x-number-input:label class="block text-sm font-medium text-gray-700 dark:text-zinc-300">
    Percentage
  </label>
  <div class="flex gap-2">
    <button x-number-input:decrement class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
      −5
    </button>
    <input x-number-input:input class="w-24 px-3 py-2 text-center border border-gray-300 dark:border-zinc-600 rounded bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400" />
    <button x-number-input:increment class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
      +5
    </button>
  </div>
  <p class="text-xs text-gray-500 dark:text-zinc-400">Range: 0-100, Step: 5</p>
</div>

</ComponentExample>

### Currency Format

Number input with currency formatting.

<ComponentExample>

<div x-number-input="{ value: 99.99, min: 0, max: 999.99, step: 0.01, formatOptions: { style: 'currency', currency: 'USD' } }" class="space-y-2">
  <label x-number-input:label class="block text-sm font-medium text-gray-700 dark:text-zinc-300">
    Price
  </label>
  <div class="flex gap-2">
    <button x-number-input:decrement class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed">
      −
    </button>
    <input x-number-input:input class="w-32 px-3 py-2 text-center border border-gray-300 dark:border-zinc-600 rounded bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400" />
    <button x-number-input:increment class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed">
      +
    </button>
  </div>
</div>

</ComponentExample>

### Decimal Steps

Number input with decimal step values.

<ComponentExample>

<div x-number-input="{ value: 2.5, min: 0, max: 10, step: 0.5 }" class="space-y-2">
  <label x-number-input:label class="block text-sm font-medium text-gray-700 dark:text-zinc-300">
    Rating
  </label>
  <div class="flex gap-2">
    <button x-number-input:decrement class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed">
      −0.5
    </button>
    <input x-number-input:input class="w-24 px-3 py-2 text-center border border-gray-300 dark:border-zinc-600 rounded bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400" />
    <button x-number-input:increment class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed">
      +0.5
    </button>
  </div>
</div>

</ComponentExample>

### With Mouse Wheel

Number input that allows changing value using mouse wheel when focused.

<ComponentExample>

<div x-number-input="{ value: 10, min: 0, max: 100, step: 1, allowMouseWheel: true }" class="space-y-2">
  <label x-number-input:label class="block text-sm font-medium text-gray-700 dark:text-zinc-300">
    Volume (try scrolling while focused)
  </label>
  <div class="flex gap-2">
    <button x-number-input:decrement class="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed">
      −
    </button>
    <input x-number-input:input class="w-24 px-3 py-2 text-center border border-gray-300 dark:border-zinc-600 rounded bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400" />
    <button x-number-input:increment class="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed">
      +
    </button>
  </div>
  <p class="text-xs text-gray-500 dark:text-zinc-400">Focus the input and use your mouse wheel to change the value</p>
</div>

</ComponentExample>

### With Scrubber

Number input with virtual scrubbing (drag up/down to change value).

<ComponentExample>

<div x-number-input="{ value: 50, min: 0, max: 100, step: 1 }" class="space-y-2">
  <label x-number-input:label class="block text-sm font-medium text-gray-700 dark:text-zinc-300">
    Brightness
  </label>
  <div class="flex gap-2 items-center">
    <button x-number-input:decrement class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed">
      −
    </button>
    <div class="relative">
      <input x-number-input:input class="w-24 px-3 py-2 text-center border border-gray-300 dark:border-zinc-600 rounded bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400" />
      <div x-number-input:scrubber class="absolute inset-y-0 left-0 w-8 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300" title="Drag up/down to scrub">
        ⇅
      </div>
    </div>
    <button x-number-input:increment class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed">
      +
    </button>
  </div>
  <p class="text-xs text-gray-500 dark:text-zinc-400">Click and drag the ⇅ icon to scrub the value</p>
</div>

</ComponentExample>

### Disabled State

<ComponentExample>

<div x-number-input="{ value: 42, min: 0, max: 100, disabled: true }" class="space-y-2">
  <label x-number-input:label class="block text-sm font-medium text-gray-400 dark:text-zinc-500">
    Disabled Input
  </label>
  <div class="flex gap-2">
    <button x-number-input:decrement class="px-4 py-2 bg-gray-200 dark:bg-zinc-700 text-gray-400 dark:text-zinc-500 rounded cursor-not-allowed">
      −
    </button>
    <input x-number-input:input class="w-24 px-3 py-2 text-center border border-gray-300 dark:border-zinc-600 rounded bg-gray-100 dark:bg-zinc-900 text-gray-400 dark:text-zinc-500 cursor-not-allowed" />
    <button x-number-input:increment class="px-4 py-2 bg-gray-200 dark:bg-zinc-700 text-gray-400 dark:text-zinc-500 rounded cursor-not-allowed">
      +
    </button>
  </div>
</div>

</ComponentExample>

### With x-model

Number input supports `x-model` for two-way binding.

<ComponentExample>

<div x-data="{ quantity: 5 }">
  <div x-number-input="{ min: 0, max: 10, step: 1 }" x-model="quantity" class="space-y-2">
    <label x-number-input:label class="block text-sm font-medium text-gray-700 dark:text-zinc-300">
      Quantity
    </label>
    <div class="flex gap-2">
      <button x-number-input:decrement class="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed">
        −
      </button>
      <input x-number-input:input class="w-24 px-3 py-2 text-center border border-gray-300 dark:border-zinc-600 rounded bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400" />
      <button x-number-input:increment class="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed">
        +
      </button>
    </div>
  </div>
  <p class="mt-2 text-sm text-gray-600 dark:text-zinc-400">Current value: <span x-text="quantity" class="font-bold"></span></p>
</div>

</ComponentExample>

### With Change Event

<ComponentExample>

<div x-data="{ lastValue: 5 }">
  <div x-number-input="{ value: 5, min: 0, max: 10, step: 1 }" x-on:change="lastValue = $event.detail.value" class="space-y-2">
    <label x-number-input:label class="block text-sm font-medium text-gray-700 dark:text-zinc-300">
      Adjust Value
    </label>
    <div class="flex gap-2">
      <button x-number-input:decrement class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed">
        −
      </button>
      <input x-number-input:input class="w-24 px-3 py-2 text-center border border-gray-300 dark:border-zinc-600 rounded bg-white dark:bg-zinc-800 text-gray-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400" />
      <button x-number-input:increment class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed">
        +
      </button>
    </div>
  </div>
  <p class="mt-2 text-sm text-gray-600 dark:text-zinc-400">Current value: <span x-text="lastValue" class="font-bold"></span></p>
</div>

</ComponentExample>

## Keyboard Shortcuts

The number input supports comprehensive keyboard navigation when focused:

| Key | Action |
|-----|--------|
| <kbd>↑</kbd> | Increment by step |
| <kbd>↓</kbd> | Decrement by step |
| <kbd>Page Up</kbd> | Increment by step × 10 |
| <kbd>Page Down</kbd> | Decrement by step × 10 |
| <kbd>Home</kbd> | Jump to minimum value |
| <kbd>End</kbd> | Jump to maximum value |
| <kbd>Mouse Wheel</kbd> | Increment/decrement (when `allowMouseWheel: true`) |

## API Reference

### Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Initial value |
| `min` | `number` | - | Minimum allowed value |
| `max` | `number` | - | Maximum allowed value |
| `step` | `number` | `1` | Increment/decrement step |
| `disabled` | `boolean` | `false` | Disable the input |
| `readonly` | `boolean` | `false` | Make input read-only |
| `allowMouseWheel` | `boolean` | `false` | Allow mouse wheel to change value |
| `clampValueOnBlur` | `boolean` | `true` | Clamp value to min/max on blur |
| `formatOptions` | `Intl.NumberFormatOptions` | - | Number formatting options |
| `translations` | `object` | - | Custom labels (`incrementLabel`, `decrementLabel`) |

```html
<div x-number-input="{
  value: 10,
  min: 0,
  max: 100,
  step: 5,
  allowMouseWheel: true,
  formatOptions: { style: 'currency', currency: 'USD' }
}">
  <!-- Parts -->
</div>

<!-- With x-model for two-way binding -->
<div x-data="{ quantity: 10 }">
  <div x-number-input="{ min: 0, max: 100 }" x-model="quantity">
    <!-- Parts -->
  </div>
</div>
```

**Two-way binding with `x-model`:**

The number input component is modelable, which means you can use Alpine's `x-model` directive to create a two-way binding with your data. When you use `x-model`, the `value` prop is optional as the model will control the value.

```html
<div x-data="{ count: 5 }">
  <div x-number-input="{ min: 0, max: 10 }" x-model="count">
    <!-- Parts -->
  </div>
  <p>Count: <span x-text="count"></span></p>
</div>
```

### Parts

| Part | Description |
|------|-------------|
| `x-number-input` | Root container element |
| `x-number-input:root` | Alternative root container |
| `x-number-input:label` | Label element for the input field |
| `x-number-input:input` | The actual input field |
| `x-number-input:increment` | Button to increment the value |
| `x-number-input:decrement` | Button to decrement the value |
| `x-number-input:scrubber` | Optional drag element to change value |

#### `x-number-input:root`

Container for the entire number input component.

**Automatically receives:**
- `data-disabled` - Present when disabled
- `data-readonly` - Present when read-only
- `data-focused` - Present when input is focused

```html
<div x-number-input:root>
  <!-- All parts -->
</div>
```

#### `x-number-input:label`

Label element for the input field.

**Automatically receives:**
- Proper `for` attribute linking to input

```html
<label x-number-input:label>Quantity</label>
```

#### `x-number-input:input`

The actual input field.

**Automatically receives:**
- `type="text"` with `inputmode="decimal"`
- `role="spinbutton"`
- ARIA attributes (`aria-valuemin`, `aria-valuemax`, `aria-valuenow`)
- Two-way binding to value
- All keyboard event handlers
- Mouse wheel handler (if enabled)
- Focus/blur handlers

```html
<input x-number-input:input class="..." />
```

#### `x-number-input:increment`

Button to increment the value.

**Automatically receives:**
- `type="button"`
- `tabindex="-1"` (prevents tab focus)
- ARIA label
- Disabled state when at max or component disabled
- `data-disabled` attribute when disabled
- Click handler to increment and refocus input

```html
<button x-number-input:increment>+</button>
```

#### `x-number-input:decrement`

Button to decrement the value.

**Automatically receives:**
- `type="button"`
- `tabindex="-1"` (prevents tab focus)
- ARIA label
- Disabled state when at min or component disabled
- `data-disabled` attribute when disabled
- Click handler to decrement and refocus input

```html
<button x-number-input:decrement>−</button>
```

#### `x-number-input:scrubber`

Optional element that allows dragging up/down to change the value.

**Automatically receives:**
- Pointer event handlers for drag functionality
- Cursor style (`ns-resize`)
- `touch-action: none` and `user-select: none`
- `data-disabled` when component is disabled or read-only

**Behavior:**
- Drag up: increases value
- Drag down: decreases value
- 10 pixels of drag = 1 step

```html
<div x-number-input:scrubber title="Drag to change value">
  ⇅
</div>
```

### Data Attributes

| Attribute | Description |
|-----------|-------------|
| `data-disabled` | Present when disabled on root, increment, decrement, scrubber |
| `data-readonly` | Present when read-only on root |
| `data-focused` | Present when input is focused on root |

```html
<div x-number-input:root class="data-disabled:opacity-50 data-readonly:cursor-not-allowed data-focused:ring-2">
  <!-- Parts -->
</div>
```

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `change` | `{ value: number }` | Fired when value changes |
| `focus` | - | Fired when input gains focus |
| `blur` | - | Fired when input loses focus |

```html
<div x-number-input
  x-on:change="console.log('Value:', $event.detail.value)"
  x-on:focus="console.log('Focused')"
  x-on:blur="console.log('Blurred')">
  <!-- Parts -->
</div>
```

### Accessing State

You can access the number input API using `$numberInput`:

```html
<div x-number-input="{ value: 10, min: 0, max: 100 }">
  <div x-data>
    <p x-show="$numberInput.isAtMin">At minimum!</p>
    <p x-show="$numberInput.isAtMax">At maximum!</p>
    <p x-text="'Current value: ' + $numberInput.value"></p>
  </div>

  <input x-number-input:input />
</div>
```

**Available properties:**
- `value` (number) - Current numeric value
- `inputValue` (string) - Formatted display value
- `focused` (boolean) - Whether input is focused
- `isAtMin` (boolean) - Whether value is at minimum
- `isAtMax` (boolean) - Whether value is at maximum
- `canIncrement` (boolean) - Whether increment is allowed
- `canDecrement` (boolean) - Whether decrement is allowed

**Available methods:**
- `setValue(newValue, dispatch?)` - Set value programmatically
- `increment(multiplier?)` - Increment by step × multiplier
- `decrement(multiplier?)` - Decrement by step × multiplier

## Accessibility

This component implements the [WAI-ARIA Spinbutton pattern](https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/).

### Features

- ✅ Proper `role="spinbutton"` on input
- ✅ ARIA attributes: `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
- ✅ ARIA labels on increment/decrement buttons
- ✅ Keyboard navigation with Arrow keys, Page Up/Down, Home/End
- ✅ Increment/decrement buttons have `tabindex="-1"` (keyboard users use arrow keys)
- ✅ Proper disabled and readonly states
- ✅ Input refocuses after button clicks

### Best Practices

- Always provide a label using `x-number-input:label`
- Ensure sufficient color contrast for all states
- Test keyboard navigation thoroughly
- Consider providing visual feedback for min/max boundaries
- For currency inputs, announce the currency in the label

### Example with Full Accessibility

```html
<div x-number-input="{
  value: 50,
  min: 0,
  max: 100,
  translations: {
    incrementLabel: 'Increase quantity',
    decrementLabel: 'Decrease quantity'
  }
}">
  <label x-number-input:label>
    Product Quantity
  </label>

  <div class="flex gap-2">
    <button
      x-number-input:decrement
      class="... data-disabled:cursor-not-allowed"
    >
      −
    </button>

    <input
      x-number-input:input
      class="..."
      aria-describedby="quantity-hint"
    />

    <button
      x-number-input:increment
      class="... data-disabled:cursor-not-allowed"
    >
      +
    </button>
  </div>

  <p id="quantity-hint" class="text-sm text-gray-500">
    Use arrow keys to adjust quantity
  </p>
</div>
```

## See Also

- [Carousel](/components/carousel) - Touch-enabled carousel component
- [Countdown](/components/countdown) - Countdown timer component
