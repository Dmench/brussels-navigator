'use client'
import { useState, useEffect } from 'react'
import { EVENTS_2026 } from '../constants'

export interface CalendarEvent {
  date: string
  title: string
  type: 'holiday' | 'event'
  desc: string
  source?: 'static' | 'nager'
}

const CACHE_KEY = 'bn-holidays'
const CACHE_TTL = 24 * 60 * 60 * 1000 // 24 hours

interface CacheEntry {
  events: CalendarEvent[]
  timestamp: number
}

export function useHolidays() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function fetchHolidays() {
      // Check cache
      try {
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
          const entry: CacheEntry = JSON.parse(cached)
          if (Date.now() - entry.timestamp < CACHE_TTL) {
            if (!cancelled) {
              setEvents(entry.events)
              setLoading(false)
            }
            return
          }
        }
      } catch {}

      // Start with static events
      const staticEvents: CalendarEvent[] = EVENTS_2026.map(e => ({
        date: e.date,
        title: e.title,
        type: e.type,
        desc: e.desc,
        source: 'static' as const,
      }))

      try {
        const res = await fetch('https://date.nager.at/api/v3/PublicHolidays/2026/BE', {
          signal: AbortSignal.timeout(5000),
        })
        if (res.ok) {
          const nagerHolidays: Array<{ date: string; localName: string; name: string }> = await res.json()
          const existingDates = new Set(staticEvents.map(e => e.date))

          const nagerEvents: CalendarEvent[] = nagerHolidays
            .filter(h => !existingDates.has(h.date))
            .map(h => ({
              date: h.date,
              title: h.localName || h.name,
              type: 'holiday' as const,
              desc: `Public holiday — ${h.name}`,
              source: 'nager' as const,
            }))

          const merged = [...staticEvents, ...nagerEvents].sort((a, b) =>
            a.date.localeCompare(b.date)
          )

          try {
            const entry: CacheEntry = { events: merged, timestamp: Date.now() }
            localStorage.setItem(CACHE_KEY, JSON.stringify(entry))
          } catch {}

          if (!cancelled) {
            setEvents(merged)
            setLoading(false)
          }
          return
        }
      } catch {}

      // Fallback to static only
      const sorted = staticEvents.sort((a, b) => a.date.localeCompare(b.date))
      try {
        const entry: CacheEntry = { events: sorted, timestamp: Date.now() }
        localStorage.setItem(CACHE_KEY, JSON.stringify(entry))
      } catch {}

      if (!cancelled) {
        setEvents(sorted)
        setLoading(false)
      }
    }

    fetchHolidays()
    return () => { cancelled = true }
  }, [])

  return { events, loading }
}
