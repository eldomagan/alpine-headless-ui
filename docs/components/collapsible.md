# Collapsible

A collapsible component that toggles between expanded and collapsed states with smooth animations.

## Features

- ✅ Smooth collapse/expand animations
- ✅ Accessible ARIA attributes
- ✅ Keyboard support
- ✅ Custom trigger and content elements
- ✅ Optional indicator for visual state
- ✅ Event dispatching on toggle

## Installation

```js
import Alpine from 'alpinejs'
import collapsible from 'alpine-headless-ui/collapsible'

Alpine.plugin(collapsible)
Alpine.start()
```

## Examples

### Basic Collapsible

<ComponentExample>

<div x-collapsible class="border border-gray-200 dark:border-zinc-800 rounded-lg overflow-hidden">
  <button x-collapsible:trigger class="w-full px-4 py-3 text-left font-medium bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800">
    Click to toggle
  </button>
  <div x-collapsible:content class="px-4 py-3 bg-gray-50 dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-800">
    <p class="text-gray-700 dark:text-zinc-300">This is the collapsible content that can be toggled.</p>
  </div>
</div>

</ComponentExample>

### With Indicator Icon

<ComponentExample>

<div x-collapsible class="border border-gray-200 dark:border-zinc-800 rounded-lg overflow-hidden">
  <button
    x-collapsible:trigger
    class="w-full px-4 py-3 text-left font-medium bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors flex items-center justify-between"
  >
    <span>Toggle with Icon</span>
    <svg
      x-collapsible:indicator
      class="w-5 h-5 transition-transform data-[state=open]:rotate-180"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  <div x-collapsible:content class="px-4 py-3 bg-gray-50 dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-800">
    <p class="text-gray-700 dark:text-zinc-300">Content with a chevron indicator that rotates when opened.</p>
  </div>
</div>

</ComponentExample>

### Initially Open

<ComponentExample>

<div x-collapsible="{ open: true }" class="border border-gray-200 dark:border-zinc-800 rounded-lg overflow-hidden">
  <button
    x-collapsible:trigger
    class="w-full px-4 py-3 text-left font-medium bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
  >
    Toggle Content (Initially Open)
  </button>
  <div x-collapsible:content class="px-4 py-3 bg-gray-50 dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-800">
    <p class="text-gray-700 dark:text-zinc-300">This content starts expanded.</p>
  </div>
</div>

</ComponentExample>

### Disabled State

<ComponentExample>

<div x-collapsible="{ disabled: true }" class="border border-gray-200 dark:border-zinc-800 rounded-lg overflow-hidden opacity-60">
  <button
    x-collapsible:trigger
    class="w-full px-4 py-3 text-left font-medium bg-white dark:bg-zinc-900 cursor-not-allowed"
  >
    Disabled Collapsible
  </button>
  <div x-collapsible:content class="px-4 py-3 bg-gray-50 dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-800">
    <p class="text-gray-700 dark:text-zinc-300">This content cannot be toggled.</p>
  </div>
</div>

</ComponentExample>

## API Reference

### Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Initial open state |
| `disabled` | `boolean` | `false` | Disable interactions |

```html
<div x-collapsible="{ open: false, disabled: false }">
  <!-- ... -->
</div>
```

### Parts

| Part | Description |
|------|-------------|
| `x-collapsible` | Root container element |
| `x-collapsible:trigger` | Button that toggles the collapsible |
| `x-collapsible:content` | Content that is collapsed/expanded |
| `x-collapsible:indicator` | Optional element for visual indicators (like icons) |

#### `x-collapsible:trigger`

The button or element that triggers the collapse/expand action.

**Automatically receives:**
- `type="button"`
- `aria-expanded` attribute
- `aria-controls` linking to content
- `data-state` attribute (`"open"` or `"closed"`)
- `data-disabled` attribute (when disabled)
- Click handler for toggling

```html
<button x-collapsible:trigger>Toggle</button>
```

#### `x-collapsible:content`

The content that is collapsed/expanded.

**Automatically receives:**
- `x-collapse` directive for smooth animations
- `x-show` tied to open state
- `data-state` attribute (`"open"` or `"closed"`)
- `data-disabled` attribute (when disabled)
- `id` for ARIA association

```html
<div x-collapsible:content>
  Content here
</div>
```

#### `x-collapsible:indicator`

Optional element for visual indicators (like icons).

**Automatically receives:**
- `data-state` attribute (`"open"` or `"closed"`)
- `data-disabled` attribute (when disabled)

```html
<span x-collapsible:indicator>▼</span>
```

### Data Attributes

| Attribute | Description |
|-----------|-------------|
| `data-state` | Current state (`open` or `closed`) on trigger, content, and indicator |
| `data-disabled` | Present when disabled on trigger, content, and indicator |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `change` | `{ open: boolean }` | Fired when the collapsible state changes |

```html
<div x-collapsible x-on:change="console.log('Open:', $event.detail.open)">
  <!-- ... -->
</div>
```

### Accessing State

You can access the collapsible API using `$collapsible`:

```html
<div x-collapsible>
  <button x-collapsible:trigger>
    <span x-text="$collapsible.open ? 'Collapse' : 'Expand'"></span>
  </button>
  <div x-collapsible:content>Content</div>
</div>
```

**Available properties:**
- `open` - Current open state
- `disabled` - Current disabled state
- `visible` - Whether content is visible
- `setOpen(value)` - Programmatically set open state
- `toggle()` - Toggle open state

## Accessibility

### ARIA Attributes

The collapsible automatically includes:

- `type="button"` on the trigger
- `aria-expanded` on the trigger (true/false)
- `aria-controls` linking trigger to content
- Proper `id` attributes for associations

### Keyboard Support

| Key | Action |
|-----|--------|
| `Enter` | Toggle open/closed state |
| `Space` | Toggle open/closed state |

## See Also

- [Accordion](/components/accordion) - Multiple collapsibles with coordinated behavior
- [Tabs](/components/tabs) - Alternative pattern for showing/hiding content
