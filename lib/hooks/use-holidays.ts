'use client'

import { useState, useEffect } from 'react'
import { EVENTS_2026 } from '../constants'

const CACHE_KEY = 'bn-holidays'
const TTL = 24 * 60 * 60 * 1000

interface MergedEvent {
  date: string
  title: string
  type: 'holiday' | 'event' | 'info'
  desc: string
  source: 'static' | 'api'
}

export function useHolidays() {
  const [events, setEvents] = useState<MergedEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const base: MergedEvent[] = EVENTS_2026.map(e => ({ ...e, source: 'static' as const }))

    try {
      const raw = localStorage.getItem(CACHE_KEY)
      if (raw) {
        const { data, ts } = JSON.parse(raw)
        if (Date.now() - ts < TTL) {
          setEvents(merge(base, data))
          setLoading(false)
          return
        }
      }
    } catch {}

    fetch('https://date.nager.at/api/v3/PublicHolidays/2026/BE', {
      signal: AbortSignal.timeout(5000),
    })
      .then(r => r.json())
      .then(json => {
        try { localStorage.setItem(CACHE_KEY, JSON.stringify({ data: json, ts: Date.now() })) } catch {}
        setEvents(merge(base, json))
      })
      .catch(() => { setEvents(base) })
      .finally(() => setLoading(false))
  }, [])

  return { events, loading }
}

function merge(base: MergedEvent[], apiData: { date: string; localName: string; name: string }[]): MergedEvent[] {
  const existingDates = new Set(base.map(e => e.date))
  const extra: MergedEvent[] = apiData
    .filter(h => !existingDates.has(h.date))
    .map(h => ({
      date: h.date,
      title: h.localName || h.name,
      type: 'holiday' as const,
      desc: 'Belgian public holiday.',
      source: 'api' as const,
    }))
  return [...base, ...extra].sort((a, b) => a.date.localeCompare(b.date))
}
