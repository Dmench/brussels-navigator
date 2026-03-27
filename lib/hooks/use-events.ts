'use client'

import { useState, useEffect } from 'react'

export interface LiveEvent {
  id: string
  name: string
  date: string
  venue: string
  url: string
  category: string
}

const CACHE_KEY = 'brussels-live-events'
const CACHE_TTL = 2 * 60 * 60 * 1000 // 2 hours

function loadCache(): { data: LiveEvent[]; ts: number } | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

// Fallback events when API is unavailable
const FALLBACK_EVENTS: LiveEvent[] = [
  {
    id: 'fb-1',
    name: 'Brussels Jazz Weekend',
    date: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
    venue: 'Grand Place & surrounds',
    url: 'https://www.brusselsjazzweekend.be',
    category: 'Music',
  },
  {
    id: 'fb-2',
    name: 'Couleur Café Festival',
    date: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
    venue: 'Tour & Taxis',
    url: 'https://www.couleurcafe.be',
    category: 'Festival',
  },
  {
    id: 'fb-3',
    name: 'Foire du Midi',
    date: new Date(Date.now() + 21 * 86400000).toISOString().slice(0, 10),
    venue: 'Boulevard du Midi',
    url: 'https://www.foiredumidi.be',
    category: 'Fair',
  },
]

export function useEvents() {
  const [data, setData] = useState<LiveEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const cached = loadCache()
    if (cached && Date.now() - cached.ts < CACHE_TTL) {
      setData(cached.data)
      setLoading(false)
      return
    }

    // Eventbrite public search for Brussels events — no API key needed for public listings
    // Falls back to static data if unavailable
    fetch(
      'https://www.eventbriteapi.com/v3/events/search/?location.address=Brussels%2C+Belgium&location.within=10km&start_date.range_start=' +
        new Date().toISOString() +
        '&expand=venue&page_size=6',
      { signal: AbortSignal.timeout(5000) }
    )
      .then(r => {
        if (!r.ok) throw new Error('Eventbrite unavailable')
        return r.json()
      })
      .then(json => {
        const events: LiveEvent[] = (json.events ?? []).slice(0, 6).map((e: Record<string, unknown>) => {
          const startObj = e.start as Record<string, string> | undefined
          const venueObj = e.venue as Record<string, unknown> | undefined
          const nameObj = e.name as Record<string, string> | undefined
          const categoryObj = e.category as Record<string, string> | undefined
          return {
            id: String(e.id),
            name: nameObj?.text ?? 'Event',
            date: startObj?.local?.slice(0, 10) ?? '',
            venue: (venueObj?.name as string) ?? 'Brussels',
            url: String(e.url ?? ''),
            category: categoryObj?.name ?? 'Event',
          }
        })
        const result = events.length ? events : FALLBACK_EVENTS
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ data: result, ts: Date.now() }))
        } catch {}
        setData(result)
        setLoading(false)
      })
      .catch(() => {
        setData(FALLBACK_EVENTS)
        setError('Using sample events — live data unavailable')
        setLoading(false)
      })
  }, [])

  return { data, loading, error }
}
