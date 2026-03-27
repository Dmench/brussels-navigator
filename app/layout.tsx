import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Brussels Navigator — Your guide to Brussels',
  description: 'Everything you need to move to, settle in, and enjoy living in Brussels. Neighbourhood guides, setup checklists, cost calculators, and an events calendar.',
  keywords: 'Brussels expat guide, moving to Brussels, Brussels neighborhoods, Belgian administration, expat Belgium',
  openGraph: {
    title: 'Brussels Navigator',
    description: 'Your guide to Brussels',
    siteName: 'Brussels Navigator',
    locale: 'en_GB',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  )
}
