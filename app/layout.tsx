import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import ScrollProgress from "@/components/scroll-progress"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Anas Mustafa Hashmi | Cybersecurity Specialist",
  description:
    "Cybersecurity graduate passionate about emerging technologies, cyber threat intelligence, and proactive defense strategies.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Add favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* Add meta tags for SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="keywords"
          content="cybersecurity, penetration testing, digital forensics, security operations, Anas Hashmi"
        />
        <meta name="author" content="Anas Mustafa Hashmi" />
        {/* Open Graph / Social Media */}
        <meta property="og:title" content="Anas Mustafa Hashmi | Cybersecurity Specialist" />
        <meta
          property="og:description"
          content="Cybersecurity graduate passionate about emerging technologies, cyber threat intelligence, and proactive defense strategies."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://anashashmi.github.io" />
        <meta property="og:image" content="/og-image.jpg" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Anas Mustafa Hashmi | Cybersecurity Specialist" />
        <meta
          name="twitter:description"
          content="Cybersecurity graduate passionate about emerging technologies, cyber threat intelligence, and proactive defense strategies."
        />
        <meta name="twitter:image" content="/og-image.jpg" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <ScrollProgress />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
