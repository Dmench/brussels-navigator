'use client'

import { useState, useEffect, useCallback } from 'react'
import type { ExchangeRates } from '../types'

const CACHE_KEY = 'bn-rates'
const TTL = 4 * 60 * 60 * 1000

export function useRates() {
  const [data, setData] = useState<ExchangeRates | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CACHE_KEY)
      if (raw) {
        const { data: d, ts } = JSON.parse(raw)
        if (Date.now() - ts < TTL) {
          setData(d)
          setLoading(false)
          return
        }
      }
    } catch {}

    fetch('https://api.frankfurter.dev/v2/latest?base=EUR', {
      signal: AbortSignal.timeout(5000),
    })
      .then(r => r.json())
      .then(json => {
        const d: ExchangeRates = { base: 'EUR', date: json.date, rates: json.rates }
        try { localStorage.setItem(CACHE_KEY, JSON.stringify({ data: d, ts: Date.now() })) } catch {}
        setData(d)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const convert = useCallback((eur: number, toCurrency: string): number | null => {
    if (!data) return null
    const rate = data.rates[toCurrency]
    return rate ? Math.round(eur * rate) : null
  }, [data])

  return { data, loading, convert }
}
