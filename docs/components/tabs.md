# Tabs

An accessible tabs component for organizing content into multiple panels.

## Basic Usage

<ComponentExample>

<div x-tabs="{ value: 'tab1' }">
  <div x-tabs:list class="flex border-b border-gray-200 dark:border-zinc-700">
    <button x-tabs:trigger="'tab1'" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 dark:data-[state=active]:border-blue-400">
        Account
      </button>
    <button x-tabs:trigger="'tab2'" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 dark:data-[state=active]:border-blue-400">
        Password
      </button>
    <button x-tabs:trigger="'tab3'" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 dark:data-[state=active]:border-blue-400">
        Notifications
      </button>
  </div>

  <div class="mt-4">
    <div x-tabs:content="'tab1'" class="p-4 text-sm text-gray-700 dark:text-zinc-300">
        <h3 class="font-semibold mb-2">Account Settings</h3>
        <p>Manage your account details and preferences here.</p>
      </div>
    <div x-tabs:content="'tab2'" class="p-4 text-sm text-gray-700 dark:text-zinc-300">
        <h3 class="font-semibold mb-2">Password Settings</h3>
        <p>Change your password and security options.</p>
      </div>
    <div x-tabs:content="'tab3'" class="p-4 text-sm text-gray-700 dark:text-zinc-300">
        <h3 class="font-semibold mb-2">Notification Preferences</h3>
        <p>Configure how you receive notifications.</p>
      </div>
  </div>
</div>

</ComponentExample>

## Vertical Tabs

<ComponentExample>

<div x-tabs="{ value: 'profile', orientation: 'vertical' }" class="flex gap-4">
  <div x-tabs:list class="flex flex-col border-r border-gray-200 dark:border-zinc-700 min-w-40">
    <button x-tabs:trigger="'profile'" class="px-4 py-2 text-sm font-medium text-left text-gray-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:border-r-2 data-[state=active]:border-blue-600 dark:data-[state=active]:border-blue-400 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-zinc-800 w-full">
        Profile
      </button>
    <button x-tabs:trigger="'billing'" class="px-4 py-2 text-sm font-medium text-left text-gray-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:border-r-2 data-[state=active]:border-blue-600 dark:data-[state=active]:border-blue-400 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-zinc-800 w-full">
        Billing
      </button>
    <button x-tabs:trigger="'team'" class="px-4 py-2 text-sm font-medium text-left text-gray-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:border-r-2 data-[state=active]:border-blue-600 dark:data-[state=active]:border-blue-400 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-zinc-800 w-full">
        Team
      </button>
  </div>

  <div class="flex-1">
    <div x-tabs:content="'profile'" class="p-4 text-sm text-gray-700 dark:text-zinc-300">
        <h3 class="font-semibold mb-2">Profile Information</h3>
        <p>Update your personal information and profile photo.</p>
      </div>
    <div x-tabs:content="'billing'" class="p-4 text-sm text-gray-700 dark:text-zinc-300">
        <h3 class="font-semibold mb-2">Billing Information</h3>
        <p>Manage your subscription and payment methods.</p>
      </div>
    <div x-tabs:content="'team'" class="p-4 text-sm text-gray-700 dark:text-zinc-300">
        <h3 class="font-semibold mb-2">Team Management</h3>
        <p>Invite team members and manage permissions.</p>
      </div>
  </div>
</div>

</ComponentExample>

## Manual Activation

Use `activationMode: 'manual'` to require explicit activation with Enter or click.

<ComponentExample>

<div x-tabs="{ value: 'overview', activationMode: 'manual' }">
  <div x-tabs:list class="flex border-b border-gray-200 dark:border-zinc-700">
    <button x-tabs:trigger="'overview'" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 dark:data-[state=active]:border-blue-400">
        Overview
      </button>
    <button x-tabs:trigger="'analytics'" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 dark:data-[state=active]:border-blue-400">
        Analytics
      </button>
    <button x-tabs:trigger="'reports'" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 dark:data-[state=active]:border-blue-400">
        Reports
      </button>
  </div>

  <div class="mt-4">
    <div x-tabs:content="'overview'" class="p-4 text-sm text-gray-700 dark:text-zinc-300">
        <p>Overview content - Press Enter to activate tabs with keyboard.</p>
      </div>
    <div x-tabs:content="'analytics'" class="p-4 text-sm text-gray-700 dark:text-zinc-300">
        <p>Analytics content - Use arrow keys to navigate, Enter to select.</p>
      </div>
    <div x-tabs:content="'reports'" class="p-4 text-sm text-gray-700 dark:text-zinc-300">
        <p>Reports content - Manual activation prevents accidental switching.</p>
      </div>
  </div>
</div>

</ComponentExample>

## With x-model

<ComponentExample>

<div x-data="{ activeTab: 'home' }">
  <div x-tabs x-model="activeTab">
    <div x-tabs:list class="flex border-b border-gray-200 dark:border-zinc-700">
      <button x-tabs:trigger="'home'" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 dark:data-[state=active]:border-blue-400">
        Home
      </button>
      <button x-tabs:trigger="'about'" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 dark:data-[state=active]:border-blue-400">
        About
      </button>
      <button x-tabs:trigger="'contact'" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 dark:data-[state=active]:border-blue-400">
        Contact
      </button>
    </div>
    <div class="mt-4">
      <div x-tabs:content="'home'" class="p-4 text-sm text-gray-700 dark:text-zinc-300">
        <p>Home content</p>
      </div>
      <div x-tabs:content="'about'" class="p-4 text-sm text-gray-700 dark:text-zinc-300">
        <p>About content</p>
      </div>
      <div x-tabs:content="'contact'" class="p-4 text-sm text-gray-700 dark:text-zinc-300">
        <p>Contact content</p>
      </div>
    </div>
  </div>

  <p class="mt-4 text-sm text-gray-600 dark:text-zinc-400">
    Active tab: <span x-text="activeTab" class="font-mono font-semibold"></span>
  </p>
</div>

</ComponentExample>

## Disabled State

<ComponentExample>

<div x-tabs="{ value: 'general', disabled: true }">
  <div x-tabs:list class="flex border-b border-gray-200 dark:border-zinc-700 opacity-50 cursor-not-allowed">
    <button x-tabs:trigger="'general'" class="px-4 py-2 text-sm font-medium text-gray-700 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 dark:data-[state=active]:border-blue-400">
        General
      </button>
    <button x-tabs:trigger="'advanced'" class="px-4 py-2 text-sm font-medium text-gray-700">
        Advanced
      </button>
  </div>

  <div class="mt-4 opacity-50">
    <div x-tabs:content="'general'" class="p-4 text-sm text-gray-700 dark:text-zinc-300">
        <p>General settings (disabled)</p>
      </div>
    <div x-tabs:content="'advanced'" class="p-4 text-sm text-gray-700 dark:text-zinc-300">
        <p>Advanced settings (disabled)</p>
      </div>
  </div>
</div>

</ComponentExample>

## With Change Event

<ComponentExample>

<div x-data="{ message: '' }">
  <div x-tabs="{ value: 'tab1' }" x-on:change="message = `Switched to: ${$event.detail.value}`">
    <div x-tabs:list class="flex border-b border-gray-200 dark:border-zinc-700">
      <button x-tabs:trigger="'tab1'" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 dark:data-[state=active]:border-blue-400">
          Tab 1
        </button>
      <button x-tabs:trigger="'tab2'" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 dark:data-[state=active]:border-blue-400">
          Tab 2
        </button>
      <button x-tabs:trigger="'tab3'" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 dark:data-[state=active]:border-blue-400">
          Tab 3
        </button>
    </div>
    <div class="mt-4">
      <div x-tabs:content="'tab1'" class="p-4 text-sm text-gray-700 dark:text-zinc-300">
          <p>Content 1</p>
        </div>
      <div x-tabs:content="'tab2'" class="p-4 text-sm text-gray-700 dark:text-zinc-300">
          <p>Content 2</p>
        </div>
      <div x-tabs:content="'tab3'" class="p-4 text-sm text-gray-700 dark:text-zinc-300">
          <p>Content 3</p>
        </div>
    </div>
  </div>

  <p class="mt-4 text-sm text-gray-600 dark:text-zinc-400" x-text="message"></p>
</div>

</ComponentExample>

## API Reference

### Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | ID of the active tab |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Tab list orientation |
| `activationMode` | `'automatic' \| 'manual'` | `'automatic'` | How tabs are activated (on focus or on click/enter) |
| `disabled` | `boolean` | `false` | Whether the tabs are disabled |
| `loop` | `boolean` | `true` | Whether arrow key navigation loops around |

### Parts

| Part | Description |
|------|-------------|
| `x-tabs:root` | Root container element |
| `x-tabs:list` | Tab list container (role="tablist") |
| `x-tabs:trigger="id"` | Tab button (role="tab") with tab ID |
| `x-tabs:content="id"` | Tab panel content (role="tabpanel") with tab ID |
| `x-tabs:indicator` | Optional visual indicator element |

### Data Attributes

| Attribute | Description |
|-----------|-------------|
| `data-disabled` | Present when tabs are disabled |
| `data-orientation` | Current orientation (`horizontal` or `vertical`) |
| `data-state` | Tab state (`active` or `inactive`) on trigger and content |
| `data-value` | Tab ID on trigger and content elements |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `change` | `{ value }` | Fired when active tab changes |

### Keyboard Interactions

| Key | Description |
|-----|-------------|
| `Tab` | Move focus into/out of tab list |
| `ArrowRight` / `ArrowDown` | Move to next tab |
| `ArrowLeft` / `ArrowUp` | Move to previous tab |
| `Home` | Move to first tab |
| `End` | Move to last tab |
| `Enter` / `Space` | Activate focused tab (in manual mode) |

## Accessibility

This component follows the [WAI-ARIA Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/):

- Uses `role="tablist"`, `role="tab"`, and `role="tabpanel"`
- Provides `aria-selected`, `aria-controls`, and `aria-labelledby` attributes
- Implements all required keyboard interactions
- Only the active tab is in the focus order (`tabindex="0"`)
- Content panels are properly linked to their tabs

## Styling

The tabs component is completely unstyled by default. Use data attributes to style different states:

```css
/* Active tab */
[data-part="trigger"][data-state="active"] {
  /* Active tab styles */
}

/* Inactive tab */
[data-part="trigger"][data-state="inactive"] {
  /* Inactive tab styles */
}

/* Tab content */
[data-part="content"][data-state="active"] {
  /* Visible content styles */
}

/* Vertical orientation */
[data-orientation="vertical"] [data-part="list"] {
  /* Vertical tab list styles */
}
```

## Tips

- Each trigger and content must specify the same tab ID (e.g., `x-tabs:trigger="'tab1'"` and `x-tabs:content="'tab1'"`)
- Triggers should be placed inside `x-tabs:list` for proper keyboard navigation
- Content elements can be placed anywhere in the component
- Use `data-state="active"` attribute selector for styling active tabs
- Set `activationMode: 'manual'` for tabs with potentially expensive content loading
- The `loop` prop controls whether arrow key navigation wraps around
- Content panels are hidden with the `hidden` attribute when inactive
