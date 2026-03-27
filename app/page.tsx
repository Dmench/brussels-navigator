'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Footer } from '@/components/layout/Footer'
import { GUIDES } from '@/lib/guides'
import { useWeather } from '@/lib/hooks/use-weather'
import { useRates } from '@/lib/hooks/use-rates'
import { getWeatherLabel } from '@/lib/constants'

const NAV_CARDS = [
  {
    label: 'Getting started',
    title: 'Plan your move',
    desc: 'Checklist, plan builder, and templates for your first 90 days',
    href: '/plan',
  },
  {
    label: 'Where to live',
    title: 'Neighbourhoods',
    desc: 'Compare the 10 best communes for expats, with rent data and ratings',
    href: '/neighborhoods',
  },
  {
    label: 'Reading',
    title: 'Guides',
    desc: 'In-depth articles on registration, housing, taxes, and immigration',
    href: '/guides',
  },
  {
    label: 'Brussels now',
    title: 'This week',
    desc: 'Events, news, and what is happening in Brussels right now',
    href: '/events',
  },
]

function WeatherCurrencyStrip() {
  const { data: weather } = useWeather()
  const { data: rates } = useRates()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null

  const parts: string[] = []
  if (weather) {
    parts.push(`Brussels ${weather.temperature}°C · ${getWeatherLabel(weather.weathercode)}`)
  }
  if (rates?.rates.USD) {
    parts.push(`1 EUR = ${rates.rates.USD.toFixed(2)} USD`)
  }
  if (!parts.length) return null

  return (
    <p className="text-sm font-body text-walnut dark:text-night-muted">
      {parts.map((p, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-3 text-stone dark:text-night-border">·</span>}
          {p}
        </span>
      ))}
    </p>
  )
}

export default function LandingPage() {
  const featuredGuide = GUIDES[0]

  return (
    <div className="min-h-screen bg-cream dark:bg-night text-espresso dark:text-night-text font-body">
      {/* Header */}
      <header className="sticky top-0 z-50 h-16 bg-cream/90 dark:bg-night/90 backdrop-blur-xl border-b border-sand/50 dark:border-night-border flex items-center px-6 md:px-8">
        <span className="font-display font-semibold text-lg text-ink dark:text-night-text tracking-tight flex-1">
          Brussels Navigator
        </span>
        <div className="flex items-center gap-4">
          <Link
            href="/plan"
            className="hidden sm:block text-sm font-body text-walnut hover:text-espresso dark:text-night-muted dark:hover:text-night-text transition-colors"
          >
            Get started
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 md:px-8 pt-20 md:pt-32 pb-16 md:pb-24">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-ink dark:text-night-text tracking-tight leading-[0.95] mb-8">
              Your guide<br />to Brussels.
            </h1>
            <p className="text-base md:text-lg font-body font-light text-walnut dark:text-night-muted leading-relaxed max-w-xl mb-10">
              Everything you need to move to, settle in, and enjoy living in Brussels. Neighbourhood guides, setup checklists, cost calculators, and an events calendar — all in one place.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/plan">
                <Button size="lg" className="flex items-center gap-2">
                  Build your plan <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/guides">
                <Button variant="secondary" size="lg">
                  Explore guides
                </Button>
              </Link>
            </div>
          </div>

          {/* Weather / currency strip */}
          <div className="mt-14 pt-6 border-t border-sand/50 dark:border-night-border">
            <WeatherCurrencyStrip />
          </div>
        </section>

        {/* Navigation grid */}
        <section className="max-w-6xl mx-auto px-6 md:px-8 pb-20 md:pb-28">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {NAV_CARDS.map(card => (
              <Link
                key={card.href}
                href={card.href}
                className="group block bg-ivory dark:bg-night-1 border border-sand/50 dark:border-night-border rounded-2xl p-8 hover:border-terracotta/30 dark:hover:border-terracotta/30 transition-colors duration-300"
              >
                <p className="text-xs font-body font-medium uppercase tracking-[0.2em] text-walnut dark:text-night-muted mb-3">
                  {card.label}
                </p>
                <h2 className="text-xl font-display font-medium text-ink dark:text-night-text mb-2 group-hover:text-terracotta transition-colors duration-300">
                  {card.title}
                </h2>
                <p className="text-sm font-body font-light text-walnut dark:text-night-muted leading-relaxed">
                  {card.desc}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured guide */}
        <section className="max-w-6xl mx-auto px-6 md:px-8 pb-20 md:pb-28">
          <div className="border-t border-sand/50 dark:border-night-border pt-12 md:pt-16">
            <p className="text-xs font-body font-medium uppercase tracking-[0.2em] text-walnut dark:text-night-muted mb-8">
              From the guides
            </p>
            <div className="max-w-2xl">
              <Link href={`/guides/${featuredGuide.slug}`} className="group">
                <p className="text-xs font-body text-terracotta mb-3">{featuredGuide.category}</p>
                <h2 className="text-2xl md:text-3xl font-display font-medium text-ink dark:text-night-text leading-tight mb-4 group-hover:text-terracotta transition-colors duration-300">
                  {featuredGuide.title}
                </h2>
                <p className="text-base font-body font-light text-walnut dark:text-night-muted leading-relaxed mb-5">
                  {featuredGuide.excerpt}
                </p>
                <span className="text-sm font-body text-terracotta group-hover:underline underline-offset-4 transition-all">
                  Read the guide
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="max-w-6xl mx-auto px-6 md:px-8 pb-20 md:pb-28">
          <div className="border-t border-sand/50 dark:border-night-border pt-12 md:pt-16">
            <p className="text-xs font-body font-medium uppercase tracking-[0.2em] text-walnut dark:text-night-muted mb-8">
              Pricing
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
              {/* Free */}
              <div className="bg-ivory dark:bg-night-1 border border-sand/50 dark:border-night-border rounded-2xl p-7">
                <p className="text-xl font-display font-medium text-ink dark:text-night-text mb-1">Free</p>
                <p className="text-sm text-walnut dark:text-night-muted mb-5 font-light">Everything you need to get settled.</p>
                <ul className="space-y-2 mb-6">
                  {['Setup checklist', 'Events calendar', 'Neighbourhood guides', 'Cost calculator', 'Housing links', '2 letter templates', 'Interactive map'].map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm font-body text-espresso dark:text-night-text font-light">
                      <div className="w-1 h-1 rounded-full bg-sage shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/plan">
                  <Button variant="secondary" size="sm">Start free</Button>
                </Link>
              </div>

              {/* Pro */}
              <div className="bg-ivory dark:bg-night-1 border border-terracotta/20 rounded-2xl p-7">
                <div className="flex items-baseline gap-2 mb-1">
                  <p className="text-xl font-display font-medium text-ink dark:text-night-text">Navigator Pro</p>
                </div>
                <p className="text-sm font-body font-light text-terracotta mb-1">€9 / month</p>
                <p className="text-sm text-walnut dark:text-night-muted mb-5 font-light">For expats settling in long-term.</p>
                <ul className="space-y-2 mb-6">
                  {['All 7 letter templates (EN/FR)', 'Downloadable checklist PDF', 'Commune comparison export', 'Weekly events digest', '12 months of updates'].map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm font-body text-espresso dark:text-night-text font-light">
                      <div className="w-1 h-1 rounded-full bg-terracotta shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button variant="secondary" size="sm" disabled>Coming soon</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
