import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-16">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}
