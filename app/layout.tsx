import type { Metadata } from "next"
import { Outfit, Nunito_Sans } from "next/font/google"
import "./globals.css"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
})

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Brussels Navigator — Your first 90 days in Brussels",
  description: "The complete guide for expats moving to Brussels. Checklist, neighborhoods, costs, housing, and more.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🇧🇪</text></svg>",
  },
  openGraph: {
    title: "Brussels Navigator",
    description: "Your first 90 days in Brussels. One place. No chaos.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${nunito.variable}`}
    >
      <body className="bg-surface-0 text-content font-body antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}
