import type { AppProps } from 'next/app'
import '@dmsej108/design-system/dist/index.css'
import '@/styles/admin.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
