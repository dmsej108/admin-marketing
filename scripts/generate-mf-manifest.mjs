import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, '..')
const isDev = process.argv.includes('--dev')

const pkg = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf8'))
const version = pkg.version

const origin = process.env.VITE_MF_PUBLIC_ORIGIN?.replace(/\/$/, '')
const basePath = normalizeBasePath(process.env.VITE_BASE_PATH, pkg.name)

if (!origin) {
  throw new Error(
    'Missing VITE_MF_PUBLIC_ORIGIN. Set it in .env.development, .env.production, or CI env. See .env.example',
  )
}

const remoteEntry = isDev
  ? joinUrl(origin, basePath, 'assets/remoteEntry.js')
  : joinUrl(origin, basePath, `releases/${version}/assets/remoteEntry.js`)
const manifest = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  remotes: {
    adminMarketing: {
      name: 'adminMarketing',
      version,
      remoteEntry,
    },
  },
}

const outputDir = isDev ? join(rootDir, 'public') : join(rootDir, 'dist')
mkdirSync(outputDir, { recursive: true })
writeFileSync(join(outputDir, 'mf-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')

if (!isDev) {
  const releaseAssetsDir = join(rootDir, 'dist', 'releases', version, 'assets')
  const sourceAssetsDir = join(rootDir, 'dist', 'assets')

  if (!existsSync(sourceAssetsDir)) {
    throw new Error('dist/assets not found. Run vite build before generating manifest.')
  }

  mkdirSync(releaseAssetsDir, { recursive: true })
  cpSync(sourceAssetsDir, releaseAssetsDir, { recursive: true })
  writeFileSync(
    join(rootDir, 'dist', 'releases', version, 'mf-manifest.json'),
    `${JSON.stringify(manifest, null, 2)}\n`,
    'utf8',
  )
}

console.log(`Generated mf-manifest.json (${isDev ? 'dev' : 'prod'})`)
console.log(`  version: ${version}`)
console.log(`  remoteEntry: ${remoteEntry}`)

function normalizeBasePath(value, repoName) {
  if (!value || value === '/') return '/'

  if (value.includes(' ') || /:[/\\]/.test(value)) {
    return `/${repoName}/`
  }

  return value.startsWith('/') ? (value.endsWith('/') ? value : `${value}/`) : `/${value}/`
}

function joinUrl(origin, basePath, path) {
  const normalizedPath = path.replace(/^\//, '')
  if (!basePath || basePath === '/') {
    return `${origin}/${normalizedPath}`
  }
  const normalizedBase = basePath.replace(/\/$/, '')
  return `${origin}${normalizedBase}/${normalizedPath}`
}
