<script setup lang="ts">
import { ref, useSlots, onMounted } from 'vue'
import { codeToHtml } from 'shiki'

const slots = useSlots()
const showCode = ref(false)
const copied = ref(false)
const htmlContent = ref('')
const highlightedCode = ref('')

const toggleCode = () => {
  showCode.value = !showCode.value
}

const copyCode = async () => {
  if (htmlContent.value) {
    await navigator.clipboard.writeText(htmlContent.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}

// Extract and format HTML from slot VNodes
const extractHtmlFromSlot = (): string => {
  if (!slots.default) {
    return ''
  }

  const vnodes = slots.default()

  const formatVNode = (vnode: any, indent = ''): string => {
    // Skip VNodes with non-string types (Symbols, Components, etc.)
    if (typeof vnode.type !== 'string') {
      // Try to extract children if they exist
      if (Array.isArray(vnode.children)) {
        return vnode.children
          .map((child: any) => {
            if (child && typeof child === 'object') {
              return formatVNode(child, indent)
            }
            return ''
          })
          .join('')
      }
      return ''
    }

    // Handle text nodes
    if (typeof vnode.children === 'string') {
      const text = vnode.children.trim()
      if (!text) {
        return ''
      }

      const tag = vnode.type
      const attrs = formatAttributes(vnode.props || {})
      const openTag = attrs ? `<${tag} ${attrs}>` : `<${tag}>`
      return `${indent}${openTag}${text}</${tag}>\n`
    }

    // Handle elements with children
    if (Array.isArray(vnode.children)) {
      const tag = vnode.type
      const attrs = formatAttributes(vnode.props || {})
      const openTag = attrs ? `<${tag} ${attrs}>` : `<${tag}>`

      let result = `${indent}${openTag}\n`
      vnode.children.forEach((child: any) => {
        if (child && typeof child === 'object') {
          result += formatVNode(child, indent + '  ')
        }
      })
      result += `${indent}</${tag}>\n`
      return result
    }

    // Handle self-closing or empty elements
    const tag = vnode.type
    const attrs = formatAttributes(vnode.props || {})
    const openTag = attrs ? `<${tag} ${attrs}>` : `<${tag}>`
    return `${indent}${openTag}</${tag}>\n`
  }

  const formatAttributes = (props: Record<string, any>): string => {
    return Object.entries(props)
      .filter(([key, value]) => {
        // Skip Vue internal props and symbols
        return !key.startsWith('_') && key !== 'key' && key !== 'ref' && typeof value !== 'symbol'
      })
      .map(([key, value]) => {
        // Skip non-primitive values (functions, objects, symbols)
        if (typeof value === 'function' || typeof value === 'object' || typeof value === 'symbol') {
          return null
        }

        // Convert camelCase to kebab-case
        const attrName = key.replace(/([A-Z])/g, '-$1').toLowerCase()

        // Handle boolean attributes
        if (value === true || value === '') {
          return attrName
        }

        // Skip false boolean attributes
        if (value === false) {
          return null
        }

        return `${attrName}="${value}"`
      })
      .filter(Boolean)
      .join(' ')
  }

  return vnodes.map(vnode => formatVNode(vnode)).join('')
}

onMounted(async () => {
  // Extract HTML from slot
  htmlContent.value = extractHtmlFromSlot().trim()

  // Use Shiki to highlight the code
  try {
    highlightedCode.value = await codeToHtml(htmlContent.value, {
      lang: 'html',
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      },
      defaultColor: false
    })
  } catch (error) {
    console.error('Shiki highlighting failed:', error)
    // Fallback to plain text
    highlightedCode.value = `<pre><code>${htmlContent.value}</code></pre>`
  }
})
</script>

<template>
  <div class="component-example">
    <!-- Actions -->
    <div class="component-example-actions">
      <button
        @click="toggleCode"
        class="component-example-button"
        :class="{ active: showCode }"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
        {{ showCode ? 'Hide code' : 'View code' }}
      </button>
      <div class="component-example-spacer"></div>
      <button
        @click="copyCode"
        class="component-example-button"
        :class="{ copied: copied }"
      >
        <svg
          v-if="!copied"
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        <svg
          v-else
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        {{ copied ? 'Copied!' : 'Copy' }}
      </button>
    </div>

    <!-- Preview - render default slot directly so Alpine can parse it -->
    <div
      v-show="!showCode"
      class="component-example-preview"
    >
      <slot />
    </div>

    <!-- Code - syntax highlighted with Shiki -->
    <div
      v-show="showCode"
      class="component-example-code"
      v-html="highlightedCode"
    ></div>
  </div>
</template>

<style scoped>
.component-example {
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  margin: 24px 0;
}

.component-example-actions {
  display: flex;
  gap: 8px;
  padding: 12px 20px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-border);
  border-radius: 7px 7px 0 0;
}

.component-example-spacer {
  flex: 1;
}

.component-example-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.component-example-button:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand-1);
}

.component-example-button.active {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
}

.component-example-button svg {
  width: 16px;
  height: 16px;
}

.component-example-preview {
  padding: 32px 20px;
  background: var(--vp-c-bg);
  border-radius: 0 0 7px 7px;
}

.component-example-code {
  background: var(--vp-code-block-bg);
  border-radius: 0 0 7px 7px;
  overflow: hidden;
}

.component-example-code :deep(div[class*='language-']) {
  margin: 0;
  border: none;
  border-radius: 0;
}

.component-example-code :deep(pre) {
  margin: 0;
}

/* Shiki dual theme support */
.component-example-code :deep(.shiki) {
  background: transparent !important;
  padding: 20px;
  margin: 0;
  overflow-x: auto;
}

.component-example-code :deep(.shiki code) {
  display: block;
}

.component-example-code :deep(.shiki span) {
  color: var(--shiki-light);
}

.dark .component-example-code :deep(.shiki span) {
  color: var(--shiki-dark);
}
</style>