# Styling

Alpine Headless UI components are completely unstyled by design. They provide behavior, state management, and accessibility features while giving you complete control over styling.

## Data Attributes

All components automatically add data attributes to their elements, making it easy to style based on component state.

### Common Data Attributes

Every component part receives these attributes:

- `data-scope` - Identifies which component the element belongs to (e.g., `"collapsible"`, `"dialog"`)
- `data-part` - Identifies the role of the element (e.g., `"trigger"`, `"content"`, `"root"`)
- `data-state` - Current state of the component or element (e.g., `"open"`, `"closed"`)
- `data-disabled` - Present when the component is disabled

### Using Data Attributes in CSS

You can target elements using attribute selectors:

```css
/* Style based on state */
[data-state="open"] {
  background-color: #f0f0f0;
}

[data-state="closed"] {
  background-color: white;
}

/* Style disabled elements */
[data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Target specific component parts */
[data-scope="collapsible"][data-part="trigger"] {
  padding: 1rem;
  border-radius: 0.5rem;
}
```

### Using Data Attributes with Tailwind CSS

Tailwind's arbitrary variant syntax makes it easy to style based on data attributes:

```html
<div x-collapsible>
  <button
    x-collapsible:trigger
    class="
      px-4 py-2 rounded-lg
      data-[state=open]:bg-blue-50
      data-[state=closed]:bg-white
      data-disabled:opacity-50
      data-disabled:cursor-not-allowed
    "
  >
    Toggle
  </button>
  <div x-collapsible:content>
    Content
  </div>
</div>
```

## Styling Patterns

### State-based Styling

Use `data-state` attributes to style elements differently based on their current state:

```html
<!-- Collapsible indicator that rotates when open -->
<svg
  x-collapsible:indicator
  class="transition-transform data-[state=open]:rotate-180"
>
  <!-- icon -->
</svg>

<!-- Dialog backdrop that fades in -->
<div
  x-dialog:backdrop
  class="
    transition-opacity
    data-[state=open]:opacity-100
    data-[state=closed]:opacity-0
  "
/>
```

### Disabled States

All interactive components support disabled states:

```html
<button
  x-collapsible:trigger
  class="
    px-4 py-2
    hover:bg-gray-100
    data-disabled:opacity-50
    data-disabled:cursor-not-allowed
    data-disabled:hover:bg-white
  "
>
  Toggle
</button>
```

### Focus Styles

Remember to add focus styles for keyboard accessibility:

```html
<button
  x-dialog:trigger
  class="
    px-4 py-2
    focus:outline-none
    focus:ring-2
    focus:ring-blue-500
    focus:ring-offset-2
  "
>
  Open Dialog
</button>
```

## Component-Specific Styling

Different components may have additional state attributes. Check each component's documentation for specific data attributes it provides.

### Example: Collapsible

```html
<div x-collapsible class="border rounded-lg overflow-hidden">
  <button
    x-collapsible:trigger
    class="
      w-full px-4 py-3 text-left
      bg-white hover:bg-gray-50
      data-[state=open]:bg-gray-100
      data-disabled:opacity-60
      transition-colors
    "
  >
    Toggle
  </button>
  <div
    x-collapsible:content
    class="px-4 py-3 bg-gray-50 border-t"
  >
    Content
  </div>
</div>
```

### Example: Dialog

```html
<!-- Backdrop with fade -->
<div
  x-dialog:backdrop
  class="
    fixed inset-0 bg-black/50
    transition-opacity duration-200
    data-[state=open]:opacity-100
    data-[state=closed]:opacity-0
  "
/>

<!-- Content with scale animation -->
<div
  x-dialog:content
  class="
    fixed inset-0 flex items-center justify-center
    transition-all duration-200
    data-[state=open]:scale-100
    data-[state=closed]:scale-95
  "
>
  <div class="bg-white rounded-lg p-6 shadow-xl">
    <!-- Dialog content -->
  </div>
</div>
```

## Animation Libraries

Alpine Headless UI works seamlessly with animation libraries:

### Alpine.js Transitions

Use Alpine's `x-transition` directive:

```html
<div
  x-collapsible:content
  x-transition:enter="transition ease-out duration-300"
  x-transition:enter-start="opacity-0 transform scale-95"
  x-transition:enter-end="opacity-100 transform scale-100"
>
  Content
</div>
```

### Tailwind CSS Animations

Define custom animations in your Tailwind config:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        slideDown: {
          from: { height: 0 },
          to: { height: 'var(--radix-collapsible-content-height)' }
        }
      },
      animation: {
        slideDown: 'slideDown 300ms ease-out'
      }
    }
  }
}
```

```html
<div
  x-collapsible:content
  class="data-[state=open]:animate-slideDown"
>
  Content
</div>
```

## Best Practices

### Prefer Data Attributes Over JavaScript State

Instead of using Alpine's reactive bindings for styling, prefer data attributes:

```html
<!-- ✅ Good - Uses data attributes -->
<button
  x-collapsible:trigger
  class="data-[state=open]:bg-blue-50"
>
  Toggle
</button>

<!-- ❌ Avoid - Unnecessary reactive binding -->
<button
  x-collapsible:trigger
  :class="{ 'bg-blue-50': $collapsible.open }"
>
  Toggle
</button>
```

**Why?** Data attributes are automatically managed by the component and keep your markup cleaner.

### Use Transitions for Better UX

Add transitions to state changes for smoother interactions:

```html
<button
  class="
    transition-colors duration-200
    data-[state=open]:bg-blue-50
    data-[state=closed]:bg-white
  "
>
  Toggle
</button>
```

### Consider Dark Mode

Use Tailwind's dark mode or CSS custom properties:

```html
<button
  class="
    bg-white dark:bg-zinc-900
    hover:bg-gray-50 dark:hover:bg-zinc-800
    data-disabled:opacity-60
  "
>
  Toggle
</button>
```

### Maintain Focus Indicators

Always ensure focus states are visible for accessibility:

```html
<button
  class="
    focus:outline-none
    focus:ring-2 focus:ring-blue-500
    focus:ring-offset-2
  "
>
  Button
</button>
```

## See Also

- [Usage Guide](/guide/usage) - Learn how to use components
- [Components](/components/accordion) - Browse all available components
