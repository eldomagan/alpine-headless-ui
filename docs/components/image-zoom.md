# Image Zoom

An accessible image zoom component with three interaction modes: Window, Lens, and Inner zoom.

## Window Mode

Displays a selector box on the image and shows the magnified result in a separate window alongside the image.

<ComponentExample>

<div class="pr-80">
  <div x-image-zoom="{ zoomType: 'window', scale: 2.5 }">
    <img
      x-image-zoom:image
      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop"
      alt="Product"
      class="w-full rounded-lg"
    />
    <div
      x-image-zoom:lens
      class="absolute w-24 h-24 border-2 border-blue-500 bg-blue-500/20 pointer-events-none"
    ></div>
    <div
      x-image-zoom:result
      class="absolute overflow-hidden w-80 h-80 border border-gray-200 dark:border-zinc-700 shadow-2xl rounded-lg pointer-events-none"
      style="left: 105%; top: 0;"
    ></div>
  </div>
</div>

</ComponentExample>

## Lens Mode

A circular magnifying glass that follows the cursor and shows the magnified image inside it.

<ComponentExample>

<div x-image-zoom="{ zoomType: 'lens', scale: 3 }">
  <img
    x-image-zoom:image
    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop"
    alt="Product"
    class="w-full rounded-lg"
  />
  <div
    x-image-zoom:lens
    class="absolute overflow-hidden w-40 h-40 border-4 border-white rounded-full shadow-2xl pointer-events-none"
  ></div>
</div>

</ComponentExample>

## Inner Mode

The image scales in place when hovering, with the transform origin following the cursor position.

<ComponentExample>

<div x-image-zoom="{ zoomType: 'inner', scale: 2.5 }" class="overflow-hidden rounded-lg">
  <img
    x-image-zoom:image
    src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=400&fit=crop"
    alt="Product"
    class="w-full transition-transform duration-200"
  />
</div>

</ComponentExample>

## API Reference

### Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `zoomType` | `'window' \| 'lens' \| 'inner'` | `'lens'` | The zoom interaction mode |
| `scale` | `number` | `2.5` | Magnification factor |

### Parts

| Part | Description |
|------|-------------|
| `x-image-zoom` | Root container element (auto-applied) |
| `x-image-zoom:image` | The source image to be magnified |
| `x-image-zoom:lens` | The lens/selector element (window & lens modes) |
| `x-image-zoom:result` | The result window (window mode only) |

### Data Attributes

| Attribute | Description |
|-----------|-------------|
| `data-scope` | Always set to `image-zoom` |
| `data-part` | Identifies the part (`root`, `image`, `lens`, or `result`) |
| `data-zoom-type` | Current zoom type on root element |

## Styling Guide

### Window Mode

The component calculates positioning and background styles. Users must provide all styling:

**Lens (selector box):**
```html
<div
  x-image-zoom:lens
  class="absolute pointer-events-none border-2 border-blue-500 bg-blue-500/20"
></div>
```
- **Required**: `absolute` (positioning), `pointer-events-none` (prevent interference)
- **Optional**: Border color and thickness, background color and opacity

**Result window:**
```html
<div
  x-image-zoom:result
  class="absolute overflow-hidden pointer-events-none w-[400px] h-[400px] border shadow-2xl rounded-lg"
  style="left: 105%; top: 0;"
></div>
```
- **Required**: `absolute` (or `fixed`), `overflow-hidden` (clips zoom), `pointer-events-none`
- **Required**: Size (`w-[400px] h-[400px]`)
- **Optional**: Position offset (inline style or classes), border, shadow, border-radius

### Lens Mode

**Lens (magnifying glass):**
```html
<div
  x-image-zoom:lens
  class="absolute overflow-hidden pointer-events-none w-40 h-40 border-4 border-white rounded-full shadow-2xl"
></div>
```
- **Required**: `absolute`, `overflow-hidden` (clips zoom), `pointer-events-none`
- **Required**: Size (`w-40 h-40`)
- **Optional**: Shape (`rounded-full` for circle, `rounded-lg` for rounded square), border, shadow

### Inner Mode

**Root container:**
```html
<div x-image-zoom="{ zoomType: 'inner', scale: 2.5 }" class="overflow-hidden">
```
- **Required**: `overflow-hidden` on root to clip scaled image

**Image:**
```html
<img x-image-zoom:image class="transition-transform duration-200" />
```
- **Optional**: Transition for smooth scale effect

## Accessibility

- Lens and result elements have `aria-hidden="true"` to hide from screen readers
- The source image maintains proper `alt` text for accessibility
- All zoom interactions are purely visual enhancements

## Tips

- **Window mode:** Adjust result window size to your needs. Larger windows show more detail but take more space
- **Lens mode:** Use `rounded-full` for traditional magnifying glass look
- **Inner mode:** Add `transition-transform` to the image for smooth zoom effect
- **Performance:** Keep `scale` values reasonable (2-4x) for best performance
- **Mobile:** Consider disabling zoom on touch devices or using a different interaction pattern