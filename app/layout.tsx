import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"

import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/lib/auth-context"
import { EnvCheck } from "@/components/env-check"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Thinkverse - Science & Technology News",
  description: "Exploring the frontiers of human knowledge through science, innovation, and discovery.",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-1234567890123456" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <SiteHeader />
          <EnvCheck>
            <main>{children}</main>
          </EnvCheck>
          <Toaster />
        </AuthProvider>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  )
}
