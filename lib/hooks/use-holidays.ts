'use client'

import { useState, useEffect } from 'react'
import { EVENTS_2026 } from '../constants'

interface NagerHoliday {
  date: string
  localName: string
  name: string
  fixed: boolean
  global: boolean
}

const CACHE_KEY = 'holidays-cache'
const CACHE_TTL = 24 * 60 * 60 * 1000 // 24 hours

export function useHolidays() {
  const [merged, setMerged] = useState(EVENTS_2026)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function fetchHolidays() {
      try {
        try {
          const cached = localStorage.getItem(CACHE_KEY)
          if (cached) {
            const entry = JSON.parse(cached)
            if (Date.now() - entry.timestamp < CACHE_TTL) {
              if (!cancelled) {
                setMerged(entry.data)
                setLoading(false)
              }
              return
            }
          }
        } catch {}

        const res = await fetch('https://date.nager.at/api/v3/PublicHolidays/2026/BE')
        if (!res.ok) throw new Error('Failed')
        const nagerHolidays: NagerHoliday[] = await res.json()

        // Merge: add any holidays from Nager that aren't in our static data
        const existingDates = new Set(EVENTS_2026.filter(e => e.type === 'holiday').map(e => e.date))
        const toAdd = nagerHolidays
          .filter(h => !existingDates.has(h.date))
          .map(h => ({
            date: h.date,
            title: h.name,
            type: 'holiday' as const,
            desc: `Public holiday: ${h.localName}`,
          }))

        const result = [...EVENTS_2026, ...toAdd].sort((a, b) => a.date.localeCompare(b.date))

        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ data: result, timestamp: Date.now() }))
        } catch {}

        if (!cancelled) {
          setMerged(result)
          setLoading(false)
        }
      } catch {
        if (!cancelled) setLoading(false)
      }
    }

    fetchHolidays()
    return () => { cancelled = true }
  }, [])

  return { events: merged, loading }
}
