import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Morrow · React Native Developers · Mobile, Web, and Mixed Reality',
  description: 'Award-winning React Native app development company. Expert mobile, web, AR and VR development services. Based in Boston, MA and Bristol, UK.',
  keywords: 'React Native, mobile development, app development, Expo, AR, VR, Boston, Bristol',
  authors: [{ name: 'Morrow Digital' }],
  creator: 'Morrow Digital',
  publisher: 'Morrow Digital',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://themorrow.digital',
    title: 'Morrow · React Native Developers · Mobile, Web, and Mixed Reality',
    description: 'Award-winning React Native app development company. Expert mobile, web, AR and VR development services.',
    siteName: 'Morrow Digital',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Morrow · React Native Developers · Mobile, Web, and Mixed Reality',
    description: 'Award-winning React Native app development company. Expert mobile, web, AR and VR development services.',
    creator: '@morrowdigital',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}