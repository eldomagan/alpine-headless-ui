import type Alpine from 'alpinejs'
import accordion from './components/accordion'
import carousel from './components/carousel'
import clipboard from './components/clipboard'
import collapsible from './components/collapsible'
import countdown from './components/countdown'
import dialog from './components/dialog'
import imageZoom from './components/image-zoom'
import marquee from './components/marquee'
import numberInput from './components/number-input'
import popover from './components/popover'
import rating from './components/rating'
import slider from './components/slider'
import tabs from './components/tabs'

// Export individual components
export { accordion, carousel, clipboard, collapsible, countdown, dialog, imageZoom, marquee, numberInput, popover, rating, slider, tabs }

// Main plugin
export default function AlpineHeadlessUI(alpine: typeof Alpine) {
  alpine.plugin(accordion)
  alpine.plugin(carousel)
  alpine.plugin(clipboard)
  alpine.plugin(collapsible)
  alpine.plugin(countdown)
  alpine.plugin(dialog)
  alpine.plugin(imageZoom)
  alpine.plugin(marquee)
  alpine.plugin(numberInput)
  alpine.plugin(popover)
  alpine.plugin(rating)
  alpine.plugin(slider)
  alpine.plugin(tabs)
}
