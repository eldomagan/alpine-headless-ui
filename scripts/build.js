import { build } from 'esbuild'
import { readdir, readFile, writeFile, mkdir } from 'fs/promises'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { exec } from 'child_process'
import { promisify } from 'util'
import zlib from 'zlib'

const execAsync = promisify(exec)
const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const srcDir = join(root, 'src')
const componentsDir = join(srcDir, 'components')
const distDir = join(root, 'dist')
const tempDir = join(root, '.build-temp')

// Check if watch mode is enabled
const isWatchMode = process.argv.includes('--watch')

/**
 * Get all component files from src/components directory
 */
async function getComponentFiles() {
  const entries = await readdir(componentsDir, { withFileTypes: true })
  const components = []

  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith('.ts')) {
      const name = entry.name.replace('.ts', '')
      // Convert kebab-case to PascalCase for imports
      const importName = name
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('')

      components.push({
        name,
        importName,
        path: join(componentsDir, entry.name),
      })
    }
  }

  return components
}

/**
 * Generate build file contents
 */
function generateBuildFiles(components) {
  // Generate cdn.js
  const cdnImports = components.map(c => `import ${c.importName} from '../src/components/${c.name}'`).join('\n')
  const cdnPlugins = components.map(c => `  window.Alpine.plugin(${c.importName})`).join('\n')
  const cdnContent = `${cdnImports}

document.addEventListener('alpine:init', () => {
${cdnPlugins}
})
`

  // Generate module.js
  const moduleExports = components.map(c => `export { default as ${c.importName} } from '../src/components/${c.name}'`).join('\n')
  const modulePlugins = components.map(c => `  Alpine.plugin(${c.importName})`).join('\n')
  const moduleContent = `${moduleExports}

export default function (Alpine) {
${modulePlugins}
}
`

  // Generate individual component CDN files
  const componentCdnFiles = components.map(c => ({
    name: `${c.name}.cdn.js`,
    content: `import ${c.importName} from '../src/components/${c.name}'

document.addEventListener('alpine:init', () => {
  window.Alpine.plugin(${c.importName})
})
`
  }))

  return {
    'cdn.js': cdnContent,
    'module.js': moduleContent,
    ...Object.fromEntries(componentCdnFiles.map(f => [f.name, f.content]))
  }
}

/**
 * Write build files to temp directory
 */
async function writeBuildFiles(components) {
  await mkdir(tempDir, { recursive: true })
  const buildFiles = generateBuildFiles(components)

  for (const [filename, content] of Object.entries(buildFiles)) {
    await writeFile(join(tempDir, filename), content)
  }
}

/**
 * Output file size with Brotli compression
 */
function outputSize(name, filePath) {
  const fileContent = readFileSync(filePath)
  const compressed = zlib.brotliCompressSync(fileContent)
  const size = bytesToSize(compressed.length)
  console.log('\x1b[32m', `${name}: ${size}`, '\x1b[0m')
}

/**
 * Convert bytes to human-readable size
 */
function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return 'n/a'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
  if (i === 0) return `${bytes} ${sizes[i]}`
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`
}

/**
 * Build with common options
 */
async function buildWithOptions(options) {
  return build({
    logLevel: isWatchMode ? 'info' : 'warning',
    ...options,
  })
}

/**
 * Build CDN bundle (auto-registers all plugins with Alpine)
 */
async function buildCDN() {
  console.log('📦 Building CDN bundle...')

  const entryPoint = join(tempDir, 'cdn.js')

  // CDN build (unminified)
  await buildWithOptions({
    entryPoints: [entryPoint],
    bundle: true,
    format: 'iife',
    outfile: join(distDir, 'cdn.js'),
    platform: 'browser',
    external: ['alpinejs'],
    globalName: 'AlpineHeadlessUI',
    minify: false,
  })

  // CDN build (minified)
  await buildWithOptions({
    entryPoints: [entryPoint],
    bundle: true,
    format: 'iife',
    outfile: join(distDir, 'cdn.min.js'),
    platform: 'browser',
    external: ['alpinejs'],
    globalName: 'AlpineHeadlessUI',
    minify: true,
  })

  outputSize('cdn.min.js', join(distDir, 'cdn.min.js'))
  console.log('✅ CDN bundle built')
}

/**
 * Build module bundle (ESM + CJS for bundlers)
 */
async function buildModule() {
  console.log('📦 Building module bundle...')

  const entryPoint = join(tempDir, 'module.js')
  const external = ['alpinejs', 'alpine-define-component']

  // ESM build
  await buildWithOptions({
    entryPoints: [entryPoint],
    bundle: true,
    format: 'esm',
    outfile: join(distDir, 'module.esm.js'),
    platform: 'neutral',
    external,
    minify: false,
  })

  // CJS build
  await buildWithOptions({
    entryPoints: [entryPoint],
    bundle: true,
    format: 'cjs',
    outfile: join(distDir, 'module.cjs.js'),
    platform: 'node',
    external,
    minify: false,
  })

  console.log('✅ Module bundle built')
}

/**
 * Build individual CDN files for each component
 */
async function buildComponentCDN(components) {
  if (components.length === 0) {
    return
  }

  console.log(`📦 Building ${components.length} individual CDN components...`)

  for (const component of components) {
    const cdnFile = join(tempDir, `${component.name}.cdn.js`)
    const globalName = `AlpineHeadlessUI${component.importName}`

    // CDN build (unminified)
    await buildWithOptions({
      entryPoints: [cdnFile],
      bundle: true,
      format: 'iife',
      outfile: join(distDir, `${component.name}.js`),
      platform: 'browser',
      external: ['alpinejs'],
      globalName,
      minify: false,
    })

    // CDN build (minified)
    await buildWithOptions({
      entryPoints: [cdnFile],
      bundle: true,
      format: 'iife',
      outfile: join(distDir, `${component.name}.min.js`),
      platform: 'browser',
      external: ['alpinejs'],
      globalName,
      minify: true,
    })

    outputSize(`${component.name}.min.js`, join(distDir, `${component.name}.min.js`))
  }

  console.log('✅ Individual CDN components built')
}

/**
 * Build individual component files for tree-shaking (ESM/CJS)
 */
async function buildComponents(components) {
  if (components.length === 0) {
    console.log('ℹ️  No individual components to build yet')
    return
  }

  console.log(`📦 Building ${components.length} individual module components...`)

  const external = ['alpinejs', 'alpine-define-component']

  for (const component of components) {
    // ESM build
    await buildWithOptions({
      entryPoints: [component.path],
      bundle: true,
      format: 'esm',
      outfile: join(distDir, `${component.name}.esm.js`),
      platform: 'neutral',
      external,
      minify: false,
    })

    // CJS build
    await buildWithOptions({
      entryPoints: [component.path],
      bundle: true,
      format: 'cjs',
      outfile: join(distDir, `${component.name}.cjs.js`),
      platform: 'neutral',
      external,
      minify: false,
    })
  }

  console.log('✅ Individual module components built')
}

/**
 * Generate TypeScript declarations
 */
async function generateTypes() {
  console.log('📝 Generating TypeScript declarations...')

  try {
    await execAsync('npx tsc', { cwd: root })
    console.log('✅ TypeScript declarations generated')
  } catch (error) {
    console.error('❌ Failed to generate TypeScript declarations:')
    console.error(error.stderr || error.message)
  }
}

/**
 * Update package.json exports for tree-shaking
 */
async function updatePackageExports(components) {
  console.log('📝 Updating package.json exports...')

  const packageJsonPath = join(root, 'package.json')
  const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf-8'))

  // Build exports object
  const exports = {
    '.': {
      types: './dist/index.d.ts',
      import: './dist/module.esm.js',
      require: './dist/module.cjs.js',
    },
  }

  // Add per-component exports (sorted alphabetically)
  const sortedComponents = [...components].sort((a, b) => a.name.localeCompare(b.name))
  for (const component of sortedComponents) {
    exports[`./${component.name}`] = {
      types: `./dist/components/${component.name}.d.ts`,
      import: `./dist/${component.name}.esm.js`,
      require: `./dist/${component.name}.cjs.js`,
    }
  }

  packageJson.exports = exports

  await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n')

  console.log('✅ package.json exports updated')
}

/**
 * Clean up temporary build files
 */
async function cleanup() {
  try {
    const { rm } = await import('fs/promises')
    await rm(tempDir, { recursive: true, force: true })
  } catch (error) {
    // Ignore cleanup errors
  }
}

/**
 * Main build function
 */
async function main() {
  try {
    console.log(isWatchMode ? '👀 Watch mode enabled\n' : '🚀 Starting build...\n')

    // Ensure directories exist
    await mkdir(distDir, { recursive: true })
    await mkdir(tempDir, { recursive: true })

    // Get all components
    const components = await getComponentFiles()
    console.log(`Found ${components.length} components\n`)

    // Generate build files
    await writeBuildFiles(components)

    // Run builds
    await buildCDN()
    await buildModule()
    await buildComponentCDN(components)
    await buildComponents(components)
    await generateTypes()
    await updatePackageExports(components)

    // Clean up temp files
    await cleanup()

    console.log('\n✨ Build complete!')
  } catch (error) {
    console.error('❌ Build failed:', error)
    await cleanup()
    process.exit(1)
  }
}

main()
