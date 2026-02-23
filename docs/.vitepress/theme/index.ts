import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import ComponentExample from './components/ComponentExample.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: { app: any }) {
    app.component('ComponentExample', ComponentExample);
  }
} satisfies Theme
