# Rating

A fully accessible rating component with keyboard navigation, half-star support, and customizable appearance.

## Features

- ✅ Keyboard navigation (Arrow keys, Home/End)
- ✅ Half-star ratings (optional)
- ✅ Hover preview
- ✅ Disabled and read-only states
- ✅ Form integration with hidden input
- ✅ WAI-ARIA radiogroup pattern
- ✅ x-model support for two-way binding
- ✅ Customizable number of stars

## Installation

```js
import Alpine from 'alpinejs'
import rating from 'alpine-headless-ui/rating'

Alpine.plugin(rating)
Alpine.start()
```

## Examples

### Basic Rating

A simple 5-star rating component.

<ComponentExample>

<div x-rating="{ value: 3, count: 5 }" class="space-y-2">
  <label x-rating:label class="block text-sm font-medium text-gray-700 dark:text-zinc-300">
    Rate this product
  </label>
  <div x-rating:control class="flex gap-1">
    <button x-rating:item="1" type="button" class="text-3xl transition-colors text-gray-300  data-highlighted:text-yellow-400 data-checked:text-yellow-400 hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded">★
      </button>
    <button x-rating:item="2" type="button" class="text-3xl transition-colors text-gray-300 data-highlighted:text-yellow-400 data-checked:text-yellow-400 hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded">★
      </button>
    <button x-rating:item="3" type="button" class="text-3xl transition-colors text-gray-300 data-highlighted:text-yellow-400 data-checked:text-yellow-400 hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded">★
      </button>
    <button x-rating:item="4" type="button" class="text-3xl transition-colors text-gray-300 data-highlighted:text-yellow-400 data-checked:text-yellow-400 hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded">★
      </button>
    <button x-rating:item="5" type="button" class="text-3xl transition-colors text-gray-300 data-highlighted:text-yellow-400 data-checked:text-yellow-400 hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded">★
      </button>
  </div>
  <input x-rating:hidden-input />
</div>

</ComponentExample>

### Half-Star Ratings

Enable half-star precision with `allowHalf: true`.

<ComponentExample>

<div x-rating="{ value: 3.5, count: 5, allowHalf: true }" class="space-y-2">
  <label x-rating:label class="block text-sm font-medium text-gray-700 dark:text-zinc-300">
    Your rating
  </label>
  <div x-rating:control class="flex gap-1">
    <button x-rating:item="1" type="button" class="text-3xl transition-colors text-gray-300 data-highlighted:text-orange-400 data-half:text-orange-300 hover:text-orange-300 focus:outline-none focus:ring-2 rounded">★
      </button>
    <button x-rating:item="2" type="button" class="text-3xl transition-colors text-gray-300 data-highlighted:text-orange-400 data-half:text-orange-300 hover:text-orange-300 focus:outline-none focus:ring-2 rounded">★
      </button>
    <button x-rating:item="3" type="button" class="text-3xl transition-colors text-gray-300 data-highlighted:text-orange-400 data-half:text-orange-300 hover:text-orange-300 focus:outline-none focus:ring-2 rounded">★
      </button>
    <button x-rating:item="4" type="button" class="text-3xl transition-colors text-gray-300 data-highlighted:text-orange-400 data-half:text-orange-300 hover:text-orange-300 focus:outline-none focus:ring-2 rounded">★
      </button>
    <button x-rating:item="5" type="button" class="text-3xl transition-colors text-gray-300 data-highlighted:text-orange-400 data-half:text-orange-300 hover:text-orange-300 focus:outline-none focus:ring-2 rounded">★
      </button>
  </div>
  <input x-rating:hidden-input />
</div>

</ComponentExample>

### Read-Only Display

Show ratings without allowing interaction.

<ComponentExample>

<div x-rating="{ value: 4, count: 5, readOnly: true }" class="space-y-2">
  <div class="text-sm font-medium text-gray-700 dark:text-zinc-300">
    Average rating: 4.0
  </div>
  <div x-rating:control class="flex gap-1">
    <span x-rating:item="1" class="text-2xl text-gray-300 data-highlighted:text-yellow-400">★
      </span>
    <span x-rating:item="2" class="text-2xl text-gray-300 data-highlighted:text-yellow-400">★
      </span>
    <span x-rating:item="3" class="text-2xl text-gray-300 data-highlighted:text-yellow-400">★
      </span>
    <span x-rating:item="4" class="text-2xl text-gray-300 data-highlighted:text-yellow-400">★
      </span>
    <span x-rating:item="5" class="text-2xl text-gray-300 data-highlighted:text-yellow-400">★
      </span>
  </div>
</div>

</ComponentExample>

### With x-model

Use x-model for two-way binding.

<ComponentExample>

<div x-data="{ userRating: 0 }">
  <div x-rating="{ count: 5 }" x-model="userRating" class="space-y-2">
    <label x-rating:label class="block text-sm font-medium text-gray-700 dark:text-zinc-300">
      Rate your experience
    </label>
    <div x-rating:control class="flex gap-1">
      <button x-rating:item="1" type="button" class="text-3xl transition-colors text-gray-300 data-highlighted:text-blue-500 data-checked:text-blue-500 hover:text-blue-400 focus:outline-none focus:ring-2 rounded">★
        </button>
    <button x-rating:item="2" type="button" class="text-3xl transition-colors text-gray-300 data-highlighted:text-blue-500 data-checked:text-blue-500 hover:text-blue-400 focus:outline-none focus:ring-2 rounded">★
        </button>
    <button x-rating:item="3" type="button" class="text-3xl transition-colors text-gray-300 data-highlighted:text-blue-500 data-checked:text-blue-500 hover:text-blue-400 focus:outline-none focus:ring-2 rounded">★
        </button>
    <button x-rating:item="4" type="button" class="text-3xl transition-colors text-gray-300 data-highlighted:text-blue-500 data-checked:text-blue-500 hover:text-blue-400 focus:outline-none focus:ring-2 rounded">★
        </button>
    <button x-rating:item="5" type="button" class="text-3xl transition-colors text-gray-300 data-highlighted:text-blue-500 data-checked:text-blue-500 hover:text-blue-400 focus:outline-none focus:ring-2 rounded">★
        </button>
    </div>
    <input x-rating:hidden-input />
  </div>
  <p class="mt-2 text-sm text-gray-600 dark:text-zinc-400">
    Your rating: <span x-text="userRating || 'Not rated'" class="font-bold"></span>
  </p>
</div>

</ComponentExample>

### Different Star Counts

Customize the number of rating items.

<ComponentExample>

<div class="space-y-4">
  <div x-rating="{ value: 2, count: 3 }" class="space-y-2">
    <label x-rating:label class="block text-sm font-medium text-gray-700 dark:text-zinc-300">
      Difficulty (3 levels)
    </label>
    <div x-rating:control class="flex gap-1">
      <button x-rating:item="1" type="button" class="text-3xl transition-colors text-gray-300 data-highlighted:text-red-500 hover:text-red-400 focus:outline-none focus:ring-2 rounded">🔥
        </button>
          <button x-rating:item="2" type="button" class="text-3xl transition-colors text-gray-300 data-highlighted:text-red-500 hover:text-red-400 focus:outline-none focus:ring-2 rounded">🔥
        </button>
          <button x-rating:item="3" type="button" class="text-3xl transition-colors text-gray-300 data-highlighted:text-red-500 hover:text-red-400 focus:outline-none focus:ring-2 rounded">🔥
        </button>
    </div>
    <input x-rating:hidden-input />
  </div>

  <div x-rating="{ value: 7, count: 10 }" class="space-y-2">
    <label x-rating:label class="block text-sm font-medium text-gray-700 dark:text-zinc-300">
      Detailed rating (10 scale)
    </label>
    <div x-rating:control class="flex gap-1">
      <button x-rating:item="1" type="button" class="text-2xl transition-colors text-gray-300 data-highlighted:text-purple-500 hover:text-purple-400 focus:outline-none focus:ring-2 rounded">★
        </button>
          <button x-rating:item="2" type="button" class="text-2xl transition-colors text-gray-300 data-highlighted:text-purple-500 hover:text-purple-400 focus:outline-none focus:ring-2 rounded">★
        </button>
          <button x-rating:item="3" type="button" class="text-2xl transition-colors text-gray-300 data-highlighted:text-purple-500 hover:text-purple-400 focus:outline-none focus:ring-2 rounded">★
        </button>
          <button x-rating:item="4" type="button" class="text-2xl transition-colors text-gray-300 data-highlighted:text-purple-500 hover:text-purple-400 focus:outline-none focus:ring-2 rounded">★
        </button>
          <button x-rating:item="5" type="button" class="text-2xl transition-colors text-gray-300 data-highlighted:text-purple-500 hover:text-purple-400 focus:outline-none focus:ring-2 rounded">★
        </button>
          <button x-rating:item="6" type="button" class="text-2xl transition-colors text-gray-300 data-highlighted:text-purple-500 hover:text-purple-400 focus:outline-none focus:ring-2 rounded">★
        </button>
          <button x-rating:item="7" type="button" class="text-2xl transition-colors text-gray-300 data-highlighted:text-purple-500 hover:text-purple-400 focus:outline-none focus:ring-2 rounded">★
        </button>
          <button x-rating:item="8" type="button" class="text-2xl transition-colors text-gray-300 data-highlighted:text-purple-500 hover:text-purple-400 focus:outline-none focus:ring-2 rounded">★
        </button>
          <button x-rating:item="9" type="button" class="text-2xl transition-colors text-gray-300 data-highlighted:text-purple-500 hover:text-purple-400 focus:outline-none focus:ring-2 rounded">★
        </button>
          <button x-rating:item="10" type="button" class="text-2xl transition-colors text-gray-300 data-highlighted:text-purple-500 hover:text-purple-400 focus:outline-none focus:ring-2 rounded">★
        </button>
    </div>
    <input x-rating:hidden-input />
  </div>
</div>

</ComponentExample>

### Disabled State

<ComponentExample>

<div x-rating="{ value: 3, count: 5, disabled: true }" class="space-y-2">
  <label x-rating:label class="block text-sm font-medium text-gray-400 dark:text-zinc-500">
    Rating (disabled)
  </label>
  <div x-rating:control class="flex gap-1 opacity-50 cursor-not-allowed">
    <span x-rating:item="1" class="text-3xl text-gray-300 data-highlighted:text-yellow-400">★
      </span>
    <span x-rating:item="2" class="text-3xl text-gray-300 data-highlighted:text-yellow-400">★
      </span>
    <span x-rating:item="3" class="text-3xl text-gray-300 data-highlighted:text-yellow-400">★
      </span>
    <span x-rating:item="4" class="text-3xl text-gray-300 data-highlighted:text-yellow-400">★
      </span>
    <span x-rating:item="5" class="text-3xl text-gray-300 data-highlighted:text-yellow-400">★
      </span>
  </div>
  <input x-rating:hidden-input />
</div>

</ComponentExample>

### With Change Event

<ComponentExample>

<div x-data="{ selectedRating: 0 }">
  <div x-rating="{ value: 0, count: 5 }" x-on:change="selectedRating = $event.detail.value" class="space-y-2">
    <label x-rating:label class="block text-sm font-medium text-gray-700 dark:text-zinc-300">
      Rate this item
    </label>
    <div x-rating:control class="flex gap-1">
      <button x-rating:item="1" type="button" class="text-3xl transition-colors text-gray-300 data-highlighted:text-green-500 hover:text-green-400 focus:outline-none focus:ring-2 rounded">★
        </button>
    <button x-rating:item="2" type="button" class="text-3xl transition-colors text-gray-300 data-highlighted:text-green-500 hover:text-green-400 focus:outline-none focus:ring-2 rounded">★
        </button>
    <button x-rating:item="3" type="button" class="text-3xl transition-colors text-gray-300 data-highlighted:text-green-500 hover:text-green-400 focus:outline-none focus:ring-2 rounded">★
        </button>
    <button x-rating:item="4" type="button" class="text-3xl transition-colors text-gray-300 data-highlighted:text-green-500 hover:text-green-400 focus:outline-none focus:ring-2 rounded">★
        </button>
    <button x-rating:item="5" type="button" class="text-3xl transition-colors text-gray-300 data-highlighted:text-green-500 hover:text-green-400 focus:outline-none focus:ring-2 rounded">★
        </button>
    </div>
    <input x-rating:hidden-input />
  </div>
  <p class="mt-2 text-sm text-gray-600 dark:text-zinc-400">
    Selected: <span x-text="selectedRating || 'None'" class="font-bold"></span>
  </p>
</div>

</ComponentExample>

## Keyboard Shortcuts

The rating component supports keyboard navigation:

| Key | Action |
|-----|--------|
| <kbd>→</kbd> / <kbd>↑</kbd> | Increase rating by one step |
| <kbd>←</kbd> / <kbd>↓</kbd> | Decrease rating by one step |
| <kbd>Home</kbd> | Set rating to 0 |
| <kbd>End</kbd> | Set rating to maximum |
| <kbd>Tab</kbd> | Move focus to/from rating |

## API Reference

### Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Initial rating value |
| `count` | `number` | `5` | Total number of rating items |
| `allowHalf` | `boolean` | `false` | Enable half-star ratings |
| `disabled` | `boolean` | `false` | Disable interaction |
| `readOnly` | `boolean` | `false` | Make rating read-only |
| `required` | `boolean` | `false` | Make rating required (for forms) |
| `name` | `string` | - | Name for hidden input (form integration) |
| `translations` | `object` | - | Custom ARIA labels (`itemLabel` function) |

```html
<div x-rating="{
  value: 3,
  count: 5,
  allowHalf: true,
  name: 'product-rating'
}">
  <!-- Parts -->
</div>

<!-- With x-model for two-way binding -->
<div x-data="{ rating: 0 }">
  <div x-rating="{ count: 5 }" x-model="rating">
    <!-- Parts -->
  </div>
</div>
```

**Two-way binding with `x-model`:**

The rating component is modelable, which means you can use Alpine's `x-model` directive for two-way binding.

```html
<div x-data="{ userRating: 4 }">
  <div x-rating="{ count: 5 }" x-model="userRating">
    <!-- Parts -->
  </div>
  <p>Rating: <span x-text="userRating"></span></p>
</div>
```

### Parts

| Part | Description |
|------|-------------|
| `x-rating` | Root container element |
| `x-rating:root` | Alternative root container |
| `x-rating:label` | Label element for the rating |
| `x-rating:control` | Container for the rating items |
| `x-rating:item` | Individual rating item (star, icon, etc.) |
| `x-rating:hidden-input` | Hidden input for form integration |

#### `x-rating:root`

Container for the entire rating component.

**Automatically receives:**
- `data-disabled` - Present when disabled
- `data-readonly` - Present when read-only

```html
<div x-rating:root>
  <!-- All parts -->
</div>
```

#### `x-rating:label`

Label element for the rating.

**Automatically receives:**
- Proper `id` attribute for accessibility

```html
<label x-rating:label>Rate this product</label>
```

#### `x-rating:control`

Container for the rating items.

**Automatically receives:**
- `role="radiogroup"`
- `aria-label="Rating"`
- ARIA attributes for disabled/readonly/required states
- Keyboard event handlers

```html
<div x-rating:control class="flex gap-1">
  <!-- Rating items -->
</div>
```

#### `x-rating:item`

Individual rating item (star, icon, etc.).

**Requires:**
- A value indicating the item's position (1-indexed)

**Automatically receives:**
- `role="radio"`
- `aria-label` - Descriptive label
- `aria-checked` - Whether this item is selected
- `data-checked` - Present when this item is part of the rating
- `data-highlighted` - Present when highlighted (selected or hovered)
- `data-half` - Present when showing half-star (if `allowHalf: true`)
- `tabindex` - Manages keyboard focus
- Click and hover handlers

```html
<button x-rating:item="1" type="button">★</button>
<button x-rating:item="2" type="button">★</button>
<button x-rating:item="3" type="button">★</button>
<button x-rating:item="4" type="button">★</button>
<button x-rating:item="5" type="button">★</button>
```

#### `x-rating:hidden-input`

Hidden input for form integration.

**Automatically receives:**
- `type="text"`
- `hidden` attribute
- `name` attribute (if configured)
- Bound value
- `disabled` and `required` attributes

```html
<input x-rating:hidden-input />
```

### Data Attributes

| Attribute | Description |
|-----------|-------------|
| `data-disabled` | Present when disabled on root |
| `data-readonly` | Present when read-only on root |
| `data-checked` | Present when item is part of the current rating on item |
| `data-highlighted` | Present when item is highlighted (hovered or selected) on item |
| `data-half` | Present when item shows half-star (when `allowHalf: true`) on item |

```html
<div x-rating:root class="data-disabled:opacity-50 data-readonly:cursor-default">
  <button x-rating:item="3" class="data-checked:text-yellow-500 data-highlighted:text-yellow-400 data-half:opacity-50">
    ★
  </button>
</div>
```

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `change` | `{ value: number }` | Fired when rating value changes |

```html
<div x-rating x-on:change="console.log('Rating:', $event.detail.value)">
  <!-- Parts -->
</div>
```

### Accessing State

You can access the rating API using `$rating`:

```html
<div x-rating="{ value: 3, count: 5 }">
  <div x-data>
    <p x-text="'Current rating: ' + $rating.value"></p>
    <p x-show="$rating.isHovering">Hovering!</p>
  </div>

  <div x-rating:control>
    <!-- Items -->
  </div>
</div>
```

**Available properties:**
- `value` (number) - Current rating value
- `hoveredValue` (number) - Currently hovered value (-1 if not hovering)
- `focusedValue` (number) - Currently focused item index (-1 if not focused)
- `isHovering` (boolean) - Whether user is hovering over items
- `displayValue` (number) - The value being displayed (hovered or actual)

**Available methods:**
- `setValue(newValue, dispatch?)` - Set rating value programmatically

## Accessibility

This component implements the [WAI-ARIA radiogroup pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/).

### Features

- ✅ Proper `role="radiogroup"` on control
- ✅ Proper `role="radio"` on items
- ✅ ARIA labels for screen readers
- ✅ `aria-checked` for current selection
- ✅ Keyboard navigation with arrow keys
- ✅ Roving tabindex for keyboard focus management
- ✅ Proper disabled and readonly states

### Best Practices

- Always provide a label using `x-rating:label`
- Ensure sufficient color contrast for all states
- Test keyboard navigation thoroughly
- Use the hidden input for form submissions
- Provide clear visual feedback for hover and focus states

### Example with Full Accessibility

```html
<div x-rating="{
  value: 0,
  count: 5,
  required: true,
  name: 'product-rating'
}">
  <label x-rating:label>
    How would you rate this product? (Required)
  </label>

  <div x-rating:control class="flex gap-1">
    <button x-rating:item="1" type="button" class="text-3xl transition-colors data-highlighted:text-yellow-500 hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded">★
      </button>
    <button x-rating:item="2" type="button" class="text-3xl transition-colors data-highlighted:text-yellow-500 hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded">★
      </button>
    <button x-rating:item="3" type="button" class="text-3xl transition-colors data-highlighted:text-yellow-500 hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded">★
      </button>
    <button x-rating:item="4" type="button" class="text-3xl transition-colors data-highlighted:text-yellow-500 hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded">★
      </button>
    <button x-rating:item="5" type="button" class="text-3xl transition-colors data-highlighted:text-yellow-500 hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded">★
      </button>
  </div>

  <input x-rating:hidden-input />
</div>
```

## See Also

- [Number Input](/components/number-input) - Number input with increment/decrement
- [Carousel](/components/carousel) - Touch-enabled carousel
