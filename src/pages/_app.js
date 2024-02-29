import Layout from "@/components/Layout";
import "@/styles/globals.css";
import "@/styles/duotone.css";
import "@/styles/fontawesome.min.css";
import { NextUIProvider } from '@nextui-org/react'

import { SessionProvider } from "next-auth/react"
import { useRouter } from "next/router";


export default function App({
  Component,
  pageProps,
}) {
  const router = useRouter
  return (
    <NextUIProvider navigate={router.push}>
      <SessionProvider session={pageProps.session}>
        <Layout>        
            <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </NextUIProvider>

  )
}
