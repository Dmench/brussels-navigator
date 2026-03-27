import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream dark:bg-night flex flex-col">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 md:px-8 py-12 md:py-16">
        {children}
      </main>
      <Footer />
    </div>
  )
}
