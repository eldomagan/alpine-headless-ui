# Navigation Menu

A horizontal or vertical navigation bar with dropdown content panels that appear on hover or click.

## Features

- ✅ Hover intent with configurable open/close delays
- ✅ Smart positioning with auto-flip and shift
- ✅ Optional arrow pointing to trigger
- ✅ Keyboard navigation between triggers and links
- ✅ Only one content panel visible at a time
- ✅ Touch device support (click instead of hover)
- ✅ Roving tabindex for accessible trigger navigation
- ✅ Full WAI-ARIA menubar pattern
- ✅ Directional data attributes for CSS animations

## Basic Usage

<ComponentExample>

<nav x-navigation-menu class="relative">
  <ul x-navigation-menu:list class="flex items-center gap-1">
    <li x-navigation-menu:item="'products'">
      <button x-navigation-menu:trigger class="px-4 py-2 text-gray-700 dark:text-zinc-300 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-zinc-800">
        Products
      </button>
    </li>
    <li x-navigation-menu:item="'resources'">
      <button x-navigation-menu:trigger class="px-4 py-2 text-gray-700 dark:text-zinc-300 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-zinc-800">
        Resources
      </button>
    </li>
    <li x-navigation-menu:item="'pricing'">
      <a x-navigation-menu:link href="#" class="px-4 py-2 text-gray-700 dark:text-zinc-300 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 inline-block">
        Pricing
      </a>
    </li>
  </ul>

  <div x-navigation-menu:positioner class="z-50">
    <div x-navigation-menu:viewport>
      <div x-navigation-menu:content="'products'" class="bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-gray-200 dark:border-zinc-700 p-4 min-w-55">
        <a x-navigation-menu:link href="#" class="block px-3 py-2 text-sm text-gray-700 dark:text-zinc-300 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800">Widgets</a>
        <a x-navigation-menu:link href="#" class="block px-3 py-2 text-sm text-gray-700 dark:text-zinc-300 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800">Gadgets</a>
        <a x-navigation-menu:link href="#" class="block px-3 py-2 text-sm text-gray-700 dark:text-zinc-300 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800">Tools</a>
      </div>
      <div x-navigation-menu:content="'resources'" class="bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-gray-200 dark:border-zinc-700 p-4 min-w-55">
        <a x-navigation-menu:link href="#" class="block px-3 py-2 text-sm text-gray-700 dark:text-zinc-300 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800">Documentation</a>
        <a x-navigation-menu:link href="#" class="block px-3 py-2 text-sm text-gray-700 dark:text-zinc-300 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800">Blog</a>
      </div>
    </div>
  </div>
</nav>

</ComponentExample>

## With Arrow

Add an arrow that points to the trigger element, just like popovers.

<ComponentExample>

<nav x-navigation-menu class="relative">
  <ul x-navigation-menu:list class="flex items-center gap-1">
    <li x-navigation-menu:item="'features'">
      <button x-navigation-menu:trigger class="px-4 py-2 text-gray-700 dark:text-zinc-300 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-zinc-800">
        Features
      </button>
    </li>
    <li x-navigation-menu:item="'solutions'">
      <button x-navigation-menu:trigger class="px-4 py-2 text-gray-700 dark:text-zinc-300 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-zinc-800">
        Solutions
      </button>
    </li>
  </ul>

  <div x-navigation-menu:positioner class="z-50">
    <div x-navigation-menu:arrow class="absolute w-2 h-2">
      <div class="w-full h-full bg-white dark:bg-zinc-900 border-t border-l border-gray-200 dark:border-zinc-700 rotate-45"></div>
    </div>
    <div x-navigation-menu:viewport>
      <div x-navigation-menu:content="'features'" class="bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-gray-200 dark:border-zinc-700 p-4 min-w-55">
        <a x-navigation-menu:link href="#" class="block px-3 py-2 text-sm text-gray-700 dark:text-zinc-300 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800">Analytics</a>
        <a x-navigation-menu:link href="#" class="block px-3 py-2 text-sm text-gray-700 dark:text-zinc-300 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800">Integrations</a>
        <a x-navigation-menu:link href="#" class="block px-3 py-2 text-sm text-gray-700 dark:text-zinc-300 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800">Automations</a>
      </div>
      <div x-navigation-menu:content="'solutions'" class="bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-gray-200 dark:border-zinc-700 p-4 min-w-55">
        <a x-navigation-menu:link href="#" class="block px-3 py-2 text-sm text-gray-700 dark:text-zinc-300 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800">For Startups</a>
        <a x-navigation-menu:link href="#" class="block px-3 py-2 text-sm text-gray-700 dark:text-zinc-300 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800">For Enterprise</a>
      </div>
    </div>
  </div>
</nav>

</ComponentExample>

## Custom Delays

Configure hover intent delays to control how quickly menus open and close.

<ComponentExample>

<nav x-navigation-menu="{ delay: 0, closeDelay: 500 }" class="relative">
  <ul x-navigation-menu:list class="flex items-center gap-1">
    <li x-navigation-menu:item="'instant'">
      <button x-navigation-menu:trigger class="px-4 py-2 text-gray-700 dark:text-zinc-300 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-zinc-800">
        Instant Open
      </button>
    </li>
  </ul>

  <div x-navigation-menu:positioner class="z-50">
    <div x-navigation-menu:viewport>
      <div x-navigation-menu:content="'instant'" class="bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-gray-200 dark:border-zinc-700 p-4 min-w-55">
        <div class="text-sm text-gray-500 dark:text-zinc-400 mb-2">Opens immediately, stays for 500ms after leaving</div>
        <a x-navigation-menu:link href="#" class="block px-3 py-2 text-sm text-gray-700 dark:text-zinc-300 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800">Option A</a>
        <a x-navigation-menu:link href="#" class="block px-3 py-2 text-sm text-gray-700 dark:text-zinc-300 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800">Option B</a>
      </div>
    </div>
  </div>
</nav>

</ComponentExample>

## Vertical Orientation

Use `orientation: 'vertical'` for a vertical sidebar-style navigation. The dropdown opens to the right of each trigger.

<ComponentExample>

<nav x-navigation-menu="{ orientation: 'vertical', placement: 'right' }" class="relative">
  <ul x-navigation-menu:list class="flex flex-col gap-1 w-48">
    <li x-navigation-menu:item="'dashboard'">
      <button x-navigation-menu:trigger class="w-full text-left px-4 py-2 text-gray-700 dark:text-zinc-300 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-zinc-800">
        Dashboard
      </button>
    </li>
    <li x-navigation-menu:item="'settings'">
      <button x-navigation-menu:trigger class="w-full text-left px-4 py-2 text-gray-700 dark:text-zinc-300 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-zinc-800">
        Settings
      </button>
    </li>
    <li x-navigation-menu:item="'help'">
      <a x-navigation-menu:link href="#" class="block px-4 py-2 text-gray-700 dark:text-zinc-300 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800">
        Help
      </a>
    </li>
  </ul>

  <div x-navigation-menu:positioner class="z-50">
    <div x-navigation-menu:viewport>
      <div x-navigation-menu:content="'dashboard'" class="bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-gray-200 dark:border-zinc-700 p-4 min-w-48">
        <a x-navigation-menu:link href="#" class="block px-3 py-2 text-sm text-gray-700 dark:text-zinc-300 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800">Overview</a>
        <a x-navigation-menu:link href="#" class="block px-3 py-2 text-sm text-gray-700 dark:text-zinc-300 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800">Analytics</a>
        <a x-navigation-menu:link href="#" class="block px-3 py-2 text-sm text-gray-700 dark:text-zinc-300 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800">Reports</a>
      </div>
      <div x-navigation-menu:content="'settings'" class="bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-gray-200 dark:border-zinc-700 p-4 min-w-48">
        <a x-navigation-menu:link href="#" class="block px-3 py-2 text-sm text-gray-700 dark:text-zinc-300 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800">Profile</a>
        <a x-navigation-menu:link href="#" class="block px-3 py-2 text-sm text-gray-700 dark:text-zinc-300 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800">Preferences</a>
      </div>
    </div>
  </div>
</nav>

</ComponentExample>

## With x-model

Control the active value from outside using Alpine's `x-model`.

<ComponentExample>

<div x-data="{ activeMenu: null }">
  <div class="mb-3">
    <span class="text-sm text-gray-600 dark:text-zinc-400">
      Active: <strong x-text="activeMenu || 'none'" class="text-gray-900 dark:text-white"></strong>
    </span>
    <button
      x-on:click="activeMenu = null"
      class="ml-2 px-2 py-1 text-xs bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 rounded hover:bg-gray-200 dark:hover:bg-zinc-700"
    >
      Close All
    </button>
  </div>

  <nav x-navigation-menu x-model="activeMenu" class="relative">
    <ul x-navigation-menu:list class="flex items-center gap-1">
      <li x-navigation-menu:item="'about'">
        <button x-navigation-menu:trigger class="px-4 py-2 text-gray-700 dark:text-zinc-300 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-zinc-800">
          About
        </button>
      </li>
      <li x-navigation-menu:item="'contact'">
        <button x-navigation-menu:trigger class="px-4 py-2 text-gray-700 dark:text-zinc-300 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-zinc-800">
          Contact
        </button>
      </li>
    </ul>
    <div x-navigation-menu:positioner class="z-50">
      <div x-navigation-menu:viewport>
        <div x-navigation-menu:content="'about'" class="bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-gray-200 dark:border-zinc-700 p-4 min-w-55">
          <a x-navigation-menu:link href="#" class="block px-3 py-2 text-sm text-gray-700 dark:text-zinc-300 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800">Our Story</a>
          <a x-navigation-menu:link href="#" class="block px-3 py-2 text-sm text-gray-700 dark:text-zinc-300 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800">Team</a>
        </div>
        <div x-navigation-menu:content="'contact'" class="bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-gray-200 dark:border-zinc-700 p-4 min-w-55">
          <a x-navigation-menu:link href="#" class="block px-3 py-2 text-sm text-gray-700 dark:text-zinc-300 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800">Email</a>
          <a x-navigation-menu:link href="#" class="block px-3 py-2 text-sm text-gray-700 dark:text-zinc-300 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800">Phone</a>
        </div>
      </div>
    </div>
  </nav>
</div>

</ComponentExample>

## API Reference

### Root Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Navigation direction |
| `delay` | `number` | `50` | Hover-to-open delay in milliseconds |
| `closeDelay` | `number` | `50` | Hover-to-close delay in milliseconds |
| `value` | `string \| null` | `null` | Currently active item value |
| `placement` | `Placement` | `'bottom'` | Dropdown position relative to trigger |
| `offset` | `number` | `8` | Distance from trigger in pixels |

### Placement Values

- `top`, `top-start`, `top-end`
- `bottom`, `bottom-start`, `bottom-end`
- `left`, `left-start`, `left-end`
- `right`, `right-start`, `right-end`

### Parts

| Part | Description |
|------|-------------|
| `x-navigation-menu:list` | Menu items wrapper (`menubar` role) |
| `x-navigation-menu:item` | Individual menu entry (scope provider). Value: unique string identifier |
| `x-navigation-menu:trigger` | Button that opens dropdown on hover/click |
| `x-navigation-menu:positioner` | Single positioning wrapper for all content (managed by Floating UI) |
| `x-navigation-menu:viewport` | Container inside positioner that holds all content panels |
| `x-navigation-menu:content` | Dropdown content container (`menu` role). Value: unique string identifier matching an item |
| `x-navigation-menu:link` | Navigation anchor inside content (`menuitem` role) |
| `x-navigation-menu:arrow` | Optional arrow pointing to trigger (inside positioner) |
| `x-navigation-menu:indicator` | Optional visual indicator (inside item scope) |

### Scope Data (`$item`)

Available inside `x-navigation-menu:item` and its children via `$item`:

| Property | Type | Description |
|----------|------|-------------|
| `value` | `string` | This item's unique identifier |
| `triggerId` | `string` | Generated trigger element ID |
| `isActive` | `boolean` | Whether this item's dropdown is open |
| `hasContent` | `boolean` | Whether this item has registered content |
| `open()` | `function` | Open this item's dropdown |
| `close()` | `function` | Close the dropdown immediately |

### Data Attributes

| Attribute | Values | Description |
|-----------|--------|-------------|
| `data-state` | `open` \| `closed` | Current open/closed state |
| `data-scope` | `navigation-menu` | Identifies component scope |
| `data-part` | Part name | Identifies component part |
| `data-orientation` | `horizontal` \| `vertical` | Navigation direction (on root and list) |
| `data-value` | Item value | Unique item identifier (on item and trigger) |
| `data-activation-direction` | `forward` \| `backward` \| `none` | Direction of last item switch (on content, viewport) |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `value-change` | `{ value: string \| null, previousValue: string \| null }` | Fired when active item changes |

## Keyboard Interactions

| Key | Description |
|-----|-------------|
| <kbd>Arrow Right</kbd> | Focus next trigger (horizontal mode) |
| <kbd>Arrow Left</kbd> | Focus previous trigger (horizontal mode) |
| <kbd>Arrow Down</kbd> | Focus next trigger (vertical) or first content link (horizontal, when open) |
| <kbd>Arrow Up</kbd> | Focus previous trigger (vertical mode) |
| <kbd>Home</kbd> | Focus first trigger |
| <kbd>End</kbd> | Focus last trigger |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Toggle dropdown content |
| <kbd>Escape</kbd> | Close dropdown and return focus to trigger |
| <kbd>Tab</kbd> | Move focus through content links |

## Accessibility

- Follows WAI-ARIA menubar pattern
- Root has `role="navigation"` with `aria-label`
- List has `role="menubar"` with `aria-orientation`
- Triggers have `role="menuitem"` with `aria-expanded` and `aria-controls`
- Content has `role="menu"` linked via `aria-labelledby`
- Links have `role="menuitem"` with `tabindex="-1"`
- Roving tabindex on triggers ensures proper Tab key behavior
- Touch devices use click interaction instead of hover
