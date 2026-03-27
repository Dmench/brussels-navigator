'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useWeather } from '@/lib/hooks/use-weather'
import { useRates } from '@/lib/hooks/use-rates'
import { FEATURED_QUESTIONS } from '@/lib/constants'
import { WEATHER_CODES } from '@/lib/constants'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { cn } from '@/lib/utils'

function WeatherRateStrip() {
  const { data: weather } = useWeather()
  const { data: rates } = useRates()

  const parts: string[] = []
  if (weather) {
    const desc = WEATHER_CODES[weather.weathercode] ?? 'Variable'
    parts.push(`Brussels: ${weather.temperature}°C, ${desc.toLowerCase()}`)
  }
  if (rates?.rates?.['USD']) {
    parts.push(`1 EUR = ${rates.rates['USD'].toFixed(2)} USD`)
  }
  if (parts.length === 0) return null

  return (
    <p className="text-walnut dark:text-night-muted text-sm mt-4">
      {parts.join(' · ')}
    </p>
  )
}

const VALUE_CARDS = [
  {
    href: '/answers',
    title: 'Ask anything',
    desc: '23 in-depth answers to the questions every Brussels expat asks — from commune registration to lease law.',
  },
  {
    href: '/events',
    title: 'This week',
    desc: 'Public holidays, markets, runs, and recurring events. Know what is happening before it happens.',
  },
  {
    href: '/connect',
    title: 'Connect',
    desc: 'Community groups, neighbourhood posts, and meetups. The people who have been here longer are happy to help.',
  },
]

const HOW_IT_WORKS = [
  { step: '1', title: 'Get oriented', desc: 'Read the answers. Use the checklist. Compare neighbourhoods.' },
  { step: '2', title: 'Take action', desc: 'Download letter templates. Calculate your costs. Book a viewing.' },
  { step: '3', title: 'Connect', desc: 'Join the community. Post a question. Find your neighbourhood.' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 md:py-32 max-w-4xl mx-auto w-full">
        <p className="text-walnut dark:text-night-muted text-sm uppercase tracking-widest mb-4">
          Brussels Navigator
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-bold text-espresso dark:text-night-text leading-tight mb-6">
          Make Brussels<br />make sense.
        </h1>
        <p className="text-walnut dark:text-night-muted text-lg md:text-xl max-w-lg mb-8">
          The community platform for Brussels expats. Tools, answers, events, and local connections.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/events"
            className="inline-flex items-center justify-center px-8 py-3 bg-espresso text-cream rounded-full font-medium hover:bg-ink dark:bg-cream dark:text-espresso dark:hover:bg-stone transition-colors text-sm"
          >
            What is on this week
          </Link>
          <Link
            href="/tools/checklist"
            className="inline-flex items-center justify-center px-8 py-3 border border-espresso/30 dark:border-night-border text-espresso dark:text-night-text rounded-full font-medium hover:bg-sand/50 dark:hover:bg-night-2 transition-colors text-sm"
          >
            I just moved here
          </Link>
        </div>
        <WeatherRateStrip />
      </section>

      {/* Value cards */}
      <section className="px-6 md:px-8 pb-16 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {VALUE_CARDS.map(card => (
            <Link
              key={card.href}
              href={card.href}
              className="group bg-ivory dark:bg-night-1 border border-sand/50 dark:border-night-border rounded-2xl p-6 hover:border-terracotta/30 transition-colors"
            >
              <h2 className="font-display text-xl font-semibold text-espresso dark:text-night-text mb-2 group-hover:text-terracotta transition-colors">
                {card.title}
              </h2>
              <p className="text-walnut dark:text-night-muted text-sm leading-relaxed">{card.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured questions */}
      <section className="px-6 md:px-8 pb-16 max-w-6xl mx-auto w-full">
        <h2 className="font-display text-2xl font-semibold text-espresso dark:text-night-text mb-6">
          Questions everyone asks
        </h2>
        <div className="border border-sand/50 dark:border-night-border rounded-2xl overflow-hidden divide-y divide-sand/50 dark:divide-night-border">
          {FEATURED_QUESTIONS.map((q, i) => (
            <Link
              key={q.slug}
              href={`/answers/${q.slug}`}
              className="flex items-center justify-between px-6 py-4 hover:bg-ivory dark:hover:bg-night-1 transition-colors group"
            >
              <span className="text-espresso dark:text-night-text text-sm font-medium group-hover:text-terracotta transition-colors">
                {q.question}
              </span>
              <span className="text-walnut dark:text-night-muted text-xs ml-4 shrink-0">Read</span>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 md:px-8 pb-16 max-w-6xl mx-auto w-full">
        <h2 className="font-display text-2xl font-semibold text-espresso dark:text-night-text mb-8">
          How it works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOW_IT_WORKS.map(item => (
            <div key={item.step} className="flex gap-4">
              <span className="font-display text-4xl font-bold text-terracotta/30 leading-none shrink-0">
                {item.step}
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-espresso dark:text-night-text mb-1">
                  {item.title}
                </h3>
                <p className="text-walnut dark:text-night-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
