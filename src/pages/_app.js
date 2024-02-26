import Layout from "@/components/Layout";
import "@/styles/globals.css";
import "@/styles/duotone.css";
import "@/styles/fontawesome.min.css";
import { NextUIProvider } from '@nextui-org/react'

export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NextUIProvider>
  )
}
