# Popover

Floating content that appears on demand, positioned relative to a trigger element.

## Features

- ✅ Smart positioning with auto-flip and shift
- ✅ Optional arrow pointing to trigger
- ✅ Click to open/close or programmatic control
- ✅ Close on outside click or escape key
- ✅ Accessible ARIA attributes
- ✅ Optional focus trap for modal mode
- ✅ Multiple placement options

## Basic Usage

<ComponentExample>

<div x-popover>
  <button x-popover:trigger class="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600">
    Open Popover
  </button>

  <div x-popover:positioner class="z-50">
    <div x-popover:content class="bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-gray-200 dark:border-zinc-700 p-4 min-w-50 max-w-sm">
      <h3 x-popover:title class="font-semibold text-gray-900 dark:text-white mb-1">Popover Title</h3>
      <p x-popover:description class="text-sm text-gray-600 dark:text-zinc-400 mb-3">
        This is a basic popover with some contextual information.
      </p>
      <button x-popover:close-trigger class="px-3 py-1 text-sm bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 rounded hover:bg-gray-200 dark:hover:bg-zinc-700">
        Close
      </button>
    </div>
  </div>
</div>

</ComponentExample>

## With Arrow

Add an arrow that points to the trigger element. The component automatically rotates the arrow tip based on the popover's placement.

::: tip Arrow Styling
The arrow tip is automatically rotated based on placement. Simply apply `border-t` and `border-l` to create the arrow shape - the rotation is handled for you.
:::

<ComponentExample>

<div x-popover>
  <button x-popover:trigger class="px-4 py-2 bg-purple-600 dark:bg-purple-500 text-white rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600">
    Show Tooltip
  </button>

  <div x-popover:positioner class="z-50">
    <div x-popover:content class="bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-gray-200 dark:border-zinc-700 p-4 min-w-[250px]">
      <div x-popover:arrow class="absolute w-2 h-2">
        <div x-popover:arrow-tip class="w-full h-full bg-white dark:bg-zinc-900 border-t border-l border-gray-200 dark:border-zinc-700"></div>
      </div>
      <h3 x-popover:title class="font-semibold text-gray-900 dark:text-white mb-1">Help & Information</h3>
      <p x-popover:description class="text-sm text-gray-600 dark:text-zinc-400">
        Notice the arrow pointing to the trigger button. This helps establish a visual connection.
      </p>
    </div>
  </div>
</div>

</ComponentExample>

## Placement Options

<ComponentExample>

<div class="flex flex-wrap gap-3">
  <div x-popover="{ placement: 'top' }">
    <button x-popover:trigger class="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600">
      Top
    </button>
    <div x-popover:positioner class="z-50">
      <div x-popover:content class="bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-gray-200 dark:border-zinc-700 p-3">
        <div x-popover:arrow class="absolute w-2 h-2">
          <div x-popover:arrow-tip class="w-full h-full bg-white dark:bg-zinc-900 border-t border-l border-gray-200 dark:border-zinc-700"></div>
        </div>
        <p x-popover:description class="text-sm text-gray-600 dark:text-zinc-400">Positioned above</p>
      </div>
    </div>
  </div>

  <div x-popover="{ placement: 'bottom' }">
    <button x-popover:trigger class="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600">
      Bottom
    </button>
    <div x-popover:positioner class="z-50">
      <div x-popover:content class="bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-gray-200 dark:border-zinc-700 p-3">
        <div x-popover:arrow class="absolute w-2 h-2">
          <div x-popover:arrow-tip class="w-full h-full bg-white dark:bg-zinc-900 border-t border-l border-gray-200 dark:border-zinc-700"></div>
        </div>
        <p x-popover:description class="text-sm text-gray-600 dark:text-zinc-400">Positioned below</p>
      </div>
    </div>
  </div>

  <div x-popover="{ placement: 'left' }">
    <button x-popover:trigger class="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600">
      Left
    </button>
    <div x-popover:positioner class="z-50">
      <div x-popover:content class="bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-gray-200 dark:border-zinc-700 p-3">
        <div x-popover:arrow class="absolute w-2 h-2">
          <div x-popover:arrow-tip class="w-full h-full bg-white dark:bg-zinc-900 border-t border-l border-gray-200 dark:border-zinc-700"></div>
        </div>
        <p x-popover:description class="text-sm text-gray-600 dark:text-zinc-400">Positioned left</p>
      </div>
    </div>
  </div>

  <div x-popover="{ placement: 'right' }">
    <button x-popover:trigger class="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600">
      Right
    </button>
    <div x-popover:positioner class="z-50">
      <div x-popover:content class="bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-gray-200 dark:border-zinc-700 p-3">
        <div x-popover:arrow class="absolute w-2 h-2">
          <div x-popover:arrow-tip class="w-full h-full bg-white dark:bg-zinc-900 border-t border-l border-gray-200 dark:border-zinc-700"></div>
        </div>
        <p x-popover:description class="text-sm text-gray-600 dark:text-zinc-400">Positioned right</p>
      </div>
    </div>
  </div>
</div>

</ComponentExample>

## Programmatic Control

Control popovers programmatically using custom events with the `name` prop.

<ComponentExample>

<div>
  <button
    x-on:click="window.dispatchEvent(new CustomEvent('popover:open', { detail: 'my-popover' }))"
    class="px-4 py-2 bg-green-600 dark:bg-green-500 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600"
  >
    Open via Event
  </button>

  <div x-popover="{ name: 'my-popover' }">
    <div x-popover:positioner class="z-50">
      <div x-popover:content class="bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-gray-200 dark:border-zinc-700 p-4 min-w-[250px]">
        <h3 x-popover:title class="font-semibold text-gray-900 dark:text-white mb-1">Programmatic Popover</h3>
        <p x-popover:description class="text-sm text-gray-600 dark:text-zinc-400 mb-3">
          This popover was opened using a custom event.
        </p>
        <button
          x-on:click="window.dispatchEvent(new CustomEvent('popover:close', { detail: 'my-popover' }))"
          class="px-3 py-1 text-sm bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 rounded hover:bg-gray-200 dark:hover:bg-zinc-700"
        >
          Close via Event
        </button>
      </div>
    </div>
  </div>
</div>

</ComponentExample>

## With Transitions

<ComponentExample>

<div x-popover>
  <button x-popover:trigger class="px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600">
    Animated Popover
  </button>

  <div
    x-popover:positioner
    x-transition:enter="transition ease-out duration-200"
    x-transition:enter-start="opacity-0 scale-95"
    x-transition:enter-end="opacity-100 scale-100"
    x-transition:leave="transition ease-in duration-150"
    x-transition:leave-start="opacity-100 scale-100"
    x-transition:leave-end="opacity-0 scale-95"
  >
    <div x-popover:content class="bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-gray-200 dark:border-zinc-700 p-4">
      <div x-popover:arrow class="absolute w-2 h-2">
        <div x-popover:arrow-tip class="w-full h-full bg-white dark:bg-zinc-900 border-t border-l border-gray-200 dark:border-zinc-700"></div>
      </div>
      <h3 x-popover:title class="font-semibold text-gray-900 dark:text-white mb-1">Smooth Animation</h3>
      <p x-popover:description class="text-sm text-gray-600 dark:text-zinc-400">
        Alpine's transition directives make it easy to add smooth enter/leave animations.
      </p>
    </div>
  </div>
</div>

</ComponentExample>

## API Reference

### Root Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `name` | `string` | - | Unique identifier for programmatic control |
| `open` | `boolean` | `false` | Initial open state |
| `modal` | `boolean` | `false` | Enable modal mode with focus trap |
| `closeOnInteractOutside` | `boolean` | `true` | Close when clicking outside |
| `closeOnEscape` | `boolean` | `true` | Close when pressing Escape |
| `trapFocus` | `boolean` | `false` | Enable focus trapping (modal mode) |
| `placement` | `Placement` | `'bottom'` | Position relative to trigger |
| `offset` | `number` | `8` | Distance from trigger in pixels |

### Placement Values

- `top`, `top-start`, `top-end`
- `bottom`, `bottom-start`, `bottom-end`
- `left`, `left-start`, `left-end`
- `right`, `right-start`, `right-end`

### Parts

| Part | Description |
|------|-------------|
| `x-popover:trigger` | Button that toggles the popover |
| `x-popover:positioner` | Positioning wrapper (managed by Floating UI) |
| `x-popover:content` | Main popover content container |
| `x-popover:arrow` | Optional arrow container element |
| `x-popover:arrow-tip` | Optional arrow tip (child of arrow) |
| `x-popover:title` | Optional heading element |
| `x-popover:description` | Optional description text |
| `x-popover:close-trigger` | Button to close the popover |

### Data Attributes

| Attribute | Values | Description |
|-----------|--------|-------------|
| `data-state` | `open` \| `closed` | Current popover state |
| `data-scope` | `popover` | Identifies component scope |
| `data-part` | Part name | Identifies component part |

## Keyboard Interactions

| Key | Description |
|-----|-------------|
| <kbd>Space</kbd> / <kbd>Enter</kbd> | Toggle popover when trigger is focused |
| <kbd>Escape</kbd> | Close popover and return focus to trigger |
| <kbd>Tab</kbd> | Move focus to next focusable element |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | Move focus to previous focusable element |

## Accessibility

- Follows WAI-ARIA dialog pattern
- Proper `role="dialog"` on content
- Trigger has `aria-haspopup` and `aria-expanded` attributes
- Content linked to title and description via `aria-labelledby` and `aria-describedby`
- Focus returns to trigger on close
- Optional focus trap for modal mode
