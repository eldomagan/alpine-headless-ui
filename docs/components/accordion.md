# Accordion

A vertically stacked set of collapsible sections that allows users to expand and collapse content panels.

## Features

- ✅ Smooth collapse/expand animations
- ✅ Accessible ARIA attributes and roles
- ✅ Full keyboard navigation (Arrow keys, Home, End)
- ✅ Single or multiple items expanded

## Installation

```js
import Alpine from 'alpinejs'
import accordion from 'alpine-headless-ui/accordion'

Alpine.plugin(accordion)
Alpine.start()
```

## Examples

### Basic Accordion

<ComponentExample>

<div x-accordion class="space-y-2">
  <div x-accordion:item="'item-1'" class="border border-gray-200 dark:border-zinc-800 rounded-lg overflow-hidden">
    <button x-accordion:item-trigger class="w-full px-4 py-3 text-left font-medium bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800">
      What is Alpine Headless UI?
    </button>
    <div x-accordion:item-content class="px-4 py-3 bg-gray-50 dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-800">
      <p class="text-gray-700 dark:text-zinc-300">Alpine Headless UI provides unstyled, accessible UI primitives for Alpine.js applications.</p>
    </div>
  </div>

  <div x-accordion:item="'item-2'" class="border border-gray-200 dark:border-zinc-800 rounded-lg overflow-hidden">
    <button x-accordion:item-trigger class="w-full px-4 py-3 text-left font-medium bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800">
      How does it work?
    </button>
    <div x-accordion:item-content class="px-4 py-3 bg-gray-50 dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-800">
      <p class="text-gray-700 dark:text-zinc-300">It provides behavior and accessibility while you control the styling and markup structure.</p>
    </div>
  </div>

  <div x-accordion:item="'item-3'" class="border border-gray-200 dark:border-zinc-800 rounded-lg overflow-hidden">
    <button x-accordion:item-trigger class="w-full px-4 py-3 text-left font-medium bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800">
      Is it free?
    </button>
    <div x-accordion:item-content class="px-4 py-3 bg-gray-50 dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-800">
      <p class="text-gray-700 dark:text-zinc-300">Yes, it's open source and free to use under the MIT license.</p>
    </div>
  </div>
</div>

</ComponentExample>

### With Icon Indicator

<ComponentExample>

<div x-accordion class="space-y-2">
  <div x-accordion:item="'faq-1'" class="border border-gray-200 dark:border-zinc-800 rounded-lg overflow-hidden">
    <button x-accordion:item-trigger class="w-full px-4 py-3 text-left font-medium bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 flex items-center justify-between">
      <span>Can I customize the styling?</span>
      <svg x-accordion:item-indicator class="w-5 h-5 transition-transform data-[state=open]:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <div x-accordion:item-content class="px-4 py-3 bg-gray-50 dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-800">
      <p class="text-gray-700 dark:text-zinc-300">Absolutely! The components are completely unstyled, so you have full control over the appearance.</p>
    </div>
  </div>

  <div x-accordion:item="'faq-2'" class="border border-gray-200 dark:border-zinc-800 rounded-lg overflow-hidden">
    <button x-accordion:item-trigger class="w-full px-4 py-3 text-left font-medium bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 flex items-center justify-between">
      <span>Does it work with Tailwind?</span>
      <svg x-accordion:item-indicator class="w-5 h-5 transition-transform data-[state=open]:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <div x-accordion:item-content class="px-4 py-3 bg-gray-50 dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-800">
      <p class="text-gray-700 dark:text-zinc-300">Yes, it works perfectly with Tailwind CSS, plain CSS, or any styling solution.</p>
    </div>
  </div>
</div>

</ComponentExample>

### Multiple Items Open

<ComponentExample>

<div x-accordion="{ multiple: true, value: ['multi-1', 'multi-2'] }" class="space-y-2">
  <div x-accordion:item="'multi-1'" class="border border-gray-200 dark:border-zinc-800 rounded-lg overflow-hidden">
    <button x-accordion:item-trigger class="w-full px-4 py-3 text-left font-medium bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800">
      First Section
    </button>
    <div x-accordion:item-content class="px-4 py-3 bg-gray-50 dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-800">
      <p class="text-gray-700 dark:text-zinc-300">This accordion allows multiple items to be open at the same time.</p>
    </div>
  </div>

  <div x-accordion:item="'multi-2'" class="border border-gray-200 dark:border-zinc-800 rounded-lg overflow-hidden">
    <button x-accordion:item-trigger class="w-full px-4 py-3 text-left font-medium bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800">
      Second Section
    </button>
    <div x-accordion:item-content class="px-4 py-3 bg-gray-50 dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-800">
      <p class="text-gray-700 dark:text-zinc-300">Both sections can be expanded simultaneously.</p>
    </div>
  </div>

  <div x-accordion:item="'multi-3'" class="border border-gray-200 dark:border-zinc-800 rounded-lg overflow-hidden">
    <button x-accordion:item-trigger class="w-full px-4 py-3 text-left font-medium bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800">
      Third Section
    </button>
    <div x-accordion:item-content class="px-4 py-3 bg-gray-50 dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-800">
      <p class="text-gray-700 dark:text-zinc-300">Try expanding all three!</p>
    </div>
  </div>
</div>

</ComponentExample>

### Non-Collapsible

<ComponentExample>

<div x-accordion="{ collapsible: false, value: ['default-1'] }" class="space-y-2">
  <div x-accordion:item="'default-1'" class="border border-gray-200 dark:border-zinc-800 rounded-lg overflow-hidden">
    <button x-accordion:item-trigger class="w-full px-4 py-3 text-left font-medium bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800">
      Always One Open
    </button>
    <div x-accordion:item-content class="px-4 py-3 bg-gray-50 dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-800">
      <p class="text-gray-700 dark:text-zinc-300">When collapsible is false, at least one item must always be open.</p>
    </div>
  </div>

  <div x-accordion:item="'default-2'" class="border border-gray-200 dark:border-zinc-800 rounded-lg overflow-hidden">
    <button x-accordion:item-trigger class="w-full px-4 py-3 text-left font-medium bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800">
      Try Closing the First
    </button>
    <div x-accordion:item-content class="px-4 py-3 bg-gray-50 dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-800">
      <p class="text-gray-700 dark:text-zinc-300">You can't collapse all items when collapsible is false.</p>
    </div>
  </div>
</div>

</ComponentExample>

## API Reference

### Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string[]` | `[]` | Array of open item IDs |
| `multiple` | `boolean` | `false` | Allow multiple items to be open |
| `collapsible` | `boolean` | `true` | Allow all items to be closed |
| `disabled` | `boolean` | `false` | Disable all accordion items |

### Parts

| Part | Description |
|------|-------------|
| `x-accordion:item="id"` | Accordion item container with unique ID |
| `x-accordion:item-trigger` | Button that toggles the item |
| `x-accordion:item-content` | Content that is shown/hidden |
| `x-accordion:item-indicator` | Optional visual indicator element |

### Data Attributes

| Attribute | Description |
|-----------|-------------|
| `data-scope` | Always set to `accordion` |
| `data-part` | Identifies the part (`root`, `item`, `item-trigger`, `item-content`, `item-indicator`) |
| `data-state` | Current state (`open` or `closed`) |
| `data-disabled` | Present when disabled |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `change` | `{ value: string[] }` | Fired when the open items change |
| `focus-change` | `{ value: string \| null }` | Fired when the focused item changes |

## Keyboard Interactions

| Key | Action |
|-----|--------|
| `ArrowDown` | Move focus to next item trigger |
| `ArrowUp` | Move focus to previous item trigger |
| `Home` | Move focus to first item trigger |
| `End` | Move focus to last item trigger |

## Accessing State

You can access the accordion API using `$accordion`:

```html
<div x-accordion>
  <div x-data>
    <p x-text="'Open items: ' + $accordion.value.length"></p>
  </div>

  <div x-accordion:item="'item-1'">
    <!-- Item content -->
  </div>
</div>
```

**Available properties:**
- `value` - Array of open item IDs
- `multiple` - Whether multiple items can be open
- `collapsible` - Whether all items can be closed
- `disabled` - Whether accordion is disabled
- `focusedValue` - ID of currently focused item
- `isOpen(id)` - Check if item is open
- `toggle(id)` - Toggle an item
- `setValue(value)` - Set open items programmatically

## Accessibility

### ARIA Attributes

The accordion automatically includes:

- `type="button"` on triggers
- `aria-expanded` on triggers (true/false)
- `role="region"` on content panels
- Proper data attributes for state

### Keyboard Support

| Key | Action |
|-----|--------|
| `Space` / `Enter` | Toggle focused accordion item |
| `ArrowDown` | Move focus to next trigger |
| `ArrowUp` | Move focus to previous trigger |
| `Home` | Move focus to first trigger |
| `End` | Move focus to last trigger |

## See Also

- [Collapsible](/components/collapsible) - Single collapsible section
- [Tabs](/components/tabs) - Alternative pattern for showing/hiding content
