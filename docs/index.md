---
layout: home

hero:
  name: Alpine Headless UI
  text: Accessible UI Primitives for Alpine.js
  tagline: Unstyled, behavior-only components with correct state management, keyboard interactions, and ARIA attributes
  actions:
    - theme: brand
      text: Get Started
      link: /guide/installation
    - theme: alt
      text: View Components
      link: /components/accordion
    - theme: alt
      text: GitHub
      link: https://github.com/eldomagan/alpine-headless-ui.git

features:
  - icon: 🎨
    title: Headless Design
    details: No styles, no markup assumptions. You have complete control over your UI structure and styling.

  - icon: ♿️
    title: Accessible by Default
    details: WAI-ARIA compliant with proper keyboard interactions, focus management, and screen reader support.

  - icon: 🌲
    title: Tree-Shakeable
    details: Import only what you need. Per-component exports keep your bundle size minimal.
---

## Quick Example

```html
<div x-collapsible>
  <button x-collapsible:trigger type="button">
    Toggle Content
  </button>

  <div x-collapsible:content>
    <p>This content can be collapsed and expanded.</p>
  </div>
</div>
```

## Philosophy

Alpine Headless UI provides the **behavior and accessibility**, while you provide the **HTML structure and styling**. Each component handles:

- ✅ State management
- ✅ Keyboard interactions
- ✅ ARIA attributes
- ✅ Focus management
- ✅ Event dispatching

You control:

- 🎨 HTML markup
- 🎨 CSS styling
- 🎨 Animations and transitions
- 🎨 Layout and spacing

## Inspiration

This library is inspired by:

- [Alpine UI Components](https://alpinejs.dev/components) - Alpine.js patterns
- [Zag.js](https://zagjs.com/) - Behavior and accessibility patterns
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) - Accessibility guidelines
