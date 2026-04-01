'use client'
import Link from 'next/link'
import { useWeather } from '@/lib/hooks/use-weather'
import { useRates } from '@/lib/hooks/use-rates'
import { EVENTS_2026, WEATHER_CODES } from '@/lib/constants'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Badge } from '@/components/ui/Badge'

// ─── Data ────────────────────────────────────────────────────────────────────

const ANSWERS_WITH_SUMMARIES = [
  {
    slug: 'how-to-register-commune',
    question: 'How do I register at my commune?',
    summary: 'What documents to bring, how the police visit works, and when you collect your eID.',
    tag: 'Administration',
    time: '5 min',
  },
  {
    slug: 'which-neighbourhood',
    question: 'Which Brussels neighbourhood should I live in?',
    summary: 'A practical breakdown of rent, vibe, transit links, and who each commune actually suits.',
    tag: 'Housing',
    time: '7 min',
  },
  {
    slug: 'cost-of-living',
    question: 'How much does it cost to live in Brussels?',
    summary: 'Monthly ranges for rent, food, transport, and going out — from budget to comfortable.',
    tag: 'Money',
    time: '4 min',
  },
  {
    slug: 'landlord-wont-fix',
    question: 'My landlord will not fix something. What can I do?',
    summary: 'Your tenant rights under Belgian law and the exact steps to document and escalate.',
    tag: 'Legal',
    time: '6 min',
  },
  {
    slug: 'find-english-doctor',
    question: 'Where do I find an English-speaking doctor?',
    summary: 'How to find a GP near you, what registration looks like, and what your mutuelle covers.',
    tag: 'Health',
    time: '3 min',
  },
]

const TOOL_CARDS = [
  {
    href: '/tools/calculator',
    title: 'Budget calculator',
    outcome: 'Estimate your monthly Brussels cost in 60 seconds',
    meta: 'Rent · Food · Transport · Going out',
  },
  {
    href: '/tools/checklist',
    title: 'Setup checklist',
    outcome: 'Track the 17 steps to getting settled',
    meta: 'Registration · Bank · Mutuelle · eID',
  },
  {
    href: '/tools/templates',
    title: 'Letter templates',
    outcome: 'Copy-ready emails for landlords, communes, and banks',
    meta: 'French and English · Fill and copy',
  },
  {
    href: '/tools/neighborhoods',
    title: 'Neighbourhood guide',
    outcome: 'Compare all 10 communes by rent, transit, and vibe',
    meta: '10 communes · 5 rating factors',
  },
]

const PATH_CARDS = [
  {
    href: '/tools/checklist',
    label: 'I just moved here',
    desc: 'Step-by-step: registration, bank account, mutuelle, lease, and residence card.',
    meta: '17 steps · 6 to 8 weeks',
  },
  {
    href: '/events',
    label: 'I need something this week',
    desc: 'Markets, concerts, runs, workshops, public holidays, and neighbourhood meetups.',
    meta: 'Updated calendar',
  },
  {
    href: '/answers',
    label: 'I need a practical answer',
    desc: 'Commune admin, lease law, Belgian tax, healthcare, and public transport.',
    meta: '23 in-depth answers',
  },
  {
    href: '/connect',
    label: 'I want to meet people',
    desc: 'Community groups, language exchanges, local voices, and your neighbourhood board.',
    meta: 'Groups · Events · Board',
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getUpcomingEvents(n: number) {
  const today = new Date().toISOString().split('T')[0]
  return [...EVENTS_2026]
    .filter(e => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, n)
}

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-GB', {
    weekday: 'short', day: 'numeric', month: 'short',
  })
}

function WeatherRateStrip() {
  const { data: weather } = useWeather()
  const { data: rates } = useRates()
  const parts: string[] = []
  if (weather) parts.push(`Brussels: ${weather.temperature}°C, ${(WEATHER_CODES[weather.weathercode] ?? 'Variable').toLowerCase()}`)
  if (rates?.rates?.['USD']) parts.push(`1 EUR = ${rates.rates['USD'].toFixed(2)} USD`)
  if (parts.length === 0) return null
  return <p className="text-walnut/60 text-xs mt-4">{parts.join(' · ')}</p>
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const upcomingEvents = getUpcomingEvents(4)
  const nextEvent = upcomingEvents[0]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* ── Hero — compact ─────────────────────────────────────────────────── */}
      <section
        className="text-center px-6 pt-12 pb-10 md:pt-16 md:pb-12"
        style={{ background: 'linear-gradient(165deg, #FDFBF7 0%, #F5E6D8 30%, #EDCBB8 60%, #E8B9A0 100%)' }}
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-terracotta-dark text-xs uppercase tracking-[0.2em] mb-4 font-medium">Bubl</p>
          <h1 className="font-display text-5xl md:text-7xl font-extrabold text-espresso leading-[0.92] mb-5">
            Your Brussels<br />bubble.
          </h1>
          <p className="text-walnut text-base md:text-lg max-w-sm mx-auto mb-7 leading-relaxed">
            Events, answers, local tips, and the tools you actually need. For everyone who lives here.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/events"
              className="inline-flex items-center justify-center px-7 py-2.5 bg-terracotta text-cream rounded-full font-medium hover:bg-terracotta-dark transition-colors text-sm"
            >
              See what's on
            </Link>
            <Link
              href="/tools/checklist"
              className="inline-flex items-center justify-center px-7 py-2.5 border border-espresso/30 text-espresso rounded-full font-medium hover:bg-white/60 transition-colors text-sm"
            >
              I just moved here
            </Link>
          </div>
          <WeatherRateStrip />
        </div>

        {/* Proof strip — 3 live product snapshots */}
        <div className="max-w-4xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          {/* Next event */}
          {nextEvent && (
            <Link
              href="/events"
              className="group bg-white/80 border border-sand/40 rounded-2xl p-4 hover:border-terracotta/40 hover:bg-white transition-all"
            >
              <p className="text-walnut text-xs font-medium uppercase tracking-wide mb-2">Next up</p>
              <p className="text-walnut text-xs mb-1">{formatDate(nextEvent.date)}</p>
              <p className="font-display text-base font-semibold text-espresso group-hover:text-terracotta transition-colors leading-snug mb-1.5">
                {nextEvent.title}
              </p>
              <Badge variant={nextEvent.type === 'holiday' ? 'holidays' : 'events'}>
                {nextEvent.type}
              </Badge>
            </Link>
          )}

          {/* Answer teaser */}
          <Link
            href="/answers/how-to-register-commune"
            className="group bg-white/80 border border-sand/40 rounded-2xl p-4 hover:border-terracotta/40 hover:bg-white transition-all"
          >
            <p className="text-walnut text-xs font-medium uppercase tracking-wide mb-2">Top answer</p>
            <p className="font-display text-base font-semibold text-espresso group-hover:text-terracotta transition-colors leading-snug mb-2">
              How do I register at my commune?
            </p>
            <p className="text-walnut text-xs leading-relaxed">Documents, police visit, eID — the full process.</p>
          </Link>

          {/* Checklist teaser */}
          <Link
            href="/tools/checklist"
            className="group bg-white/80 border border-sand/40 rounded-2xl p-4 hover:border-terracotta/40 hover:bg-white transition-all"
          >
            <p className="text-walnut text-xs font-medium uppercase tracking-wide mb-2">Setup checklist</p>
            <p className="font-display text-base font-semibold text-espresso group-hover:text-terracotta transition-colors leading-snug mb-3">
              17 steps to get settled
            </p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-sand/50 rounded-full overflow-hidden">
                <div className="h-full w-[18%] bg-terracotta rounded-full" />
              </div>
              <span className="text-walnut text-xs shrink-0">Registration to eID</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Fade */}
      <div style={{ height: 60, background: 'linear-gradient(to bottom, #E8B9A0, #FDFBF7)' }} />

      {/* ── Start here ─────────────────────────────────────────────────────── */}
      <section className="px-6 md:px-8 py-12 md:py-16 max-w-6xl mx-auto w-full">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-espresso mb-1">Start here</h2>
        <p className="text-walnut text-sm mb-7">What do you need right now?</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PATH_CARDS.map(card => (
            <Link
              key={card.href}
              href={card.href}
              className="group bg-white border border-sand/40 rounded-2xl p-6 hover:border-terracotta/40 hover:bg-[#FFFCF9] transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg font-semibold text-espresso mb-1.5 group-hover:text-terracotta transition-colors">
                    {card.label}
                  </h3>
                  <p className="text-walnut text-sm leading-relaxed mb-3">{card.desc}</p>
                  <span className="text-xs text-walnut/50 font-medium">{card.meta}</span>
                </div>
                <span className="text-walnut/25 group-hover:text-terracotta/40 transition-colors text-lg mt-0.5 shrink-0">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── This week in Brussels ───────────────────────────────────────────── */}
      <section className="px-6 md:px-8 py-12 md:py-16 max-w-6xl mx-auto w-full">
        <div className="flex items-baseline justify-between mb-5">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-espresso">This week in Brussels</h2>
            <p className="text-walnut text-sm mt-1">Public holidays, key events, and things to know</p>
          </div>
          <Link href="/events" className="text-terracotta text-sm hover:text-terracotta-dark transition-colors link-hover shrink-0 ml-4">
            Full calendar
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {upcomingEvents.map(event => (
            <div key={event.date + event.title} className="bg-white border border-sand/40 rounded-2xl px-5 py-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-walnut bg-sand/40 px-2.5 py-0.5 rounded-full">
                  {formatDate(event.date)}
                </span>
                <Badge variant={event.type === 'holiday' ? 'holidays' : 'events'}>{event.type}</Badge>
              </div>
              <p className="font-display text-base font-semibold text-espresso leading-snug mb-1">{event.title}</p>
              <p className="text-walnut text-xs leading-relaxed">{event.desc}</p>
            </div>
          ))}
        </div>

        {/* Weekly regulars callout */}
        <div className="mt-3 px-5 py-3.5 rounded-2xl border border-sand/40 bg-ivory">
          <p className="text-walnut text-xs leading-relaxed">
            <span className="font-semibold text-espresso">Every Sunday:</span>{' '}
            Flagey Market (food and flowers, Place Flagey) · Midi Market (world food, Gare du Midi)
          </p>
        </div>
      </section>

      {/* ── Most useful answers ─────────────────────────────────────────────── */}
      <section className="px-6 md:px-8 py-12 md:py-16 max-w-6xl mx-auto w-full">
        <div className="flex items-baseline justify-between mb-5">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-espresso">Most useful answers</h2>
            <p className="text-walnut text-sm mt-1">The questions everyone in Brussels eventually asks</p>
          </div>
          <Link href="/answers" className="text-terracotta text-sm hover:text-terracotta-dark transition-colors link-hover shrink-0 ml-4">
            All 23 answers
          </Link>
        </div>

        <div className="space-y-3">
          {ANSWERS_WITH_SUMMARIES.map(a => (
            <Link
              key={a.slug}
              href={`/answers/${a.slug}`}
              className="group flex items-start gap-4 bg-white border border-sand/40 rounded-2xl px-5 py-4 hover:border-terracotta/40 hover:bg-[#FFFCF9] transition-all"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-espresso text-sm mb-1 group-hover:text-terracotta transition-colors leading-snug">
                  {a.question}
                </p>
                <p className="text-walnut text-xs leading-relaxed">{a.summary}</p>
              </div>
              <div className="shrink-0 flex flex-col items-end gap-1.5 pt-0.5">
                <Badge variant={
                  a.tag === 'Administration' ? 'sky'
                  : a.tag === 'Housing' ? 'terracotta'
                  : a.tag === 'Money' ? 'sage'
                  : a.tag === 'Health' ? 'coral'
                  : 'default'
                }>
                  {a.tag}
                </Badge>
                <span className="text-walnut/40 text-xs">{a.time}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Tools that actually help ────────────────────────────────────────── */}
      <section className="px-6 md:px-8 pt-4 pb-16 md:pb-20 max-w-6xl mx-auto w-full">
        <div className="flex items-baseline justify-between mb-5">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-espresso">Tools that actually help</h2>
            <p className="text-walnut text-sm mt-1">Start using them in seconds</p>
          </div>
          <Link href="/tools" className="text-terracotta text-sm hover:text-terracotta-dark transition-colors link-hover shrink-0 ml-4">
            All tools
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TOOL_CARDS.map(tool => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group bg-white border border-sand/40 rounded-2xl p-5 hover:border-terracotta/40 hover:bg-[#FFFCF9] transition-all"
            >
              <p className="font-display text-base font-semibold text-espresso mb-1 group-hover:text-terracotta transition-colors">
                {tool.title}
              </p>
              <p className="text-walnut text-sm leading-relaxed mb-2">{tool.outcome}</p>
              <p className="text-walnut/40 text-xs">{tool.meta}</p>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
