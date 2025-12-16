# Dialog

Modal dialogs and alerts with focus trapping and accessible keyboard interactions.

## Features

- ✅ Focus trap when dialog is open
- ✅ Escape key to close
- ✅ Focus returns to trigger on close
- ✅ Backdrop click to close
- ✅ Accessible ARIA attributes
- ✅ Prevent body scroll when open
- ✅ Support for programmatic control via events
- ✅ Support for nested dialogs

## Basic Usage

<ComponentExample>

<div x-dialog>
  <button x-dialog:trigger class="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600">
    Open Dialog
  </button>

  <div x-dialog:backdrop class="fixed inset-0 bg-black/50 dark:bg-black/70 z-50"></div>

  <div x-dialog:positioner class="fixed inset-0 flex items-center justify-center p-4 z-50">
    <div x-dialog:content class="bg-white dark:bg-zinc-900 rounded-lg shadow-xl max-w-md w-full p-6 border border-gray-200 dark:border-zinc-700">
      <h2 x-dialog:title class="text-xl font-bold mb-2 text-gray-900 dark:text-white">Dialog Title</h2>
      <p x-dialog:description class="text-gray-600 dark:text-zinc-400 mb-6">
        This is a basic dialog example. Click outside or press Escape to close.
      </p>
      <div class="flex gap-3 justify-end">
        <button x-dialog:close-trigger class="px-4 py-2 text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg">
          Close
        </button>
      </div>
    </div>
  </div>
</div>

</ComponentExample>

## Confirmation Dialog

<ComponentExample>

<div x-dialog>
  <button x-dialog:trigger class="px-4 py-2 bg-red-600 dark:bg-red-500 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-600">
    Delete Item
  </button>

  <div x-dialog:backdrop class="fixed inset-0 bg-black/50 dark:bg-black/70 z-50"></div>

  <div x-dialog:positioner class="fixed inset-0 flex items-center justify-center p-4 z-50">
    <div x-dialog:content class="bg-white dark:bg-zinc-900 rounded-lg shadow-xl max-w-md w-full p-6 border border-gray-200 dark:border-zinc-700">
      <h2 x-dialog:title class="text-xl font-bold mb-2 text-gray-900 dark:text-white">Confirm Deletion</h2>
      <p x-dialog:description class="text-gray-600 dark:text-zinc-400 mb-6">
        Are you sure you want to delete this item? This action cannot be undone.
      </p>
      <div class="flex gap-3 justify-end">
        <button x-dialog:close-trigger class="px-4 py-2 text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg">
          Cancel
        </button>
        <button class="px-4 py-2 bg-red-600 dark:bg-red-500 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-600">
          Delete
        </button>
      </div>
    </div>
  </div>
</div>

</ComponentExample>

## Programmatic Control

You can control dialogs programmatically using custom events with the `name` prop.

<ComponentExample>

<div>
  <button
    x-on:click="window.dispatchEvent(new CustomEvent('modal:open', { detail: 'my-dialog' }))"
    class="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
  >
    Open Dialog via Event
  </button>

  <div x-dialog="{ name: 'my-dialog' }">
    <div x-dialog:backdrop class="fixed inset-0 bg-black/50 dark:bg-black/70"></div>
    <div x-dialog:positioner class="fixed inset-0 flex items-center justify-center p-4 ">
      <div x-dialog:content class="bg-white dark:bg-zinc-900 rounded-lg shadow-xl max-w-md w-full p-6 border border-gray-200 dark:border-zinc-700">
        <h2 x-dialog:title class="text-xl font-bold mb-2 text-gray-900 dark:text-white">Programmatic Dialog</h2>
        <p x-dialog:description class="text-gray-600 dark:text-zinc-400 mb-6">
          This dialog was opened using a custom event.
        </p>
        <button x-dialog:close-trigger class="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600">
          Close
        </button>
      </div>
    </div>
  </div>
</div>

</ComponentExample>

## With Transitions

<ComponentExample>

<div x-dialog>
  <button x-dialog:trigger class="px-4 py-2 bg-purple-600 dark:bg-purple-500 text-white rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600">
    Open with Animation
  </button>

  <div
    x-dialog:backdrop
    x-transition:enter="transition-opacity ease-out duration-300"
    x-transition:enter-start="opacity-0"
    x-transition:enter-end="opacity-100"
    x-transition:leave="transition-opacity ease-in duration-200"
    x-transition:leave-start="opacity-100"
    x-transition:leave-end="opacity-0"
    class="fixed inset-0 bg-black/50 dark:bg-black/70 z-50"
  ></div>

  <div x-dialog:positioner class="fixed inset-0 flex items-center justify-center p-4 z-50">
    <div
      x-dialog:content
      x-transition:enter="transition ease-out duration-300"
      x-transition:enter-start="opacity-0 scale-95"
      x-transition:enter-end="opacity-100 scale-100"
      x-transition:leave="transition ease-in duration-200"
      x-transition:leave-start="opacity-100 scale-100"
      x-transition:leave-end="opacity-0 scale-95"
      class="bg-white dark:bg-zinc-900 rounded-lg shadow-xl max-w-md w-full p-6 border border-gray-200 dark:border-zinc-700"
    >
      <h2 x-dialog:title class="text-xl font-bold mb-2 text-gray-900 dark:text-white">Animated Dialog</h2>
      <p x-dialog:description class="text-gray-600 dark:text-zinc-400 mb-6">
        This dialog smoothly fades and scales in.
      </p>
      <button x-dialog:close-trigger class="px-4 py-2 bg-purple-600 dark:bg-purple-500 text-white rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600">
        Close
      </button>
    </div>
  </div>
</div>

</ComponentExample>

## Full Screen Modal

<ComponentExample>

<div x-dialog>
  <button x-dialog:trigger class="px-4 py-2 bg-green-600 dark:bg-green-500 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600">
    Open Full Screen
  </button>

  <div x-dialog:backdrop class="fixed inset-0 bg-black/50 dark:bg-black/70 z-50"></div>

  <div x-dialog:positioner class="fixed inset-0 z-50">
    <div x-dialog:content class="bg-white dark:bg-zinc-900 w-full h-full flex flex-col">
      <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-zinc-700">
        <h2 x-dialog:title class="text-2xl font-bold text-gray-900 dark:text-white">Full Screen Dialog</h2>
        <button x-dialog:close-trigger class="p-2 text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="flex-1 p-6 overflow-y-auto">
        <p x-dialog:description class="text-gray-600 dark:text-zinc-400 mb-4">
          This is a full screen modal dialog. Perfect for complex forms, image galleries, or detailed content.
        </p>
        <div class="space-y-4">
          <p class="text-gray-700 dark:text-zinc-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p class="text-gray-700 dark:text-zinc-300">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p class="text-gray-700 dark:text-zinc-300">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
      </div>
      <div class="p-6 border-t border-gray-200 dark:border-zinc-700 flex justify-end gap-3">
        <button x-dialog:close-trigger class="px-4 py-2 text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg">
          Cancel
        </button>
        <button class="px-4 py-2 bg-green-600 dark:bg-green-500 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600">
          Save Changes
        </button>
      </div>
    </div>
  </div>
</div>

</ComponentExample>

## Drawer/Flyout Modal

<ComponentExample>

<div x-dialog>
  <button x-dialog:trigger class="px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600">
    Open Drawer
  </button>

  <div x-dialog:backdrop class="fixed inset-0 bg-black/50 dark:bg-black/70 z-50"></div>

  <div x-dialog:positioner class="fixed inset-0 z-50 flex justify-end">
    <div
      x-dialog:content
      class="bg-white dark:bg-zinc-900 w-full max-w-md h-full flex flex-col shadow-2xl"
    >
        <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-zinc-700">
          <h2 x-dialog:title class="text-xl font-bold text-gray-900 dark:text-white">Drawer Menu</h2>
          <button x-dialog:close-trigger class="p-2 text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="flex-1 p-6 overflow-y-auto">
          <p x-dialog:description class="text-gray-600 dark:text-zinc-400 mb-6">
            This drawer slides in from the right side of the screen.
          </p>
          <nav class="space-y-1">
            <a href="#" class="block px-4 py-2 text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg">Dashboard</a>
            <a href="#" class="block px-4 py-2 text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg">Projects</a>
            <a href="#" class="block px-4 py-2 text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg">Team</a>
            <a href="#" class="block px-4 py-2 text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg">Settings</a>
          </nav>
        </div>
        <div class="p-6 border-t border-gray-200 dark:border-zinc-700">
          <button class="w-full px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600">
            Get Started
          </button>
        </div>
    </div>
  </div>
</div>

</ComponentExample>

## API Reference

### Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | - | Unique identifier for programmatic control |
| `open` | `boolean` | `false` | Controlled open state |
| `modal` | `boolean` | `true` | Enable modal behavior (focus trap, scroll lock) |
| `closeOnInteractOutside` | `boolean` | `true` | Close when clicking backdrop |
| `closeOnEscape` | `boolean` | `true` | Close when pressing Escape key |
| `trapFocus` | `boolean` | `true` | Trap focus within dialog |
| `preventScroll` | `boolean` | `true` | Prevent body scroll when open |
| `role` | `'dialog' \| 'alertdialog'` | `'dialog'` | ARIA role for the dialog |

### Parts

| Part | Description |
|------|-------------|
| `x-dialog` | Root container element |
| `x-dialog:trigger` | Button that opens the dialog |
| `x-dialog:backdrop` | Backdrop/overlay element |
| `x-dialog:positioner` | Positions the dialog content |
| `x-dialog:content` | Dialog content container |
| `x-dialog:title` | Dialog title (for aria-labelledby) |
| `x-dialog:description` | Dialog description (for aria-describedby) |
| `x-dialog:close-trigger` | Close button |

### Data Attributes

| Attribute | Description |
|-----------|-------------|
| `data-scope` | Always set to `dialog` |
| `data-part` | Identifies the part (`root`, `trigger`, `backdrop`, etc.) |
| `data-state` | Current state (`open` or `closed`) on root |

### Events

**Dispatched by component:**

| Event | Detail | Description |
|-------|--------|-------------|
| `open` | `{ open: true }` | Fired when dialog opens |
| `close` | `{ open: false }` | Fired when dialog closes |

**Listened for (window events):**

| Event | Detail | Description |
|-------|--------|-------------|
| `modal:open` | `string` (dialog name) | Opens dialog matching the name |
| `modal:close` | `string` (dialog name) | Closes dialog matching the name |

## Accessibility

### Keyboard Interactions

| Key | Action |
|-----|--------|
| `Escape` | Closes the dialog |
| `Tab` | Moves focus to next focusable element within dialog |
| `Shift + Tab` | Moves focus to previous focusable element within dialog |

### Focus Management

- When opened, focus moves to the first focusable element in the dialog
- Focus is trapped within the dialog while open (in modal mode)
- When closed, focus returns to the trigger button
- Focusable elements include: links, buttons, inputs, selects, textareas, and elements with `tabindex >= 0`

### ARIA Attributes

The dialog automatically includes:

- `role="dialog"` (or `role="alertdialog"`) on the content
- `aria-modal="true"` on the content (when modal)
- `aria-labelledby` pointing to the title
- `aria-describedby` pointing to the description
- `aria-expanded` on the trigger
- `aria-haspopup="dialog"` on the trigger

## Tips

- **Modal vs Non-modal**: Use `modal: true` for dialogs that require user attention before continuing. Use `modal: false` for informational dialogs that don't block interaction.
- **Alert Dialog**: Use `role: 'alertdialog'` for dialogs that require immediate user response (like confirmations or warnings).
- **Programmatic Control**: Use the `name` prop with window events to open/close dialogs from anywhere in your application.
- **Transitions**: Combine with Alpine's `x-transition` directives for smooth animations.
- **Nested Dialogs**: The component supports multiple dialogs with proper focus and scroll management.
