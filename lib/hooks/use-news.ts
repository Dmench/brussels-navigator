'use client'

import { useState, useEffect } from 'react'

export interface NewsItem {
  id: string
  title: string
  url: string
  score: number
  comments: number
  created: number
  author: string
}

const CACHE_KEY = 'brussels-news'
const CACHE_TTL = 30 * 60 * 1000 // 30 minutes

function loadCache(): { data: NewsItem[]; ts: number } | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

const FALLBACK_NEWS: NewsItem[] = [
  {
    id: 'fb-1',
    title: 'Tips for registering at your commune — what to bring',
    url: 'https://www.reddit.com/r/brussels',
    score: 142,
    comments: 38,
    created: Date.now() / 1000 - 86400,
    author: 'expat_helper',
  },
  {
    id: 'fb-2',
    title: 'STIB / MIVB service updates this week',
    url: 'https://www.stib-mivb.be',
    score: 87,
    comments: 12,
    created: Date.now() / 1000 - 172800,
    author: 'transit_watch',
  },
  {
    id: 'fb-3',
    title: 'Best markets in Brussels this weekend',
    url: 'https://www.reddit.com/r/brussels',
    score: 203,
    comments: 54,
    created: Date.now() / 1000 - 259200,
    author: 'weekend_explorer',
  },
]

export function useNews() {
  const [data, setData] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const cached = loadCache()
    if (cached && Date.now() - cached.ts < CACHE_TTL) {
      setData(cached.data)
      setLoading(false)
      return
    }

    // Reddit r/brussels public JSON — no API key needed
    fetch('https://www.reddit.com/r/brussels/hot.json?limit=8', {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(5000),
    })
      .then(r => {
        if (!r.ok) throw new Error('Reddit unavailable')
        return r.json()
      })
      .then(json => {
        const posts: NewsItem[] = (json.data?.children ?? [])
          .filter((c: Record<string, unknown>) => {
            const d = c.data as Record<string, unknown>
            return !d.stickied && !d.is_self === false || true
          })
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
              author: String(d.author ?? ''),
            }
          })
        const result = posts.length ? posts : FALLBACK_NEWS
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ data: result, ts: Date.now() }))
        } catch {}
        setData(result)
        setLoading(false)
      })
      .catch(() => {
        setData(FALLBACK_NEWS)
        setError('Using sample posts — live feed unavailable')
        setLoading(false)
      })
  }, [])

  return { data, loading, error }
}
