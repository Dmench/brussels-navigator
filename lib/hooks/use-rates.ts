'use client'

import { useState, useEffect } from 'react'
import type { ExchangeRates } from '../types'

const CACHE_KEY = 'rates-cache'
const CACHE_TTL = 4 * 60 * 60 * 1000 // 4 hours

interface CacheEntry {
  data: ExchangeRates
  timestamp: number
}

export function useRates() {
  const [data, setData] = useState<ExchangeRates | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function fetchRates() {
      try {
        try {
          const cached = localStorage.getItem(CACHE_KEY)
          if (cached) {
            const entry: CacheEntry = JSON.parse(cached)
            if (Date.now() - entry.timestamp < CACHE_TTL) {
              if (!cancelled) {
                setData(entry.data)
                setLoading(false)
              }
              return
            }
          }
        } catch {}

        const res = await fetch('https://api.frankfurter.dev/v2/latest?base=EUR')
        if (!res.ok) throw new Error('Failed')
        const json = await res.json()

        const rates: ExchangeRates = {
          base: 'EUR',
          date: json.date,
          rates: json.rates,
        }

        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ data: rates, timestamp: Date.now() }))
        } catch {}

        if (!cancelled) {
          setData(rates)
          setLoading(false)
        }
      } catch {
        if (!cancelled) {
          setError(true)
          setLoading(false)
        }
      }
    }

    fetchRates()
    return () => { cancelled = true }
  }, [])

  function convert(eur: number, currency: string): number | null {
    if (!data || currency === 'EUR') return eur
    const rate = data.rates[currency]
    if (!rate) return null
    return Math.round(eur * rate * 100) / 100
  }

  function formatConverted(eur: number, currency: string): string | null {
    const converted = convert(eur, currency)
    if (converted === null) return null
    return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(converted)
  }

  return { data, loading, error, convert, formatConverted }
}
