import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = env.VITE_BASE_PATH ?? '/'

  return {
    base,
    plugins: [
      react(),
      federation({
        name: 'adminMarketing',
        filename: 'remoteEntry.js',
        exposes: {
          './EventListPage': './src/pages/EventListPage.tsx',
          './EventRegistPage': './src/pages/EventRegistPage.tsx',
          './EventDetailPage': './src/pages/EventDetailPage.tsx',
        },
        shared: ['react', 'react-dom', 'react-router-dom'],
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 5174,
      cors: true,
      strictPort: true,
    },
    preview: {
      port: 5174,
      cors: true,
      strictPort: true,
    },
    build: {
      modulePreload: false,
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
    },
  }
})
