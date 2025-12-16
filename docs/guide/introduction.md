# Introduction

Alpine Headless UI provides headless, accessible UI primitives for Alpine.js built with [`alpine-define-component`](https://github.com/eldomagan/alpine-define-component).

## What is Headless UI?

Headless UI components provide the logic, state management, and accessibility features without imposing any visual styling. This gives you complete freedom to style components however you want while ensuring they work correctly and are accessible.

## Key Features

### 🎨 Headless Design

No CSS, no markup assumptions. You write the HTML and CSS exactly how you want it. The components only provide the interactive behavior and accessibility features.

### ♿️ Accessible by Default

All components follow WAI-ARIA best practices:

- Proper ARIA roles and attributes
- Keyboard navigation that matches user expectations
- Focus management (focus trap, focus return, etc.)
- Screen reader announcements

### 🌲 Tree-Shakeable

Import the entire library or just the components you need:

```js
// Full library
import AlpineHeadlessUI from 'alpine-headless-ui'

// Individual components (recommended)
import dialog from 'alpine-headless-ui/dialog'
import menu from 'alpine-headless-ui/menu'
```

### 🎯 Alpine.js Native

Built specifically for Alpine.js v3 using the declarative, HTML-first approach you already know and love.

## Component Pattern

All components follow a consistent pattern:

```html
<!-- Root element -->
<div x-component>
  <!-- Named parts -->
  <button x-component:trigger>Trigger</button>
  <div x-component:content>
    <!-- Component content -->
  </div>
</div>
```

- **Root element**: Uses `x-<component>` directive
- **Named parts**: Use `x-<component>:<part>` directives
- **Event system**: Components dispatch events you can listen to

## What You Control

Alpine Headless UI handles the behavior, you control everything else:

- ✅ HTML structure and semantic markup
- ✅ CSS styling (Tailwind, plain CSS, CSS-in-JS, etc.)
- ✅ Animations and transitions
- ✅ Layout and positioning
- ✅ Visual design and branding

## What Components Provide

- State management (open/closed, selected, active, etc.)
- Keyboard interactions (arrow keys, Enter, Escape, etc.)
- ARIA attributes (roles, aria-expanded, aria-selected, etc.)
- Focus management (trapping focus, returning focus, etc.)
- Event dispatching (open, close, select, etc.)

## Next Steps

- [Installation](/guide/installation) - Get started with Alpine Headless UI
- [Usage](/guide/usage) - Learn how to use components
- [Components](/components/) - Explore available components
