# Usage

## Registering Components

There are two ways to use Alpine Headless UI components:

### Option 1: Register All Components

Import and register the entire library:

```js
import Alpine from 'alpinejs'
import AlpineHeadlessUI from 'alpine-headless-ui'

Alpine.plugin(AlpineHeadlessUI)
Alpine.start()
```

This approach is simple but includes all components in your bundle, even if you don't use them.

### Option 2: Register Individual Components (Recommended)

Import only the components you need for better tree-shaking:

```js
import Alpine from 'alpinejs'
import dialog from 'alpine-headless-ui/dialog'
import menu from 'alpine-headless-ui/menu'

Alpine.plugin(dialog)
Alpine.plugin(menu)
Alpine.start()
```

::: tip Recommended Approach
Importing individual components keeps your bundle size minimal and improves load times.
:::

## Using Components

Once registered, use components in your HTML with Alpine directives:

```html
<div x-dialog>
  <button x-dialog:trigger>Open Dialog</button>

  <div x-dialog:backdrop></div>
  <div x-dialog:positioner>
    <div x-dialog:content>
      <h2 x-dialog:title>Dialog Title</h2>
      <p x-dialog:description>Dialog content</p>
      <button x-dialog:close-trigger>Close</button>
    </div>
  </div>
</div>
```

## Component Pattern

All components follow the same pattern:

### 1. Root Element

Use the main component directive on a container element:

```html
<div x-component>
  <!-- Component parts go here -->
</div>
```

### 2. Named Parts

Add specific component parts using the `x-component:part` syntax:

```html
<div x-dialog>
  <button x-dialog:trigger>Trigger</button>
  <div x-dialog:backdrop></div>
  <div x-dialog:positioner>
    <div x-dialog:content>Panel content</div>
  </div>
</div>
```

### 3. Event Handling

Components dispatch events you can listen to:

```html
<div x-dialog @open="console.log('Dialog opened')" @close="console.log('Dialog closed')">
  <!-- Component content -->
</div>
```

## Styling Components

Since components are headless, you control all styling:

### With Tailwind CSS

```html
<div x-dialog>
  <button x-dialog:trigger class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
    Open Dialog
  </button>

  <div x-dialog:backdrop class="fixed inset-0 bg-black/50"></div>

  <div x-dialog:positioner class="fixed inset-0 flex items-center justify-center p-4">
    <div x-dialog:content class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
      <h2 x-dialog:title class="text-xl font-bold mb-4">Dialog Title</h2>
      <p x-dialog:description class="text-gray-600 mb-6">Dialog content goes here.</p>
      <button x-dialog:close-trigger class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
        Close
      </button>
    </div>
  </div>
</div>
```

### With Plain CSS

```html
<div x-dialog>
  <button x-dialog:trigger class="trigger-button">
    Open Dialog
  </button>

  <div x-dialog:backdrop class="dialog-backdrop"></div>
  <div x-dialog:positioner class="dialog-positioner">
    <div x-dialog:content class="dialog-content">
      <h2 x-dialog:title>Dialog Title</h2>
      <button x-dialog:close-trigger>Close</button>
    </div>
  </div>
</div>

<style>
  .trigger-button {
    padding: 0.5rem 1rem;
    background: #3b82f6;
    color: white;
    border-radius: 0.5rem;
  }

  .dialog-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  .dialog-positioner {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dialog-content {
    background: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
  }
</style>
```

## Adding Transitions

Use Alpine's transition directives for animations:

```html
<div x-dialog>
  <button x-dialog:trigger>Open Dialog</button>

  <div
    x-dialog:backdrop
    x-transition:enter="transition-opacity ease-out duration-300"
    x-transition:enter-start="opacity-0"
    x-transition:enter-end="opacity-100"
    x-transition:leave="transition-opacity ease-in duration-200"
    x-transition:leave-start="opacity-100"
    x-transition:leave-end="opacity-0"
    class="fixed inset-0 bg-black/50"
  ></div>

  <div x-dialog:positioner class="fixed inset-0 flex items-center justify-center p-4">
    <div
      x-dialog:content
      x-transition:enter="transition ease-out duration-300"
      x-transition:enter-start="opacity-0 scale-95"
      x-transition:enter-end="opacity-100 scale-100"
      x-transition:leave="transition ease-in duration-200"
      x-transition:leave-start="opacity-100 scale-100"
      x-transition:leave-end="opacity-0 scale-95"
      class="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
    >
      <h2 x-dialog:title>Dialog Title</h2>
      <p x-dialog:description>Dialog content</p>
      <button x-dialog:close-trigger>Close</button>
    </div>
  </div>
</div>
```

## Next Steps

- [Components](/components/accordion) - Explore available components
- Check individual component documentation for specific APIs and examples
