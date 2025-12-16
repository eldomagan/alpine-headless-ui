# Marquee

Infinite scrolling marquee with smooth animations and user controls.

## Features

- ✅ Infinite horizontal or vertical scrolling
- ✅ Auto-fill content duplication for seamless loop
- ✅ Configurable speed and direction
- ✅ Pause on hover or focus
- ✅ Manual play/pause controls
- ✅ Respects `prefers-reduced-motion`
- ✅ GPU-accelerated CSS animations
- ✅ RTL support

::: warning Accessibility
Marquees can be distracting for users with attention deficits or cognitive disabilities. Use them sparingly and primarily for decorative content. Always provide pause controls and respect user motion preferences.
:::

## Required CSS

Add these styles to your stylesheet (one time setup):

```css
/* Keyframe animations */
@keyframes marqueeX {
  to { transform: translateX(var(--marquee-translate)); }
}

@keyframes marqueeY {
  to { transform: translateY(var(--marquee-translate)); }
}

/* Base animation styles */
[data-scope="marquee"][data-part="content"] {
  animation-duration: var(--marquee-duration);
  animation-iteration-count: var(--marquee-loop-count);
}

/* Apply horizontal animation */
[data-part="content"][data-side="start"],
[data-part="content"][data-side="end"] {
  animation-name: marqueeX;
}

/* Apply vertical animation */
[data-part="content"][data-side="top"],
[data-part="content"][data-side="bottom"] {
  animation-name: marqueeY;
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  [data-part="content"] {
    animation: none !important;
  }
}
```

::: tip CSS Variables
The component automatically sets `--marquee-duration` based on your `speed` prop. The marquee uses `contentCount` to determine how many content tracks to render for seamless looping.
:::

## Basic Usage

<ComponentExample>

<div x-marquee class="w-full">
  <div x-marquee:viewport class="overflow-hidden flex flex-row py-4">
    <div x-marquee:content class="flex flex-row shrink-0">
      <span class="mx-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded-lg shrink-0">Item 1</span>
      <span class="mx-2 px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100 rounded-lg shrink-0">Item 2</span>
      <span class="mx-2 px-4 py-2 bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 rounded-lg shrink-0">Item 3</span>
      <span class="mx-2 px-4 py-2 bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100 rounded-lg shrink-0">Item 4</span>
    </div>
    <div x-marquee:content class="flex flex-row shrink-0" aria-hidden="true">
      <span class="mx-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded-lg shrink-0">Item 1</span>
      <span class="mx-2 px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100 rounded-lg shrink-0">Item 2</span>
      <span class="mx-2 px-4 py-2 bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 rounded-lg shrink-0">Item 3</span>
      <span class="mx-2 px-4 py-2 bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100 rounded-lg shrink-0">Item 4</span>
    </div>
    <div x-marquee:content class="flex flex-row shrink-0" aria-hidden="true">
      <span class="mx-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded-lg shrink-0">Item 1</span>
      <span class="mx-2 px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100 rounded-lg shrink-0">Item 2</span>
      <span class="mx-2 px-4 py-2 bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 rounded-lg shrink-0">Item 3</span>
      <span class="mx-2 px-4 py-2 bg-orange-100 dark:bg-orange-900 text-orange-100 rounded-lg shrink-0">Item 4</span>
    </div>
    <div x-marquee:content class="flex flex-row shrink-0" aria-hidden="true">
      <span class="mx-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded-lg shrink-0">Item 1</span>
      <span class="mx-2 px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100 rounded-lg shrink-0">Item 2</span>
      <span class="mx-2 px-4 py-2 bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 rounded-lg shrink-0">Item 3</span>
      <span class="mx-2 px-4 py-2 bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100 rounded-lg shrink-0">Item 4</span>
    </div>
  </div>
</div>

</ComponentExample>

## With Manual Controls

<ComponentExample>

<div x-marquee class="w-full">
  <div class="flex items-center gap-4 mb-4">
    <button x-marquee:control class="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600">
      <span x-show="$marquee.isPlaying">Pause</span>
      <span x-show="$marquee.isPaused">Play</span>
    </button>
    <span class="text-sm text-gray-600 dark:text-zinc-400" x-text="$marquee.state === 'playing' ? 'Playing' : 'Paused'"></span>
  </div>
  <div x-marquee:viewport class="overflow-hidden flex flex-row py-4">
    <div x-marquee:content class="flex flex-row shrink-0">
      <span class="mx-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100 rounded-lg shrink-0">News 1</span>
      <span class="mx-2 px-4 py-2 bg-pink-100 dark:bg-pink-900 text-pink-900 dark:text-pink-100 rounded-lg shrink-0">News 2</span>
      <span class="mx-2 px-4 py-2 bg-teal-100 dark:bg-teal-900 text-teal-900 dark:text-teal-100 rounded-lg shrink-0">News 3</span>
    </div>
    <div x-marquee:content class="flex flex-row shrink-0" aria-hidden="true">
      <span class="mx-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100 rounded-lg shrink-0">News 1</span>
      <span class="mx-2 px-4 py-2 bg-pink-100 dark:bg-pink-900 text-pink-900 dark:text-pink-100 rounded-lg shrink-0">News 2</span>
      <span class="mx-2 px-4 py-2 bg-teal-100 dark:bg-teal-900 text-teal-900 dark:text-teal-100 rounded-lg shrink-0">News 3</span>
    </div>
    <div x-marquee:content class="flex flex-row shrink-0" aria-hidden="true">
      <span class="mx-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100 rounded-lg shrink-0">News 1</span>
      <span class="mx-2 px-4 py-2 bg-pink-100 dark:bg-pink-900 text-pink-900 dark:text-pink-100 rounded-lg shrink-0">News 2</span>
      <span class="mx-2 px-4 py-2 bg-teal-100 dark:bg-teal-900 text-teal-900 dark:text-teal-100 rounded-lg shrink-0">News 3</span>
    </div>
    <div x-marquee:content class="flex flex-row shrink-0" aria-hidden="true">
      <span class="mx-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100 rounded-lg shrink-0">News 1</span>
      <span class="mx-2 px-4 py-2 bg-pink-100 dark:bg-pink-900 text-pink-900 dark:text-pink-100 rounded-lg shrink-0">News 2</span>
      <span class="mx-2 px-4 py-2 bg-teal-100 dark:bg-teal-900 text-teal-900 dark:text-teal-100 rounded-lg shrink-0">News 3</span>
    </div>
  </div>
</div>

</ComponentExample>

## Custom Speed

<ComponentExample>

<div x-marquee="{ speed: 100 }" class="w-full">
  <div x-marquee:viewport class="overflow-hidden flex flex-row py-4">
    <div x-marquee:content class="flex flex-row shrink-0">
      <span class="mx-2 px-4 py-2 bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 rounded-lg shrink-0">Fast Item 1</span>
      <span class="mx-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100 rounded-lg shrink-0">Fast Item 2</span>
      <span class="mx-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900 text-cyan-900 dark:text-cyan-100 rounded-lg shrink-0">Fast Item 3</span>
    </div>
    <div x-marquee:content class="flex flex-row shrink-0" aria-hidden="true">
      <span class="mx-2 px-4 py-2 bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 rounded-lg shrink-0">Fast Item 1</span>
      <span class="mx-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100 rounded-lg shrink-0">Fast Item 2</span>
      <span class="mx-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900 text-cyan-900 dark:text-cyan-100 rounded-lg shrink-0">Fast Item 3</span>
    </div>
    <div x-marquee:content class="flex flex-row shrink-0" aria-hidden="true">
      <span class="mx-2 px-4 py-2 bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 rounded-lg shrink-0">Fast Item 1</span>
      <span class="mx-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100 rounded-lg shrink-0">Fast Item 2</span>
      <span class="mx-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900 text-cyan-900 dark:text-cyan-100 rounded-lg shrink-0">Fast Item 3</span>
    </div>
    <div x-marquee:content class="flex flex-row shrink-0" aria-hidden="true">
      <span class="mx-2 px-4 py-2 bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 rounded-lg shrink-0">Fast Item 1</span>
      <span class="mx-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100 rounded-lg shrink-0">Fast Item 2</span>
      <span class="mx-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900 text-cyan-900 dark:text-cyan-100 rounded-lg shrink-0">Fast Item 3</span>
    </div>
  </div>
</div>

</ComponentExample>

## Reverse Direction

<ComponentExample>

<div x-marquee="{ reverse: true }" class="w-full">
  <div x-marquee:viewport class="overflow-hidden flex flex-row py-4">
    <div x-marquee:content class="flex flex-row shrink-0">
      <span class="mx-2 px-4 py-2 bg-violet-100 dark:bg-violet-900 text-violet-900 dark:text-violet-100 rounded-lg shrink-0">← Item 1</span>
      <span class="mx-2 px-4 py-2 bg-fuchsia-100 dark:bg-fuchsia-900 text-fuchsia-900 dark:text-fuchsia-100 rounded-lg shrink-0">← Item 2</span>
      <span class="mx-2 px-4 py-2 bg-rose-100 dark:bg-rose-900 text-rose-900 dark:text-rose-100 rounded-lg shrink-0">← Item 3</span>
    </div>
    <div x-marquee:content class="flex flex-row shrink-0" aria-hidden="true">
      <span class="mx-2 px-4 py-2 bg-violet-100 dark:bg-violet-900 text-violet-900 dark:text-violet-100 rounded-lg shrink-0">← Item 1</span>
      <span class="mx-2 px-4 py-2 bg-fuchsia-100 dark:bg-fuchsia-900 text-fuchsia-900 dark:text-fuchsia-100 rounded-lg shrink-0">← Item 2</span>
      <span class="mx-2 px-4 py-2 bg-rose-100 dark:bg-rose-900 text-rose-900 dark:text-rose-100 rounded-lg shrink-0">← Item 3</span>
    </div>
    <div x-marquee:content class="flex flex-row shrink-0" aria-hidden="true">
      <span class="mx-2 px-4 py-2 bg-violet-100 dark:bg-violet-900 text-violet-900 dark:text-violet-100 rounded-lg shrink-0">← Item 1</span>
      <span class="mx-2 px-4 py-2 bg-fuchsia-100 dark:bg-fuchsia-900 text-fuchsia-900 dark:text-fuchsia-100 rounded-lg shrink-0">← Item 2</span>
      <span class="mx-2 px-4 py-2 bg-rose-100 dark:bg-rose-900 text-rose-900 dark:text-rose-100 rounded-lg shrink-0">← Item 3</span>
    </div>
    <div x-marquee:content class="flex flex-row shrink-0" aria-hidden="true">
      <span class="mx-2 px-4 py-2 bg-violet-100 dark:bg-violet-900 text-violet-900 dark:text-violet-100 rounded-lg shrink-0">← Item 1</span>
      <span class="mx-2 px-4 py-2 bg-fuchsia-100 dark:bg-fuchsia-900 text-fuchsia-900 dark:text-fuchsia-100 rounded-lg shrink-0">← Item 2</span>
      <span class="mx-2 px-4 py-2 bg-rose-100 dark:bg-rose-900 text-rose-900 dark:text-rose-100 rounded-lg shrink-0">← Item 3</span>
    </div>
  </div>
</div>

</ComponentExample>

## Vertical Orientation

<ComponentExample>

<div x-marquee="{ vertical: true }" class="w-64">
  <div x-marquee:viewport class="overflow-hidden flex flex-col h-64">
    <div x-marquee:content class="flex flex-col shrink-0">
      <span class="my-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded-lg shrink-0">Vertical 1</span>
      <span class="my-2 px-4 py-2 bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 rounded-lg shrink-0">Vertical 2</span>
      <span class="my-2 px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100 rounded-lg shrink-0">Vertical 3</span>
      <span class="my-2 px-4 py-2 bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100 rounded-lg shrink-0">Vertical 4</span>
    </div>
    <div x-marquee:content class="flex flex-col shrink-0" aria-hidden="true">
      <span class="my-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded-lg shrink-0">Vertical 1</span>
      <span class="my-2 px-4 py-2 bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 rounded-lg shrink-0">Vertical 2</span>
      <span class="my-2 px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100 rounded-lg shrink-0">Vertical 3</span>
      <span class="my-2 px-4 py-2 bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100 rounded-lg shrink-0">Vertical 4</span>
    </div>
    <div x-marquee:content class="flex flex-col shrink-0" aria-hidden="true">
      <span class="my-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded-lg shrink-0">Vertical 1</span>
      <span class="my-2 px-4 py-2 bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 rounded-lg shrink-0">Vertical 2</span>
      <span class="my-2 px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100 rounded-lg shrink-0">Vertical 3</span>
      <span class="my-2 px-4 py-2 bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100 rounded-lg shrink-0">Vertical 4</span>
    </div>
    <div x-marquee:content class="flex flex-col shrink-0" aria-hidden="true">
      <span class="my-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded-lg shrink-0">Vertical 1</span>
      <span class="my-2 px-4 py-2 bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 rounded-lg shrink-0">Vertical 2</span>
      <span class="my-2 px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100 rounded-lg shrink-0">Vertical 3</span>
      <span class="my-2 px-4 py-2 bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100 rounded-lg shrink-0">Vertical 4</span>
    </div>
  </div>
</div>

</ComponentExample>

## Logo Carousel

<ComponentExample>

<div x-marquee class="w-full bg-white dark:bg-zinc-900 py-8">
  <div x-marquee:viewport class="overflow-hidden flex flex-row">
    <div x-marquee:content class="flex flex-row shrink-0">
      <span class="mx-4 w-32 h-16 flex items-center justify-center bg-gray-100 dark:bg-zinc-800 rounded-lg font-bold text-gray-600 dark:text-zinc-400 shrink-0">Logo 1</span>
      <span class="mx-4 w-32 h-16 flex items-center justify-center bg-gray-100 dark:bg-zinc-800 rounded-lg font-bold text-gray-600 dark:text-zinc-400 shrink-0">Logo 2</span>
      <span class="mx-4 w-32 h-16 flex items-center justify-center bg-gray-100 dark:bg-zinc-800 rounded-lg font-bold text-gray-600 dark:text-zinc-400 shrink-0">Logo 3</span>
      <span class="mx-4 w-32 h-16 flex items-center justify-center bg-gray-100 dark:bg-zinc-800 rounded-lg font-bold text-gray-600 dark:text-zinc-400 shrink-0">Logo 4</span>
      <span class="mx-4 w-32 h-16 flex items-center justify-center bg-gray-100 dark:bg-zinc-800 rounded-lg font-bold text-gray-600 dark:text-zinc-400 shrink-0">Logo 5</span>
    </div>
    <div x-marquee:content class="flex flex-row shrink-0" aria-hidden="true">
      <span class="mx-4 w-32 h-16 flex items-center justify-center bg-gray-100 dark:bg-zinc-800 rounded-lg font-bold text-gray-600 dark:text-zinc-400 shrink-0">Logo 1</span>
      <span class="mx-4 w-32 h-16 flex items-center justify-center bg-gray-100 dark:bg-zinc-800 rounded-lg font-bold text-gray-600 dark:text-zinc-400 shrink-0">Logo 2</span>
      <span class="mx-4 w-32 h-16 flex items-center justify-center bg-gray-100 dark:bg-zinc-800 rounded-lg font-bold text-gray-600 dark:text-zinc-400 shrink-0">Logo 3</span>
      <span class="mx-4 w-32 h-16 flex items-center justify-center bg-gray-100 dark:bg-zinc-800 rounded-lg font-bold text-gray-600 dark:text-zinc-400 shrink-0">Logo 4</span>
      <span class="mx-4 w-32 h-16 flex items-center justify-center bg-gray-100 dark:bg-zinc-800 rounded-lg font-bold text-gray-600 dark:text-zinc-400 shrink-0">Logo 5</span>
    </div>
    <div x-marquee:content class="flex flex-row shrink-0" aria-hidden="true">
      <span class="mx-4 w-32 h-16 flex items-center justify-center bg-gray-100 dark:bg-zinc-800 rounded-lg font-bold text-gray-600 dark:text-zinc-400 shrink-0">Logo 1</span>
      <span class="mx-4 w-32 h-16 flex items-center justify-center bg-gray-100 dark:bg-zinc-800 rounded-lg font-bold text-gray-600 dark:text-zinc-400 shrink-0">Logo 2</span>
      <span class="mx-4 w-32 h-16 flex items-center justify-center bg-gray-100 dark:bg-zinc-800 rounded-lg font-bold text-gray-600 dark:text-zinc-400 shrink-0">Logo 3</span>
      <span class="mx-4 w-32 h-16 flex items-center justify-center bg-gray-100 dark:bg-zinc-800 rounded-lg font-bold text-gray-600 dark:text-zinc-400 shrink-0">Logo 4</span>
      <span class="mx-4 w-32 h-16 flex items-center justify-center bg-gray-100 dark:bg-zinc-800 rounded-lg font-bold text-gray-600 dark:text-zinc-400 shrink-0">Logo 5</span>
    </div>
    <div x-marquee:content class="flex flex-row shrink-0" aria-hidden="true">
      <span class="mx-4 w-32 h-16 flex items-center justify-center bg-gray-100 dark:bg-zinc-800 rounded-lg font-bold text-gray-600 dark:text-zinc-400 shrink-0">Logo 1</span>
      <span class="mx-4 w-32 h-16 flex items-center justify-center bg-gray-100 dark:bg-zinc-800 rounded-lg font-bold text-gray-600 dark:text-zinc-400 shrink-0">Logo 2</span>
      <span class="mx-4 w-32 h-16 flex items-center justify-center bg-gray-100 dark:bg-zinc-800 rounded-lg font-bold text-gray-600 dark:text-zinc-400 shrink-0">Logo 3</span>
      <span class="mx-4 w-32 h-16 flex items-center justify-center bg-gray-100 dark:bg-zinc-800 rounded-lg font-bold text-gray-600 dark:text-zinc-400 shrink-0">Logo 4</span>
      <span class="mx-4 w-32 h-16 flex items-center justify-center bg-gray-100 dark:bg-zinc-800 rounded-lg font-bold text-gray-600 dark:text-zinc-400 shrink-0">Logo 5</span>
    </div>
  </div>
</div>

</ComponentExample>

## Start Paused

Start with animation paused using `defaultPaused`:

<ComponentExample>

<div x-marquee="{ defaultPaused: true }" class="w-full">
  <div x-marquee:viewport class="overflow-hidden flex flex-row py-4">
    <div x-marquee:content class="flex flex-row shrink-0">
      <span class="mx-2 px-4 py-2 bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-100 rounded-lg shrink-0">Paused Item 1</span>
      <span class="mx-2 px-4 py-2 bg-lime-100 dark:bg-lime-900 text-lime-900 dark:text-lime-100 rounded-lg shrink-0">Paused Item 2</span>
      <span class="mx-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 rounded-lg shrink-0">Paused Item 3</span>
    </div>
    <div x-marquee:content class="flex flex-row shrink-0" aria-hidden="true">
      <span class="mx-2 px-4 py-2 bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-100 rounded-lg shrink-0">Paused Item 1</span>
      <span class="mx-2 px-4 py-2 bg-lime-100 dark:bg-lime-900 text-lime-900 dark:text-lime-100 rounded-lg shrink-0">Paused Item 2</span>
      <span class="mx-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 rounded-lg shrink-0">Paused Item 3</span>
    </div>
    <div x-marquee:content class="flex flex-row shrink-0" aria-hidden="true">
      <span class="mx-2 px-4 py-2 bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-100 rounded-lg shrink-0">Paused Item 1</span>
      <span class="mx-2 px-4 py-2 bg-lime-100 dark:bg-lime-900 text-lime-900 dark:text-lime-100 rounded-lg shrink-0">Paused Item 2</span>
      <span class="mx-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 rounded-lg shrink-0">Paused Item 3</span>
    </div>
    <div x-marquee:content class="flex flex-row shrink-0" aria-hidden="true">
      <span class="mx-2 px-4 py-2 bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-100 rounded-lg shrink-0">Paused Item 1</span>
      <span class="mx-2 px-4 py-2 bg-lime-100 dark:bg-lime-900 text-lime-900 dark:text-lime-100 rounded-lg shrink-0">Paused Item 2</span>
      <span class="mx-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 rounded-lg shrink-0">Paused Item 3</span>
    </div>
  </div>
  <button x-marquee:control class="mt-4 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600">Toggle</button>
</div>

</ComponentExample>

## Delayed Start

Delay animation start using `delay` prop (in milliseconds):

<ComponentExample>

<div x-marquee="{ delay: 2000 }" class="w-full">
  <div x-marquee:viewport class="overflow-hidden flex flex-row py-4">
    <div x-marquee:content class="flex flex-row shrink-0">
      <span class="mx-2 px-4 py-2 bg-sky-100 dark:bg-sky-900 text-sky-900 dark:text-sky-100 rounded-lg shrink-0">Delayed Item 1</span>
      <span class="mx-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100 rounded-lg shrink-0">Delayed Item 2</span>
      <span class="mx-2 px-4 py-2 bg-violet-100 dark:bg-violet-900 text-violet-900 dark:text-violet-100 rounded-lg shrink-0">Delayed Item 3</span>
    </div>
    <div x-marquee:content class="flex flex-row shrink-0" aria-hidden="true">
      <span class="mx-2 px-4 py-2 bg-sky-100 dark:bg-sky-900 text-sky-900 dark:text-sky-100 rounded-lg shrink-0">Delayed Item 1</span>
      <span class="mx-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100 rounded-lg shrink-0">Delayed Item 2</span>
      <span class="mx-2 px-4 py-2 bg-violet-100 dark:bg-violet-900 text-violet-900 dark:text-violet-100 rounded-lg shrink-0">Delayed Item 3</span>
    </div>
    <div x-marquee:content class="flex flex-row shrink-0" aria-hidden="true">
      <span class="mx-2 px-4 py-2 bg-sky-100 dark:bg-sky-900 text-sky-900 dark:text-sky-100 rounded-lg shrink-0">Delayed Item 1</span>
      <span class="mx-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100 rounded-lg shrink-0">Delayed Item 2</span>
      <span class="mx-2 px-4 py-2 bg-violet-100 dark:bg-violet-900 text-violet-900 dark:text-violet-100 rounded-lg shrink-0">Delayed Item 3</span>
    </div>
    <div x-marquee:content class="flex flex-row shrink-0" aria-hidden="true">
      <span class="mx-2 px-4 py-2 bg-sky-100 dark:bg-sky-900 text-sky-900 dark:text-sky-100 rounded-lg shrink-0">Delayed Item 1</span>
      <span class="mx-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100 rounded-lg shrink-0">Delayed Item 2</span>
      <span class="mx-2 px-4 py-2 bg-violet-100 dark:bg-violet-900 text-violet-900 dark:text-violet-100 rounded-lg shrink-0">Delayed Item 3</span>
    </div>
  </div>
</div>

</ComponentExample>

## Limited Loops

Limit animation to specific number of loops using `loopCount`:

<ComponentExample>

<div x-data="{ loopCounter: 0, completed: false }">
  <div x-marquee="{ loopCount: 3 }"
       x-on:loop-complete="loopCounter = $event.detail.loop"
       x-on:complete="completed = true"
       class="w-full">
    <div x-marquee:viewport class="overflow-hidden flex flex-row py-4">
      <div x-marquee:content class="flex flex-row shrink-0">
        <span class="mx-2 px-4 py-2 bg-pink-100 dark:bg-pink-900 text-pink-900 dark:text-pink-100 rounded-lg shrink-0">Loop Item 1</span>
        <span class="mx-2 px-4 py-2 bg-rose-100 dark:bg-rose-900 text-rose-900 dark:text-rose-100 rounded-lg shrink-0">Loop Item 2</span>
        <span class="mx-2 px-4 py-2 bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 rounded-lg shrink-0">Loop Item 3</span>
      </div>
      <div x-marquee:content class="flex flex-row shrink-0" aria-hidden="true">
        <span class="mx-2 px-4 py-2 bg-pink-100 dark:bg-pink-900 text-pink-900 dark:text-pink-100 rounded-lg shrink-0">Loop Item 1</span>
        <span class="mx-2 px-4 py-2 bg-rose-100 dark:bg-rose-900 text-rose-900 dark:text-rose-100 rounded-lg shrink-0">Loop Item 2</span>
        <span class="mx-2 px-4 py-2 bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 rounded-lg shrink-0">Loop Item 3</span>
      </div>
      <div x-marquee:content class="flex flex-row shrink-0" aria-hidden="true">
        <span class="mx-2 px-4 py-2 bg-pink-100 dark:bg-pink-900 text-pink-900 dark:text-pink-100 rounded-lg shrink-0">Loop Item 1</span>
        <span class="mx-2 px-4 py-2 bg-rose-100 dark:bg-rose-900 text-rose-900 dark:text-rose-100 rounded-lg shrink-0">Loop Item 2</span>
        <span class="mx-2 px-4 py-2 bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 rounded-lg shrink-0">Loop Item 3</span>
      </div>
      <div x-marquee:content class="flex flex-row shrink-0" aria-hidden="true">
        <span class="mx-2 px-4 py-2 bg-pink-100 dark:bg-pink-900 text-pink-900 dark:text-pink-100 rounded-lg shrink-0">Loop Item 1</span>
        <span class="mx-2 px-4 py-2 bg-rose-100 dark:bg-rose-900 text-rose-900 dark:text-rose-100 rounded-lg shrink-0">Loop Item 2</span>
        <span class="mx-2 px-4 py-2 bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 rounded-lg shrink-0">Loop Item 3</span>
      </div>
    </div>
  </div>
  <div class="mt-2 text-sm">
    <span class="text-gray-600 dark:text-gray-400">Loops completed: <strong x-text="loopCounter"></strong> / 3</span>
    <span x-show="completed" class="ml-4 text-green-600 dark:text-green-400">✓ Animation complete!</span>
  </div>
</div>

</ComponentExample>

## Pause on Focus

Marquee pauses when it receives keyboard focus (enabled by default):

<ComponentExample>

<div x-marquee="{ pauseOnFocus: true }" class="w-full">
  <div x-marquee:viewport class="overflow-hidden flex flex-row py-4">
    <div x-marquee:content class="flex flex-row shrink-0">
      <span class="mx-2 px-4 py-2 bg-teal-100 dark:bg-teal-900 text-teal-900 dark:text-teal-100 rounded-lg shrink-0">Focus Item 1</span>
      <span class="mx-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900 text-cyan-900 dark:text-cyan-100 rounded-lg shrink-0">Focus Item 2</span>
      <span class="mx-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded-lg shrink-0">Focus Item 3</span>
    </div>
    <div x-marquee:content class="flex flex-row shrink-0" aria-hidden="true">
      <span class="mx-2 px-4 py-2 bg-teal-100 dark:bg-teal-900 text-teal-900 dark:text-teal-100 rounded-lg shrink-0">Focus Item 1</span>
      <span class="mx-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900 text-cyan-900 dark:text-cyan-100 rounded-lg shrink-0">Focus Item 2</span>
      <span class="mx-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded-lg shrink-0">Focus Item 3</span>
    </div>
    <div x-marquee:content class="flex flex-row shrink-0" aria-hidden="true">
      <span class="mx-2 px-4 py-2 bg-teal-100 dark:bg-teal-900 text-teal-900 dark:text-teal-100 rounded-lg shrink-0">Focus Item 1</span>
      <span class="mx-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900 text-cyan-900 dark:text-cyan-100 rounded-lg shrink-0">Focus Item 2</span>
      <span class="mx-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded-lg shrink-0">Focus Item 3</span>
    </div>
    <div x-marquee:content class="flex flex-row shrink-0" aria-hidden="true">
      <span class="mx-2 px-4 py-2 bg-teal-100 dark:bg-teal-900 text-teal-900 dark:text-teal-100 rounded-lg shrink-0">Focus Item 1</span>
      <span class="mx-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900 text-cyan-900 dark:text-cyan-100 rounded-lg shrink-0">Focus Item 2</span>
      <span class="mx-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded-lg shrink-0">Focus Item 3</span>
    </div>
  </div>
  <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Tab to focus the marquee - it will pause</p>
</div>

</ComponentExample>

## API Reference

### Root Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `vertical` | `boolean` | `false` | Use vertical scrolling instead of horizontal |
| `reverse` | `boolean` | `false` | Reverse animation direction |
| `speed` | `number` | `50` | Animation speed in pixels per second |
| `pauseOnHover` | `boolean` | `true` | Pause animation on mouse hover |
| `pauseOnFocus` | `boolean` | `true` | Pause animation when marquee receives keyboard focus |
| `defaultPaused` | `boolean` | `false` | Start in paused state |
| `delay` | `number` | `0` | Delay before animation starts (in milliseconds) |
| `loopCount` | `number` | `Infinity` | Number of times to loop the animation (infinite by default) |

### Parts

| Part | Description |
|------|-------------|
| `x-marquee` | Root container element |
| `x-marquee:viewport` | Scrolling viewport with overflow hidden |
| `x-marquee:content` | Content container (duplicated for loop) |
| `x-marquee:item` | Individual scrolling items |
| `x-marquee:control` | Play/pause toggle button |

### Data Attributes

| Attribute | Values | Description |
|-----------|--------|-------------|
| `data-state` | `playing` \| `paused` | Current animation state |
| `data-vertical` | `true` \| `false` | Whether vertical mode is enabled |
| `data-reverse` | `true` \| `false` | Whether reverse mode is enabled |
| `data-pause-on-hover` | `true` \| `false` | Whether pause on hover is enabled |
| `data-pause-on-focus` | `true` \| `false` | Whether pause on focus is enabled |
| `data-scope` | `marquee` | Identifies component scope |
| `data-part` | Part name | Identifies component part |

### Methods

Access via `$marquee` magic:

| Method | Description |
|--------|-------------|
| `play()` | Start animation (respects delay on first play) |
| `pause()` | Pause animation |
| `resume()` | Resume animation from current position |
| `restart()` | Restart animation from beginning |
| `toggle()` | Toggle between play and pause |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| `play` | - | Fired when animation starts |
| `pause` | - | Fired when animation pauses |
| `pause-change` | `{ paused: boolean }` | Fired when pause state changes |
| `loop-complete` | `{ loop: number }` | Fired after each animation loop completes |
| `complete` | `{ totalLoops: number }` | Fired when all loops finish (only with finite `loopCount`) |

## Accessibility

- Automatically respects `prefers-reduced-motion` - animation will not start if user prefers reduced motion
- Provides pause on hover and focus for better control
- Includes proper ARIA labels on control button
- Recommended for decorative content only
- Consider providing alternative static content for users who cannot view animations

::: tip Keyboard Support
Focus the viewport and press <kbd>Space</kbd> to pause/play (when pauseOnFocus is enabled).
:::

## Best Practices

1. **Use sparingly** - Marquees can be distracting and should be reserved for decorative content
2. **Provide controls** - Always include a pause button for user control
3. **Respect motion preferences** - The component automatically respects `prefers-reduced-motion`
4. **Keep content concise** - Short, digestible content works best in marquees
5. **Consider alternatives** - Static carousels or grids may be more accessible for important content
