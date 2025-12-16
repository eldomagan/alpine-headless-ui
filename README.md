# Alpine Headless UI

Headless, accessible UI primitives for Alpine.js, built with [`https://github.com/eldomagan/alpine-define-component`](https://github.com/eldomagan/alpine-define-component).

This library provides unstyled, behavior-only components inspired by:

* [Alpine UI components documentation](https://alpinejs.dev/components)
* [Zag.js behavior and accessibility patterns](https://zagjs.com/)

The goal is to give you composable Alpine components with correct state management, keyboard interactions, and ARIA attributes, while leaving all styling and markup control to you.

---

## Features

* Headless (no styles, no markup assumptions)
* Accessible by default (keyboard and ARIA patterns applied)
* Per-component imports
* Built on Alpine.js v3

---

## Installation

```bash
npm install alpine-headless-ui
```

## Getting started

### Register all components

```js
import Alpine from 'alpinejs'
import AlpineHeadlessUI from 'alpine-headless-ui'

Alpine.plugin(AlpineHeadlessUI)
Alpine.start()
```

This registers all available headless ui components globally.

---

### Register individual components

You can import and register only the components you need.

```js
import Alpine from 'alpinejs'
import dialog from 'alpine-headless-ui/dialog'
import menu from 'alpine-headless-ui/menu'

Alpine.plugin(dialog)
Alpine.plugin(menu)
Alpine.start()
```

This keeps your bundle size minimal.

---

## Component usage

All components follow the same pattern:

* A root element using `x-<component>`
* Named parts using `x-<component>:<part>`
* Optional scoped sub-parts for repeated items

The exact HTML structure is up to you.

---

## Dialog

### Example

```html
<div x-dialog>
  <button x-dialog:trigger>Open Dialog</button>

  <div x-dialog:backdrop></div>

  <div x-dialog:positioner>
    <div x-dialog:content>
      <h2 x-dialog:title>Dialog Title</h2>
      <p x-dialog:description>
        This is a basic dialog example. Click outside or press Escape to close.
      </p>
      <button x-dialog:close-trigger>Close</button>
    </div>
  </div>
</div>
```

### Behavior

* Focus is trapped inside the dialog when open
* Escape closes the dialog
* Focus returns to the trigger on close
* Backdrop click closes the dialog
* Body scroll prevented when open

---

## Accessibility

Alpine Headless UI components aim to follow WAI-ARIA authoring practices:

* Correct roles (`dialog`, `menu`, `combobox`, etc.)
* Keyboard interactions matching platform expectations
* Focus management on open and close

Behavior patterns are inspired by Zag.js state machines, adapted to Alpine idioms.

You are responsible for:

* Visual focus styles
* Animations and transitions
* Layout and spacing

## Credits

Inspired by:
- [Zag.js](https://zagjs.com/) - State machine patterns for accessible components
- [alpine-zag](https://github.com/TunkShif/alpine-zag) - Alpine.js integration with Zag.js

Created by:
- [Eldo Magan](https://github.com/eldomagan)
- [All Contributors](../../contributors)

## 📄 License

This project is open-sourced under the [MIT license](./LICENSE.md).
