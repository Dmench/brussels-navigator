'use client'
import Link from 'next/link'
import { EVENTS_2026, RECURRING_EVENTS, COMMUNES, WEATHER_CODES, LOCAL_CREATORS } from '@/lib/constants'
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
    <div className="bg-white border border-sand/40 rounded-2xl p-5">
      <p className="text-walnut text-sm">Weather unavailable</p>
    </div>
  )

  const desc = WEATHER_CODES[data.weathercode] ?? 'Variable'

  return (
    <div className="bg-white border border-sand/40 rounded-2xl p-5">
      <p className="text-walnut text-xs uppercase tracking-widest mb-1">Brussels now</p>
      <div className="flex items-baseline gap-2">
        <span className="font-display text-4xl font-bold text-espresso">{data.temperature}°C</span>
        <span className="text-walnut text-sm">{desc}</span>
      </div>
      {data.daily && (
        <div className="flex gap-3 mt-3">
          {data.daily.max.slice(0, 5).map((max, i) => (
            <div key={i} className="text-center">
              <p className="text-walnut text-xs">
                {new Date(Date.now() + i * 86400000).toLocaleDateString('en-GB', { weekday: 'short' })}
              </p>
              <p className="text-espresso text-sm font-medium">{max}°</p>
              <p className="text-walnut text-xs">{data.daily!.min[i]}°</p>
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
    <>
      {/* Full-bleed gradient header */}
      <div style={{ background: 'linear-gradient(135deg, #F7F4EE 0%, #E8D5C4 50%, #DBBFA8 100%)' }} className="px-6 md:px-8 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest mb-2 text-walnut/70">Explore Brussels</p>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-espresso leading-tight">
            What is on
          </h1>
        </div>
      </div>
      {/* Fade */}
      <div style={{ height: 40, background: 'linear-gradient(to bottom, #DBBFA8, #FDFBF7)' }} />

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">

            {/* Coming up */}
            <section>
              <h2 className="font-display text-2xl font-semibold text-espresso mb-4">
                Coming up
              </h2>
              <div className="border border-sand/30 rounded-2xl overflow-hidden divide-y divide-sand/30">
                {upcomingEvents.map(event => (
                  <div key={event.date + event.title} className="flex gap-4 px-5 py-4">
                    <div className="w-20 shrink-0">
                      <p className="text-xs text-walnut">{formatDate(event.date)}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-medium text-espresso">{event.title}</p>
                        <Badge variant={event.type === 'holiday' ? 'holidays' : 'events'}>
                          {event.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-walnut">{event.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <Link href="/events" className="text-terracotta text-sm hover:text-terracotta-dark transition-colors link-hover">
                  See full events calendar
                </Link>
              </div>
            </section>

            {/* Local voices */}
            <section>
              <h2 className="font-display text-2xl font-semibold text-espresso mb-2">
                Local voices
              </h2>
              <p className="text-walnut text-sm mb-5">People who live here and share the good stuff.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {LOCAL_CREATORS.map(creator => (
                  <div
                    key={creator.handle}
                    className="bg-white border border-sand/40 rounded-2xl p-4"
                  >
                    <p className="font-medium text-espresso text-sm mb-1">{creator.handle}</p>
                    <p className="text-walnut text-xs mb-2">{creator.platform}</p>
                    <p className="text-walnut text-xs leading-relaxed mb-3">{creator.desc}</p>
                    <a
                      href={creator.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-terracotta text-xs hover:text-terracotta-dark transition-colors link-hover"
                    >
                      Follow
                    </a>
                  </div>
                ))}
              </div>
            </section>

            {/* Recurring events */}
            <section>
              <h2 className="font-display text-2xl font-semibold text-espresso mb-4">
                Every week
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {RECURRING_EVENTS.slice(0, 3).map(event => (
                  <div
                    key={event.title}
                    className="bg-white border border-sand/40 rounded-2xl p-4"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-espresso">{event.title}</p>
                      <Badge>{event.day}</Badge>
                    </div>
                    <p className="text-xs text-walnut mb-1">{event.time} · {event.location}</p>
                    <p className="text-xs text-walnut">{event.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Neighbourhood spotlight */}
            <section>
              <h2 className="font-display text-2xl font-semibold text-espresso mb-4">
                Neighbourhood spotlight
              </h2>
              <div className="bg-white border border-sand/40 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-espresso">
                      {featuredCommune.name}
                    </h3>
                    <p className="text-walnut text-sm">{featuredCommune.vibe}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-terracotta font-display text-lg font-semibold">€{featuredCommune.rent}</p>
                    <p className="text-walnut text-xs">avg 1BR/month</p>
                  </div>
                </div>
                <p className="text-walnut text-sm leading-relaxed mb-4">
                  {featuredCommune.desc}
                </p>
                <Link href="/tools/neighborhoods" className="text-terracotta text-sm hover:text-terracotta-dark transition-colors link-hover">
                  See all neighbourhoods
                </Link>
              </div>
            </section>

            {/* News links */}
            <section>
              <h2 className="font-display text-2xl font-semibold text-espresso mb-4">
                English news
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="https://www.brusselstimes.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-sand/40 rounded-2xl p-4 hover:border-terracotta/40 transition-colors group"
                >
                  <p className="font-medium text-espresso text-sm group-hover:text-terracotta transition-colors">The Brussels Times</p>
                  <p className="text-walnut text-xs mt-1">English-language Belgian news</p>
                </a>
                <a
                  href="https://www.thebulletin.be/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-sand/40 rounded-2xl p-4 hover:border-terracotta/40 transition-colors group"
                >
                  <p className="font-medium text-espresso text-sm group-hover:text-terracotta transition-colors">The Bulletin</p>
                  <p className="text-walnut text-xs mt-1">English-language magazine on Belgian life</p>
                </a>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <WeatherCard />

            <div className="bg-white border border-sand/40 rounded-2xl p-5">
              <p className="text-walnut text-xs uppercase tracking-widest mb-3">Transport</p>
              <div className="space-y-2">
                <a
                  href="https://www.stib-mivb.be/index.htm?l=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-espresso hover:text-terracotta transition-colors link-hover"
                >
                  STIB real-time departures
                </a>
                <a
                  href="https://www.belgiantrain.be/en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-espresso hover:text-terracotta transition-colors link-hover"
                >
                  SNCB train schedule
                </a>
              </div>
              <p className="text-walnut text-xs mt-3 leading-relaxed">
                Belgium has frequent strikes. Check STIB alerts and RTBF/VRT for announcements.
              </p>
              <Link href="/answers/how-to-deal-with-strikes" className="text-terracotta text-xs mt-2 inline-block hover:text-terracotta-dark transition-colors link-hover">
                How to deal with strikes
              </Link>
            </div>

            <div className="bg-white border border-sand/40 rounded-2xl p-5">
              <p className="text-walnut text-xs uppercase tracking-widest mb-3">Quick links</p>
              <div className="space-y-2">
                <Link href="/tools/checklist" className="block text-sm text-espresso hover:text-terracotta transition-colors link-hover">Setup checklist</Link>
                <Link href="/tools/calculator" className="block text-sm text-espresso hover:text-terracotta transition-colors link-hover">Cost calculator</Link>
                <Link href="/answers" className="block text-sm text-espresso hover:text-terracotta transition-colors link-hover">Browse all answers</Link>
                <Link href="/connect" className="block text-sm text-espresso hover:text-terracotta transition-colors link-hover">Community groups</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
