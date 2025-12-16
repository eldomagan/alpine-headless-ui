# Countdown

A versatile countdown component supporting two modes: **duration-based timers** with full controls and **target date countdowns** for specific future events.

## Features

- ✅ Duration mode: Full controls (pause, resume, stop, restart)
- ✅ Target date mode: Countdown to specific future date
- ✅ Auto-start or manual start
- ✅ Separate display parts for days, hours, minutes, seconds

## Installation

```js
import Alpine from 'alpinejs'
import countdown from 'alpine-headless-ui/countdown'

Alpine.plugin(countdown)
Alpine.start()
```

## Examples

### Basic Timer

A simple 10-second timer with pause, resume, stop, and restart controls.

<ComponentExample>

<div x-countdown="{ duration: 10 }" class="space-y-4">
  <div x-countdown:display class="text-center">
    <div class="text-5xl font-bold text-gray-900 dark:text-zinc-100">
      <span x-countdown:minutes></span>
      <span x-countdown:separator>:</span>
      <span x-countdown:seconds></span>
    </div>
  </div>
  <div x-countdown:control class="flex justify-center gap-2">
    <button x-countdown:start-trigger class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 data-[state=running]:hidden data-[state=paused]:hidden data-[state=finished]:hidden">
      Start
    </button>
    <button x-countdown:action-trigger class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 data-paused:bg-green-600 data-paused:hover:bg-green-700 data-[state=idle]:hidden data-[state=finished]:hidden">
      <span x-show="!$countdown.isPaused">Pause</span>
      <span x-show="$countdown.isPaused">Resume</span>
    </button>
    <button x-countdown:stop-trigger class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 data-[state=idle]:hidden data-[state=finished]:hidden">
      Stop
    </button>
    <button x-countdown:restart-trigger class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
      Restart
    </button>
  </div>
</div>

</ComponentExample>

### Long Duration Timer

A timer with days and hours display for longer countdowns.

<ComponentExample>

<div x-countdown="{ duration: 90061 }" class="space-y-4">
  <div x-countdown:display class="text-center">
    <div class="inline-flex gap-4 text-4xl font-bold text-gray-900 dark:text-zinc-100">
      <div class="flex flex-col">
        <span x-countdown:days class="text-5xl"></span>
        <span class="text-sm font-normal text-gray-500 dark:text-zinc-400">Days</span>
      </div>
      <span x-countdown:separator class="self-start">:</span>
      <div class="flex flex-col">
        <span x-countdown:hours class="text-5xl"></span>
        <span class="text-sm font-normal text-gray-500 dark:text-zinc-400">Hours</span>
      </div>
      <span x-countdown:separator class="self-start">:</span>
      <div class="flex flex-col">
        <span x-countdown:minutes class="text-5xl"></span>
        <span class="text-sm font-normal text-gray-500 dark:text-zinc-400">Minutes</span>
      </div>
      <span x-countdown:separator class="self-start">:</span>
      <div class="flex flex-col">
        <span x-countdown:seconds class="text-5xl"></span>
        <span class="text-sm font-normal text-gray-500 dark:text-zinc-400">Seconds</span>
      </div>
    </div>
  </div>
  <div x-countdown:control class="flex justify-center gap-2">
    <button x-countdown:action-trigger class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 data-paused:bg-green-600 data-paused:hover:bg-green-700">
      <span x-show="!$countdown.isPaused">Pause</span>
      <span x-show="$countdown.isPaused">Resume</span>
    </button>
    <button x-countdown:restart-trigger class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
      Restart
    </button>
  </div>
</div>

</ComponentExample>

### Manual Start Timer

A duration timer that doesn't auto-start.

<ComponentExample>

<div x-countdown="{ duration: 30, autoStart: false }" class="space-y-4">
  <div x-countdown:display class="text-center">
    <div class="text-5xl font-bold text-gray-900 dark:text-zinc-100">
      <span x-countdown:minutes></span>
      <span x-countdown:separator>:</span>
      <span x-countdown:seconds></span>
    </div>
  </div>
  <div x-countdown:control class="flex justify-center gap-2">
    <button x-countdown:start-trigger class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
      Start
    </button>
    <button x-countdown:action-trigger class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 data-paused:bg-green-600 data-paused:hover:bg-green-700 data-finished:hidden">
      <span x-show="!$countdown.isPaused">Pause</span>
      <span x-show="$countdown.isPaused">Resume</span>
    </button>
    <button x-countdown:stop-trigger class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
      Stop
    </button>
    <button x-countdown:restart-trigger class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
      Restart
    </button>
  </div>
</div>

</ComponentExample>

### With Complete Event

<ComponentExample>

<div x-countdown="{ duration: 5 }" class="space-y-4">
  <div x-countdown:display class="text-center">
    <div class="text-5xl font-bold text-gray-900 dark:text-zinc-100 data-finished:text-green-600 dark:data-finished:text-green-400">
      <span x-show="!$countdown.isFinished">
        <span x-countdown:minutes></span>
        <span x-countdown:separator>:</span>
        <span x-countdown:seconds></span>
      </span>
      <span x-show="$countdown.isFinished">Complete!</span>
    </div>
  </div>
  <div x-countdown:control class="flex justify-center gap-2">
    <button x-countdown:restart-trigger class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
      Restart (5s)
    </button>
  </div>
</div>

</ComponentExample>

### Target Date Countdown

Countdown to a specific future date. No pause/resume/stop controls since you can't pause real time.

<ComponentExample>

<div x-countdown="{ targetDate: Date.now() + 90061000 }" class="space-y-4">
  <div x-countdown:display class="text-center">
    <div class="inline-flex gap-4 text-4xl font-bold text-gray-900 dark:text-zinc-100">
      <div class="flex flex-col">
        <span x-countdown:days class="text-5xl"></span>
        <span class="text-sm font-normal text-gray-500 dark:text-zinc-400">Days</span>
      </div>
      <span x-countdown:separator class="self-start">:</span>
      <div class="flex flex-col">
        <span x-countdown:hours class="text-5xl"></span>
        <span class="text-sm font-normal text-gray-500 dark:text-zinc-400">Hours</span>
      </div>
      <span x-countdown:separator class="self-start">:</span>
      <div class="flex flex-col">
        <span x-countdown:minutes class="text-5xl"></span>
        <span class="text-sm font-normal text-gray-500 dark:text-zinc-400">Minutes</span>
      </div>
      <span x-countdown:separator class="self-start">:</span>
      <div class="flex flex-col">
        <span x-countdown:seconds class="text-5xl"></span>
        <span class="text-sm font-normal text-gray-500 dark:text-zinc-400">Seconds</span>
      </div>
    </div>
  </div>
  <div x-countdown:control class="flex justify-center">
    <button x-countdown:restart-trigger class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
      Refresh
    </button>
  </div>
</div>

</ComponentExample>

## API Reference

### Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `duration` | `number` | - | Duration in seconds for timer mode (enables full controls) |
| `targetDate` | `string \| number \| Date` | - | Target date for countdown mode |
| `autoStart` | `boolean` | `true` | Start countdown automatically |

**Note:** Provide either `duration` OR `targetDate`, not both. If neither is provided, defaults to a 10-second timer.

```html
<!-- Duration timer mode (with full controls) -->
<div x-countdown="{ duration: 60, autoStart: true }">
  <!-- Parts -->
</div>

<!-- Target date mode -->
<div x-countdown="{ targetDate: '2026-01-01T00:00:00' }">
  <!-- Parts -->
</div>

<!-- Target date as timestamp -->
<div x-countdown="{ targetDate: Date.now() + 3600000 }">
  <!-- 1 hour from now -->
</div>
```

### Parts

| Part | Description |
|------|-------------|
| `x-countdown` | Root container element |
| `x-countdown:display` | Container for the countdown display |
| `x-countdown:days` | Displays days remaining |
| `x-countdown:hours` | Displays hours remaining (00-23) |
| `x-countdown:minutes` | Displays minutes remaining (00-59) |
| `x-countdown:seconds` | Displays seconds remaining (00-59) |
| `x-countdown:separator` | Optional separator between time units |
| `x-countdown:control` | Container for countdown controls |
| `x-countdown:start-trigger` | Button that starts the countdown |
| `x-countdown:action-trigger` | Button that toggles pause/resume |
| `x-countdown:stop-trigger` | Button that stops the countdown |
| `x-countdown:restart-trigger` | Button that restarts the countdown |

#### `x-countdown:display`

Container for the countdown display.

**Automatically receives:**
- `data-state` - Current state: `idle`, `running`, `paused`, or `finished`
- `data-paused` - Present when paused (empty string value)
- `data-finished` - Present when finished (empty string value)

```html
<div x-countdown:display>
  <!-- Time parts -->
</div>

<!-- Style based on state -->
<div x-countdown:display class="data-[state=running]:animate-pulse data-[state=finished]:text-green-600">
  <!-- Time parts -->
</div>
```

#### `x-countdown:days`

Displays the days remaining.

**Automatically receives:**
- Bound value showing days

```html
<span x-countdown:days></span>
```

#### `x-countdown:hours`

Displays the hours remaining (00-23, zero-padded).

**Automatically receives:**
- Bound value showing hours

```html
<span x-countdown:hours></span>
```

#### `x-countdown:minutes`

Displays the minutes remaining (00-59, zero-padded).

**Automatically receives:**
- Bound value showing minutes

```html
<span x-countdown:minutes></span>
```

#### `x-countdown:seconds`

Displays the seconds remaining (00-59, zero-padded).

**Automatically receives:**
- Bound value showing seconds

```html
<span x-countdown:seconds></span>
```

#### `x-countdown:separator`

Optional separator between time units (e.g., ":\").

```html
<span x-countdown:separator>:</span>
```

#### `x-countdown:control`

Container for countdown controls.

**Automatically receives:**
- `data-state` - Current state: `idle`, `running`, `paused`, or `finished`
- `data-paused` - Present when paused (empty string value)
- `data-finished` - Present when finished (empty string value)

```html
<div x-countdown:control>
  <!-- Control buttons -->
</div>
```

#### `x-countdown:start-trigger`

Button that starts the countdown.

**Automatically receives:**
- `type="button"`
- `data-state` - Current state
- Click handler to start

```html
<button x-countdown:start-trigger>Start</button>

<!-- Hide when running/paused/finished -->
<button x-countdown:start-trigger class="data-[state=running]:hidden data-[state=paused]:hidden data-[state=finished]:hidden">
  Start
</button>
```

#### `x-countdown:action-trigger`

Button that toggles between pause and resume.

**Automatically receives:**
- `type="button"`
- `data-state` - Current state
- `data-paused` - Present when paused (empty string value)
- `data-finished` - Present when finished (empty string value)
- Click handler to pause/resume

```html
<button x-countdown:action-trigger>
  <span x-show="!$countdown.isPaused">Pause</span>
  <span x-show="$countdown.isPaused">Resume</span>
</button>

<!-- Hide when idle/finished -->
<button x-countdown:action-trigger class="data-[state=idle]:hidden data-[state=finished]:hidden">
  Pause/Resume
</button>
```

#### `x-countdown:stop-trigger`

Button that stops the countdown (duration mode only).

**Automatically receives:**
- `type="button"`
- `data-state` - Current state
- `data-finished` - Present when finished (empty string value)
- Click handler to stop

```html
<button x-countdown:stop-trigger>Stop</button>
```

#### `x-countdown:restart-trigger`

Button that restarts the countdown.

**Automatically receives:**
- `type="button"`
- `data-state` - Current state
- Click handler to restart

```html
<button x-countdown:restart-trigger>Restart</button>
```

### Data Attributes

| Attribute | Values | Description |
|-----------|--------|-------------|
| `data-state` | `idle`, `running`, `paused`, `finished` | Current countdown state on all parts |
| `data-paused` | Present when paused | Available on root, display, control, action-trigger |
| `data-finished` | Present when finished | Available on root, display, control, action-trigger, stop-trigger |

**Usage:**
```html
<!-- Style based on state -->
<div x-countdown:display class="
  data-[state=idle]:opacity-50
  data-[state=running]:animate-pulse
  data-[state=paused]:text-yellow-600
  data-[state=finished]:text-green-600
">
  <span x-countdown:minutes></span>:<span x-countdown:seconds></span>
</div>

<!-- Conditionally show/hide buttons -->
<button x-countdown:start-trigger class="data-[state=running]:hidden data-[state=paused]:hidden">
  Start
</button>

<div x-countdown:control class="data-paused:bg-yellow-50">
  <!-- Controls -->
</div>

<button x-countdown:action-trigger class="data-finished:hidden">
  Pause
</button>
```

### Events

| Event | Description |
|-------|-------------|
| `start` | Dispatched when countdown starts |
| `pause` | Dispatched when countdown is paused |
| `resume` | Dispatched when countdown resumes |
| `stop` | Dispatched when countdown stops |
| `restart` | Dispatched when countdown restarts |
| `complete` | Dispatched when countdown reaches zero |

```html
<div x-countdown
  x-on:start="console.log('Started')"
  x-on:pause="console.log('Paused')"
  x-on:resume="console.log('Resumed')"
  x-on:stop="console.log('Stopped')"
  x-on:restart="console.log('Restarted')"
  x-on:complete="alert('Time is up!')">
  <!-- Parts -->
</div>
```

### Accessing State

You can access the countdown API using `$countdown`:

```html
<div x-countdown="{ duration: 60 }">
  <div x-data>
    <p x-show="$countdown.isPaused">Timer is paused</p>
    <p x-show="$countdown.isFinished">Timer is finished!</p>
    <p x-text="'Time remaining: ' + $countdown.formatTime()"></p>
  </div>

  <button x-countdown:action-trigger>Toggle</button>
</div>
```

**Available properties:**
- `state` - Current state: `'idle'` | `'running'` | `'paused'` | `'finished'`
- `isTargetDateMode` - Whether in target date mode (true) or duration mode (false)
- `duration` - Initial duration in seconds (duration mode only)
- `targetDate` - Target timestamp in milliseconds (target date mode only)
- `remaining` - Current remaining seconds
- `days` - Days remaining
- `hours` - Hours remaining (0-23)
- `minutes` - Minutes remaining (0-59)
- `seconds` - Seconds remaining (0-59)
- `isPaused` - Whether countdown is paused (getter based on `state === 'paused'`)
- `isFinished` - Whether countdown is finished (getter based on `state === 'finished'`)
- `formatTime()` - Get formatted time string

**Available methods (duration mode only):**
- `start()` - Start the countdown
- `pause()` - Pause the countdown (preserves remaining time)
- `resume()` - Resume the countdown (continues from where paused)
- `stop()` - Stop and reset the countdown to initial duration
- `setDuration(seconds)` - Update the duration

**Available methods (target date mode only):**
- `start()` - Start the countdown
- `setTargetDate(date)` - Update the target date

**Available methods (both modes):**
- `restart()` - Restart the countdown (duration mode: reset to initial, target date mode: recalculate from now)
- `formatTime()` - Get formatted time string

## Accessibility

### Best Practices

- Use `aria-live="polite"` for screen reader announcements
- Provide visual and auditory feedback when countdown completes
- Ensure control buttons are keyboard accessible
- Consider adding labels for control buttons

### Example with ARIA

```html
<div x-countdown="{ duration: 60 }">
  <div role="timer" aria-live="polite" x-countdown:display>
    <span x-countdown:minutes></span>:<span x-countdown:seconds></span>
  </div>

  <button x-countdown:action-trigger aria-label="Pause timer">
    Pause
  </button>
</div>
```

## See Also

- [Clipboard](/components/clipboard) - Copy content with visual feedback
- [Collapsible](/components/collapsible) - Show/hide content with transitions
