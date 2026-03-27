'use client'

import { useEvents } from '@/lib/hooks/use-events'
import { useNews } from '@/lib/hooks/use-news'
import { ExternalLink, AlertTriangle, Newspaper, Calendar, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

function timeAgo(utcSeconds: number): string {
  const diff = Math.floor(Date.now() / 1000 - utcSeconds)
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

function formatEventDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric' })
}

export default function ThisWeekPage() {
  const { data: events, loading: eventsLoading, error: eventsError } = useEvents()
  const { data: news, loading: newsLoading, error: newsError } = useNews()

  return (
    <div className="animate-fade-up space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-content">This Week in Brussels</h1>
        <p className="text-sm text-content-3 mt-0.5">Live events, community news, and transport alerts.</p>
      </div>

      {/* Transport Alerts */}
      <div className="bg-amber-soft border border-amber-border rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-4 h-4 text-amber shrink-0" />
          <p className="text-xs font-display font-semibold uppercase tracking-widest text-amber">Transport Alerts</p>
        </div>
        <p className="text-sm text-content-2">
          Check{' '}
          <a
            href="https://www.stib-mivb.be/article.html?l=en&_guid=7a7d49ae-3fc7-365d-9e07-a16f9463555d"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber underline underline-offset-2 hover:text-amber-dark transition-colors"
          >
            STIB/MIVB live disruptions ↗
          </a>{' '}
          for real-time metro, tram, and bus updates.
        </p>
        <p className="text-xs text-content-4 mt-1">
          Also:{' '}
          <a href="https://www.infrabel.be/en" target="_blank" rel="noopener noreferrer" className="hover:text-content-2 transition-colors">Infrabel (trains)</a>
          {' · '}
          <a href="https://www.flixbus.be" target="_blank" rel="noopener noreferrer" className="hover:text-content-2 transition-colors">FlixBus</a>
          {' · '}
          <a href="https://www.brussels-airport.be" target="_blank" rel="noopener noreferrer" className="hover:text-content-2 transition-colors">Brussels Airport</a>
        </p>
      </div>

      {/* Events */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-4 h-4 text-content-3" />
          <h2 className="text-sm font-display font-semibold uppercase tracking-widest text-content-3">Upcoming Events</h2>
          {eventsError && <span className="text-xs text-content-4 ml-auto">{eventsError}</span>}
        </div>

        {eventsLoading ? (
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 bg-surface-2 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="bg-surface-1 border border-border rounded-xl shadow-card divide-y divide-border overflow-hidden">
            {events.map(event => (
              <a
                key={event.id}
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 hover:bg-surface-2 transition-colors group"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-content group-hover:text-amber transition-colors truncate">{event.name}</p>
                  <p className="text-xs text-content-4 mt-0.5">
                    {formatEventDate(event.date)} · {event.venue}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-surface-3 text-content-3">
                    {event.category}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-content-4 group-hover:text-content-2 transition-colors" />
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* News / Reddit digest */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Newspaper className="w-4 h-4 text-content-3" />
          <h2 className="text-sm font-display font-semibold uppercase tracking-widest text-content-3">r/brussels Digest</h2>
          {newsError && <span className="text-xs text-content-4 ml-auto">{newsError}</span>}
        </div>

        {newsLoading ? (
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-14 bg-surface-2 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="bg-surface-1 border border-border rounded-xl shadow-card divide-y divide-border overflow-hidden">
            {news.map(item => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 px-4 py-3 hover:bg-surface-2 transition-colors group"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-content group-hover:text-amber transition-colors leading-snug">
                    {item.title}
                  </p>
                  <p className="text-xs text-content-4 mt-0.5">
                    ↑ {item.score} · {item.comments} comments · {timeAgo(item.created)}
                  </p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-content-4 group-hover:text-content-2 transition-colors mt-0.5 shrink-0" />
              </a>
            ))}
          </div>
        )}

        <p className="text-xs text-content-4 mt-2 text-center">
          Live from{' '}
          <a href="https://reddit.com/r/brussels" target="_blank" rel="noopener noreferrer" className="hover:text-content-2 transition-colors">
            r/brussels
          </a>
          {' · '}
          <a href="https://reddit.com/r/belgium" target="_blank" rel="noopener noreferrer" className="hover:text-content-2 transition-colors">
            r/belgium
          </a>
        </p>
      </section>

      {/* Community links */}
      <section className="pb-4">
        <div className="bg-surface-1 border border-border rounded-xl p-4 shadow-card">
          <p className="text-xs font-display font-semibold uppercase tracking-widest text-content-3 mb-3">More Community Channels</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Expats in Brussels FB', url: 'https://www.facebook.com/groups/expatsinbrussels' },
              { label: 'InterNations Brussels', url: 'https://www.internations.org/brussels-expats' },
              { label: 'Brussels Expats Meetup', url: 'https://www.meetup.com/brussels-expats' },
              { label: 'EU Bubble Slack', url: 'https://eububble.slack.com' },
            ].map(link => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-content-3 hover:text-content transition-colors"
              >
                <ExternalLink className="w-3 h-3 shrink-0" />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
