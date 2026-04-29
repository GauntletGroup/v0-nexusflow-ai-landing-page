import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'NexusFlow AI | Intelligent Workflow Automation',
  description: 'Transform your business operations with AI-powered automation. Save 14,200+ hours annually with 99.8% accuracy. Get your free automation roadmap today.',
  keywords: ['AI automation', 'workflow automation', 'business automation', 'AI consulting', 'process optimization'],
  authors: [{ name: 'Marcus Chen', url: 'https://nexusflow.ai' }],
  creator: 'NexusFlow AI',
  publisher: 'NexusFlow AI',
  generator: 'v0.app',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nexusflow.ai',
    siteName: 'NexusFlow AI',
    title: 'NexusFlow AI | Intelligent Workflow Automation',
    description: 'Transform your business operations with AI-powered automation. Save 14,200+ hours annually with 99.8% accuracy.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NexusFlow AI | Intelligent Workflow Automation',
    description: 'Transform your business operations with AI-powered automation.',
    creator: '@nexusflowai',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1a2e',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased min-h-screen">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <SpeedInsights />
      </body>
    </html>
  )
}
