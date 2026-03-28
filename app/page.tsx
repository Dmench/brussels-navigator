'use client'
import Link from 'next/link'
import { useWeather } from '@/lib/hooks/use-weather'
import { useRates } from '@/lib/hooks/use-rates'
import { FEATURED_QUESTIONS, WEATHER_CODES } from '@/lib/constants'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'

function WeatherRateStrip() {
  const { data: weather } = useWeather()
  const { data: rates } = useRates()
  const parts: string[] = []
  if (weather) parts.push(`Brussels: ${weather.temperature}°C, ${(WEATHER_CODES[weather.weathercode] ?? 'Variable').toLowerCase()}`)
  if (rates?.rates?.['USD']) parts.push(`1 EUR = ${rates.rates['USD'].toFixed(2)} USD`)
  if (parts.length === 0) return null
  return <p className="text-walnut/70 text-sm mt-6">{parts.join(' · ')}</p>
}

const VALUE_CARDS = [
  { href: '/answers', title: 'Ask anything', desc: '23 in-depth answers to questions people living in Brussels ask — from commune registration to lease law.' },
  { href: '/events', title: 'This week', desc: 'Public holidays, markets, runs, and recurring events. Know what is happening before it happens.' },
  { href: '/connect', title: 'Connect', desc: 'Community groups, neighbourhood posts, and meetups. The people who have been here longer are happy to help.' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero — gradient */}
      <section
        className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 md:py-40"
        style={{ background: 'linear-gradient(165deg, #FDFBF7 0%, #F5E6D8 30%, #EDCBB8 60%, #E8B9A0 100%)' }}
      >
        <p className="text-terracotta-dark text-xs uppercase tracking-[0.2em] mb-6 font-medium">Bubl</p>
        <h1 className="font-display text-6xl md:text-8xl font-extrabold text-espresso leading-[0.9] mb-8 max-w-3xl">
          Your Brussels<br />bubble.
        </h1>
        <p className="text-walnut text-lg md:text-xl max-w-md mb-10 leading-relaxed">
          Events, answers, local tips, and the tools you actually need. For everyone who lives here.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/events"
            className="inline-flex items-center justify-center px-8 py-3 bg-terracotta text-cream rounded-full font-medium hover:bg-terracotta-dark transition-colors text-sm"
          >
            See what's on
          </Link>
          <Link
            href="/tools/checklist"
            className="inline-flex items-center justify-center px-8 py-3 border border-espresso/30 text-espresso rounded-full font-medium hover:bg-white/60 transition-colors text-sm"
          >
            I just moved here
          </Link>
        </div>
        <WeatherRateStrip />
      </section>

      {/* Fade to cream */}
      <div style={{ height: 80, background: 'linear-gradient(to bottom, #E8B9A0, #FDFBF7)' }} />

      {/* Value cards */}
      <section className="px-6 md:px-8 pb-20 md:pb-28 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {VALUE_CARDS.map(card => (
            <Link
              key={card.href}
              href={card.href}
              className="group bg-white border border-sand/40 rounded-2xl p-7 hover:border-terracotta/40 hover:bg-[#FFFCF9] transition-all duration-300"
            >
              <h2 className="font-display text-xl font-semibold text-espresso mb-2 group-hover:text-terracotta transition-colors">
                {card.title}
              </h2>
              <p className="text-walnut text-sm leading-relaxed">{card.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured questions */}
      <section className="px-6 md:px-8 pb-20 md:pb-28 max-w-6xl mx-auto w-full">
        <h2 className="font-display text-3xl font-bold text-espresso mb-6">Questions everyone asks</h2>
        <div className="border border-sand/30 rounded-2xl overflow-hidden divide-y divide-sand/30">
          {FEATURED_QUESTIONS.map(q => (
            <Link
              key={q.slug}
              href={`/answers/${q.slug}`}
              className="flex items-center justify-between px-6 py-4 hover:bg-white transition-colors group"
            >
              <span className="text-espresso text-sm font-medium group-hover:text-terracotta transition-colors">{q.question}</span>
              <span className="text-walnut text-xs ml-4 shrink-0">Read</span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
