# Clipboard

A component that allows users to quickly copy text content to their clipboard with visual feedback.

## Features

- ✅ One-click copy to clipboard
- ✅ Visual feedback with data attributes
- ✅ Optional input field for displaying content
- ✅ Accessible ARIA attributes

## Installation

```js
import Alpine from 'alpinejs'
import clipboard from 'alpine-headless-ui/clipboard'

Alpine.plugin(clipboard)
Alpine.start()
```

## Examples

### Basic Clipboard

<ComponentExample>

<div x-clipboard="{ value: 'Hello, World!' }" class="flex items-center gap-2">
  <button x-clipboard:trigger class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 data-copied:bg-green-600">
    <span x-show="!$clipboard.copied">Copy</span>
    <span x-show="$clipboard.copied">Copied!</span>
  </button>
</div>

</ComponentExample>

### With Input Field

<ComponentExample>

<div x-clipboard="{ value: 'https://github.com/eldomagan/alpine-headless-ui' }" class="space-y-2">
  <label x-clipboard:label class="block text-sm font-medium text-gray-700 dark:text-zinc-300">
    Repository URL
  </label>
  <div x-clipboard:control class="flex gap-2">
    <input x-clipboard:input class="flex-1 px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-900 text-gray-900 dark:text-zinc-100" />
    <button x-clipboard:trigger class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 data-copied:bg-green-600 transition-colors">
      <span x-show="!$clipboard.copied">Copy</span>
      <span x-show="$clipboard.copied">Copied!</span>
    </button>
  </div>
</div>

</ComponentExample>

### With Icon Indicator

<ComponentExample>

<div x-clipboard="{ value: 'npm install alpine-headless-ui' }" class="space-y-2">
  <label x-clipboard:label class="block text-sm font-medium text-gray-700 dark:text-zinc-300">
    Installation Command
  </label>
  <div x-clipboard:control class="flex gap-2">
    <input x-clipboard:input class="flex-1 px-3 py-2 border border-gray-300 dark:border-zinc-700 rounded bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-zinc-100 font-mono text-sm" />
    <button x-clipboard:trigger class="px-4 py-2 bg-gray-800 dark:bg-zinc-700 text-white rounded hover:bg-gray-900 dark:hover:bg-zinc-600 data-copied:bg-green-600 transition-colors flex items-center gap-2">
      <svg x-show="!$clipboard.copied" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
      <svg x-clipboard:indicator class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <span x-show="!$clipboard.copied">Copy</span>
      <span x-clipboard:indicator class="text-sm">Copied!</span>
    </button>
  </div>
</div>

</ComponentExample>

### Custom Timeout

<ComponentExample>

<div x-clipboard="{ value: 'Custom timeout example', timeout: 1000 }" class="flex items-center gap-2">
  <button x-clipboard:trigger class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 data-copied:bg-green-600 transition-colors">
    <span x-show="!$clipboard.copied">Copy (1s timeout)</span>
    <span x-show="$clipboard.copied">Copied!</span>
  </button>
</div>

</ComponentExample>

### Code Snippet

<ComponentExample>

<div x-clipboard="{ value: 'function greet() { return &quot;Hello&quot;; }' }" class="border border-gray-300 dark:border-zinc-700 rounded-lg overflow-hidden">
  <div class="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-zinc-800 border-b border-gray-300 dark:border-zinc-700">
    <span class="text-sm font-medium text-gray-700 dark:text-zinc-300">JavaScript</span>
    <button x-clipboard:trigger class="px-3 py-1 text-sm bg-white dark:bg-zinc-700 text-gray-700 dark:text-zinc-300 border border-gray-300 dark:border-zinc-600 rounded hover:bg-gray-50 dark:hover:bg-zinc-600 data-copied:bg-green-50 dark:data-copied:bg-green-900 data-copied:text-green-700 dark:data-copied:text-green-300 data-copied:border-green-300 dark:data-copied:border-green-700 transition-colors">
      <span x-show="!$clipboard.copied">Copy</span>
      <span x-show="$clipboard.copied">Copied!</span>
    </button>
  </div>
  <pre class="px-4 py-3 bg-white dark:bg-zinc-900"><code class="text-sm font-mono text-gray-900 dark:text-zinc-100" x-text="$clipboard.value"></code></pre>
</div>

</ComponentExample>

## API Reference

### Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | The text to copy to clipboard |
| `timeout` | `number` | `3000` | Duration in milliseconds before resetting copied state |

### Parts

| Part | Description |
|------|-------------|
| `x-clipboard:label` | Label for the clipboard content |
| `x-clipboard:control` | Container for input and trigger button |
| `x-clipboard:trigger` | Button that triggers the copy action |
| `x-clipboard:input` | Input field displaying the text to be copied |
| `x-clipboard:indicator` | Optional indicator shown when content is copied |

### Data Attributes

| Attribute | Description |
|-----------|-------------|
| `data-scope` | Always set to `clipboard` |
| `data-part` | Identifies the part (`root`, `label`, `control`, `trigger`, `input`, `indicator`) |
| `data-copied` | Present when text has been copied |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `copy` | `{ value: string, copied: boolean }` | Fired when text is successfully copied |
| `copy-error` | `{ error: Error }` | Fired when clipboard copy fails |

## Accessing State

You can access the clipboard API using `$clipboard`:

```html
<div x-clipboard>
  <div x-data>
    <p x-text="$clipboard.copied ? 'Copied!' : 'Not copied'"></p>
  </div>
  <button x-clipboard:trigger>
  <!-- Parts -->
</div>
```

### Accessing State

You can access the clipboard API using `$clipboard`:

```html
<div x-clipboard="{ value: 'Hello' }">
  <div x-data>
    <p x-show="$clipboard.copied">Text copied!</p>
    <p x-text="$clipboard.value"></p>
  </div>

  <button x-clipboard:trigger>Copy</button>
</div>
```

**Available properties:**
- `value` - The text to copy
- `copied` - Whether text was recently copied
- `timeout` - Timeout duration in ms
- `setValue(value)` - Update the text value
- `copy()` - Trigger copy action programmatically

## Accessibility

### Best Practices

- Use descriptive labels for clipboard triggers
- Provide visual feedback when content is copied
- Consider using ARIA live regions for screen reader announcements
- Ensure keyboard accessibility for trigger buttons

### Example with ARIA Live Region

```html
<div x-clipboard="{ value: 'Text to copy' }">
  <button x-clipboard:trigger>Copy</button>

  <div role="status" aria-live="polite" aria-atomic="true">
    <span x-show="$clipboard.copied">Copied to clipboard</span>
  </div>
</div>
```

## Browser Support

The clipboard component uses the modern [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API). It requires:

- HTTPS (or localhost for development)
- Modern browsers with Clipboard API support
- User permission for clipboard access (automatic in most browsers)

### Fallback

For older browsers, consider providing alternative copy methods or displaying the text for manual copying.

## See Also

- [Popover](/components/popover) - Show helpful hints or feedback for clipboard buttons
- [Collapsible](/components/collapsible) - Show/hide additional information
