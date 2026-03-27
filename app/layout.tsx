import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'], variable: '--font-playfair', display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})
const inter = Inter({
  subsets: ['latin'], variable: '--font-inter', display: 'swap',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Brussels Navigator — Make Brussels make sense',
  description: 'The community platform for Brussels expats. Tools, answers, events, and local connections.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="bg-cream dark:bg-night text-espresso dark:text-night-text font-body antialiased">
        {children}
      </body>
    </html>
  )
}
