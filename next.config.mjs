import { NextFederationPlugin } from '@module-federation/nextjs-mf'

const isProd = process.env.NODE_ENV === 'production'
const basePath = isProd ? (process.env.NEXT_PUBLIC_BASE_PATH ?? '') : ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(basePath && { basePath, assetPrefix: basePath }),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'adminMarketing',
        filename: 'static/chunks/remoteEntry.js',
        dts: false,
        exposes: {
          './EventListPage': './exposes/EventListPage.tsx',
          './EventRegistPage': './exposes/EventRegistPage.tsx',
          './EventDetailPage': './exposes/EventDetailPage.tsx',
        },
        shared: {},
        extraOptions: {
          exposePages: true,
        },
      }),
    )

    return config
  },
}

export default nextConfig
