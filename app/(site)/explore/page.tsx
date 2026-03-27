'use client'
import Link from 'next/link'
import { EVENTS_2026, RECURRING_EVENTS, COMMUNES, WEATHER_CODES } from '@/lib/constants'
import { useWeather } from '@/lib/hooks/use-weather'
import { Badge } from '@/components/ui/Badge'
import { Skeleton } from '@/components/ui/Skeleton'

function getUpcomingEvents() {
  const today = new Date().toISOString().split('T')[0]
  return [...EVENTS_2026]
    .filter(e => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5)
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
}

function WeatherCard() {
  const { data, loading } = useWeather()

  if (loading) return <Skeleton className="h-24 w-full" />

  if (!data) return (
    <div className="bg-ivory dark:bg-night-1 border border-sand/50 dark:border-night-border rounded-2xl p-5">
      <p className="text-walnut dark:text-night-muted text-sm">Weather unavailable</p>
    </div>
  )

  const desc = WEATHER_CODES[data.weathercode] ?? 'Variable'

  return (
    <div className="bg-ivory dark:bg-night-1 border border-sand/50 dark:border-night-border rounded-2xl p-5">
      <p className="text-walnut dark:text-night-muted text-xs uppercase tracking-widest mb-1">Brussels now</p>
      <div className="flex items-baseline gap-2">
        <span className="font-display text-4xl font-bold text-espresso dark:text-night-text">{data.temperature}°C</span>
        <span className="text-walnut dark:text-night-muted text-sm">{desc}</span>
      </div>
      {data.daily && (
        <div className="flex gap-3 mt-3">
          {data.daily.max.slice(0, 5).map((max, i) => (
            <div key={i} className="text-center">
              <p className="text-walnut dark:text-night-muted text-xs">
                {new Date(Date.now() + i * 86400000).toLocaleDateString('en-GB', { weekday: 'short' })}
              </p>
              <p className="text-espresso dark:text-night-text text-sm font-medium">{max}°</p>
              <p className="text-walnut dark:text-night-muted text-xs">{data.daily!.min[i]}°</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function ExplorePage() {
  const upcomingEvents = getUpcomingEvents()
  const featuredCommune = COMMUNES[0]

  return (
    <div>
      <p className="text-walnut dark:text-night-muted text-xs uppercase tracking-widest mb-2">Explore Brussels</p>
      <h1 className="font-display text-4xl md:text-5xl font-bold text-espresso dark:text-night-text mb-10">
        What is on
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-10">

          {/* This week */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-espresso dark:text-night-text mb-4">
              Coming up
            </h2>
            <div className="border border-sand/50 dark:border-night-border rounded-2xl overflow-hidden divide-y divide-sand/50 dark:divide-night-border">
              {upcomingEvents.map(event => (
                <div key={event.date + event.title} className="flex gap-4 px-5 py-4">
                  <div className="w-20 shrink-0">
                    <p className="text-xs text-walnut dark:text-night-muted">{formatDate(event.date)}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-medium text-espresso dark:text-night-text">{event.title}</p>
                      <Badge variant={event.type === 'holiday' ? 'sage' : 'terracotta'}>
                        {event.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-walnut dark:text-night-muted">{event.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <Link href="/events" className="text-terracotta text-sm hover:text-terracotta-dark transition-colors">
                See full events calendar
              </Link>
            </div>
          </section>

          {/* Recurring events */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-espresso dark:text-night-text mb-4">
              Every week
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {RECURRING_EVENTS.slice(0, 3).map(event => (
                <div
                  key={event.title}
                  className="bg-ivory dark:bg-night-1 border border-sand/50 dark:border-night-border rounded-2xl p-4"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-espresso dark:text-night-text">{event.title}</p>
                    <Badge>{event.day}</Badge>
                  </div>
                  <p className="text-xs text-walnut dark:text-night-muted mb-1">{event.time} · {event.location}</p>
                  <p className="text-xs text-walnut dark:text-night-muted">{event.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Neighbourhood spotlight */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-espresso dark:text-night-text mb-4">
              Neighbourhood spotlight
            </h2>
            <div className="bg-ivory dark:bg-night-1 border border-sand/50 dark:border-night-border rounded-2xl p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-display text-xl font-semibold text-espresso dark:text-night-text">
                    {featuredCommune.name}
                  </h3>
                  <p className="text-walnut dark:text-night-muted text-sm">{featuredCommune.vibe}</p>
                </div>
                <div className="text-right">
                  <p className="text-terracotta font-display text-lg font-semibold">€{featuredCommune.rent}</p>
                  <p className="text-walnut dark:text-night-muted text-xs">avg 1BR/month</p>
                </div>
              </div>
              <p className="text-walnut dark:text-night-muted text-sm leading-relaxed mb-4">
                {featuredCommune.desc}
              </p>
              <Link href="/tools/neighborhoods" className="text-terracotta text-sm hover:text-terracotta-dark transition-colors">
                See all neighbourhoods
              </Link>
            </div>
          </section>

          {/* News links */}
          <section>
            <h2 className="font-display text-2xl font-semibold text-espresso dark:text-night-text mb-4">
              English news
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="https://www.brusselstimes.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ivory dark:bg-night-1 border border-sand/50 dark:border-night-border rounded-2xl p-4 hover:border-terracotta/30 transition-colors group"
              >
                <p className="font-medium text-espresso dark:text-night-text text-sm group-hover:text-terracotta transition-colors">The Brussels Times</p>
                <p className="text-walnut dark:text-night-muted text-xs mt-1">English-language Belgian news</p>
              </a>
              <a
                href="https://www.thebulletin.be/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ivory dark:bg-night-1 border border-sand/50 dark:border-night-border rounded-2xl p-4 hover:border-terracotta/30 transition-colors group"
              >
                <p className="font-medium text-espresso dark:text-night-text text-sm group-hover:text-terracotta transition-colors">The Bulletin</p>
                <p className="text-walnut dark:text-night-muted text-xs mt-1">English-language magazine on Belgian life</p>
              </a>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <WeatherCard />

          {/* Transport */}
          <div className="bg-ivory dark:bg-night-1 border border-sand/50 dark:border-night-border rounded-2xl p-5">
            <p className="text-walnut dark:text-night-muted text-xs uppercase tracking-widest mb-3">Transport</p>
            <div className="space-y-2">
              <a
                href="https://www.stib-mivb.be/index.htm?l=en"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-espresso dark:text-night-text hover:text-terracotta transition-colors"
              >
                STIB real-time departures
              </a>
              <a
                href="https://www.belgiantrain.be/en"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-espresso dark:text-night-text hover:text-terracotta transition-colors"
              >
                SNCB train schedule
              </a>
            </div>
            <p className="text-walnut dark:text-night-muted text-xs mt-3 leading-relaxed">
              Belgium has frequent strikes. Check STIB alerts and RTBF/VRT for announcements.
            </p>
            <Link href="/answers/how-to-deal-with-strikes" className="text-terracotta text-xs mt-2 inline-block hover:text-terracotta-dark transition-colors">
              How to deal with strikes
            </Link>
          </div>

          {/* Quick links */}
          <div className="bg-ivory dark:bg-night-1 border border-sand/50 dark:border-night-border rounded-2xl p-5">
            <p className="text-walnut dark:text-night-muted text-xs uppercase tracking-widest mb-3">Quick links</p>
            <div className="space-y-2">
              <Link href="/tools/checklist" className="block text-sm text-espresso dark:text-night-text hover:text-terracotta transition-colors">Setup checklist</Link>
              <Link href="/tools/calculator" className="block text-sm text-espresso dark:text-night-text hover:text-terracotta transition-colors">Cost calculator</Link>
              <Link href="/answers" className="block text-sm text-espresso dark:text-night-text hover:text-terracotta transition-colors">Browse all answers</Link>
              <Link href="/connect" className="block text-sm text-espresso dark:text-night-text hover:text-terracotta transition-colors">Community groups</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
