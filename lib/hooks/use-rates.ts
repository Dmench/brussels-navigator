'use client'
import { useState, useEffect, useCallback } from 'react'
import type { ExchangeRates } from '../types'

const CACHE_KEY = 'bn-rates'
const CACHE_TTL = 4 * 60 * 60 * 1000 // 4 hours

interface CacheEntry {
  data: ExchangeRates
  timestamp: number
}

export function useRates() {
  const [data, setData] = useState<ExchangeRates | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchRates() {
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

      try {
        const res = await fetch('https://api.frankfurter.dev/v2/latest?base=EUR', {
          signal: AbortSignal.timeout(5000),
        })
        if (!res.ok) throw new Error('Rates fetch failed')
        const json = await res.json()

        const ratesData: ExchangeRates = {
          base: json.base ?? 'EUR',
          date: json.date ?? '',
          rates: json.rates ?? {},
        }

        try {
          const entry: CacheEntry = { data: ratesData, timestamp: Date.now() }
          localStorage.setItem(CACHE_KEY, JSON.stringify(entry))
        } catch {}

        if (!cancelled) {
          setData(ratesData)
          setLoading(false)
        }
      } catch {
        if (!cancelled) {
          setError('Rates unavailable')
          setLoading(false)
        }
      }
    }

    fetchRates()
    return () => { cancelled = true }
  }, [])

  const convert = useCallback((eur: number, currency: string): number | null => {
    if (!data?.rates) return null
    const rate = data.rates[currency]
    if (rate == null) return null
    return Math.round(eur * rate * 100) / 100
  }, [data])

  return { data, loading, error, convert }
}
