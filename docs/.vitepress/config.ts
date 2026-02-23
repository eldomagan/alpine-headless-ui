import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  title: 'Alpine Headless UI',
  description: 'Headless, accessible UI primitives for Alpine.js',
  appearance: true, // Enable light/dark mode toggle

  vite: {
    plugins: [tailwindcss() as any]
  },

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Docs', link: '/guide/introduction' },
      { text: 'Components', link: '/components/accordion' },
      { text: 'GitHub', link: 'https://github.com/eldomagan/alpine-headless-ui.git' }
    ],

    sidebar: [
      {
        text: 'Docs',
        items: [
          { text: 'Introduction', link: '/guide/introduction' },
          { text: 'Getting Started', link: '/guide/installation' },
          { text: 'Usage', link: '/guide/usage' },
          { text: 'Styling', link: '/guide/styling' },
        ]
      },
      {
        text: 'Components',
        items: [
          { text: 'Accordion', link: '/components/accordion' },
          { text: 'Carousel', link: '/components/carousel' },
          { text: 'Clipboard', link: '/components/clipboard' },
          { text: 'Collapsible', link: '/components/collapsible' },
          { text: 'Countdown', link: '/components/countdown' },
          { text: 'Dialog', link: '/components/dialog' },
          { text: 'Image Zoom', link: '/components/image-zoom' },
          { text: 'Marquee', link: '/components/marquee' },
          { text: 'Number Input', link: '/components/number-input' },
          { text: 'Popover', link: '/components/popover' },
          { text: 'Rating', link: '/components/rating' },
          { text: 'Slider', link: '/components/slider' },
          { text: 'Tabs', link: '/components/tabs' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/eldomagan/alpine-headless-ui.git' }
    ],

    footer: {
      message: 'Built with Alpine.js and inspired by Zag.js',
      copyright: 'MIT License'
    },

    search: {
      provider: 'local'
    }
  },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    [
      'script',
      {
        defer: '',
        src: 'https://cdn.jsdelivr.net/npm/alpine-headless-ui/dist/cdn.min.js'
      }
    ],
    [
      'script',
      {
        defer: '',
        src: 'https://cdn.jsdelivr.net/npm/alpinejs@3/dist/cdn.min.js'
      }
    ]
  ]
})
