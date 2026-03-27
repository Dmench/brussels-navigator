'use client'

import { useState, useEffect } from 'react'
import { ExternalLink } from 'lucide-react'
import { Skeleton } from '@/components/ui/Skeleton'

interface NewsItem {
  id: string
  title: string
  url: string
  score: number
  comments: number
  created: number
}

const FALLBACK_NEWS: NewsItem[] = [
  { id: 'f1', title: 'Tips for registering at your commune — what to bring and what to expect', url: 'https://www.reddit.com/r/brussels', score: 142, comments: 38, created: Date.now() / 1000 - 86400 },
  { id: 'f2', title: 'Best neighbourhoods for expats in 2025 — a practical comparison', url: 'https://www.reddit.com/r/brussels', score: 203, comments: 54, created: Date.now() / 1000 - 172800 },
  { id: 'f3', title: 'Weekend markets in Brussels — a guide to the best ones', url: 'https://www.reddit.com/r/brussels', score: 87, comments: 22, created: Date.now() / 1000 - 259200 },
]

function timeAgo(utcSeconds: number): string {
  const diff = Math.floor(Date.now() / 1000 - utcSeconds)
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export default function EventsPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [newsLoading, setNewsLoading] = useState(true)
  const [newsError, setNewsError] = useState(false)

  useEffect(() => {
    const cacheKey = 'bn-reddit'
    try {
      const raw = localStorage.getItem(cacheKey)
      if (raw) {
        const { data, ts } = JSON.parse(raw)
        if (Date.now() - ts < 30 * 60 * 1000) {
          setNews(data)
          setNewsLoading(false)
          return
        }
      }
    } catch {}

    fetch('https://www.reddit.com/r/brussels/hot.json?limit=8', {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(5000),
    })
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(json => {
        const posts: NewsItem[] = (json.data?.children ?? [])
          .filter((c: Record<string, unknown>) => !(c.data as Record<string, unknown>).stickied)
          .slice(0, 6)
          .map((c: Record<string, unknown>) => {
            const d = c.data as Record<string, unknown>
            return {
              id: String(d.id),
              title: String(d.title),
              url: d.url ? String(d.url) : `https://reddit.com${d.permalink}`,
              score: Number(d.score ?? 0),
              comments: Number(d.num_comments ?? 0),
              created: Number(d.created_utc ?? 0),
            }
          })
        const result = posts.length ? posts : FALLBACK_NEWS
        try { localStorage.setItem(cacheKey, JSON.stringify({ data: result, ts: Date.now() })) } catch {}
        setNews(result)
      })
      .catch(() => { setNews(FALLBACK_NEWS); setNewsError(true) })
      .finally(() => setNewsLoading(false))
  }, [])

  return (
    <div>
      <p className="text-xs font-body font-medium uppercase tracking-[0.2em] text-walnut dark:text-night-muted mb-3">Brussels now</p>
      <h1 className="text-3xl md:text-4xl font-display font-semibold text-ink dark:text-night-text mb-4">This week in Brussels</h1>
      <p className="text-base font-body font-light text-walnut dark:text-night-muted leading-relaxed mb-12 max-w-xl">
        What is happening in Brussels this week, plus community news and transport information.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-10">
          {/* Reddit digest */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-display font-medium text-ink dark:text-night-text">Community digest</h2>
              {newsError && <span className="text-xs font-body text-walnut dark:text-night-muted">Using cached posts</span>}
            </div>

            {newsLoading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-14" />)}
              </div>
            ) : (
              <div className="border border-sand/50 dark:border-night-border rounded-xl overflow-hidden divide-y divide-sand/50 dark:divide-night-border">
                {news.map(item => (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 px-5 py-4 bg-ivory dark:bg-night-1 hover:bg-sand/30 dark:hover:bg-night-2 transition-colors duration-200 group"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-body text-espresso dark:text-night-text leading-snug mb-1 group-hover:text-terracotta transition-colors">
                        {item.title}
                      </p>
                      <p className="text-xs font-body text-stone dark:text-night-muted">
                        {item.score} points · {item.comments} comments · {timeAgo(item.created)}
                      </p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-stone dark:text-night-muted shrink-0 mt-0.5" />
                  </a>
                ))}
              </div>
            )}
            <p className="text-xs font-body text-walnut dark:text-night-muted mt-3">
              Live from{' '}
              <a href="https://reddit.com/r/brussels" target="_blank" rel="noopener noreferrer" className="text-terracotta hover:underline">r/brussels</a>
              {' and '}
              <a href="https://reddit.com/r/belgium" target="_blank" rel="noopener noreferrer" className="text-terracotta hover:underline">r/belgium</a>
            </p>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Transport */}
          <section>
            <h2 className="text-base font-display font-medium text-ink dark:text-night-text mb-4">Transport</h2>
            <div className="space-y-3">
              {[
                { label: 'STIB/MIVB disruptions', url: 'https://www.stib-mivb.be/article.html?l=en&_guid=7a7d49ae-3fc7-365d-9e07-a16f9463555d', desc: 'Real-time metro, tram, and bus alerts' },
                { label: 'SNCB / Infrabel', url: 'https://www.infrabel.be/en/travellers/what-to-do-when/disruptions', desc: 'National rail disruptions' },
                { label: 'Brussels Airport', url: 'https://www.brusselsairport.be/en/passengers/flight-info/departures', desc: 'Departure information' },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <p className="text-sm font-body font-medium text-espresso dark:text-night-text group-hover:text-terracotta transition-colors flex items-center gap-1">
                    {link.label} <ExternalLink className="w-3 h-3" />
                  </p>
                  <p className="text-xs font-body font-light text-walnut dark:text-night-muted">{link.desc}</p>
                </a>
              ))}
            </div>
          </section>

          {/* Events resources */}
          <section>
            <h2 className="text-base font-display font-medium text-ink dark:text-night-text mb-4">Find events</h2>
            <div className="space-y-3">
              {[
                { label: 'Visit.brussels', url: 'https://visit.brussels/en/events', desc: 'Official Brussels event listings' },
                { label: 'Secret Brussels', url: 'https://secretbrussels.be/en/', desc: 'Curated guide to what is on' },
                { label: 'Eventbrite Brussels', url: 'https://www.eventbrite.be/d/belgium--brussels/events/', desc: 'Community events and networking' },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <p className="text-sm font-body font-medium text-espresso dark:text-night-text group-hover:text-terracotta transition-colors flex items-center gap-1">
                    {link.label} <ExternalLink className="w-3 h-3" />
                  </p>
                  <p className="text-xs font-body font-light text-walnut dark:text-night-muted">{link.desc}</p>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
