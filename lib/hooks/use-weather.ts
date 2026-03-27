'use client'

import { useState, useEffect } from 'react'
import type { WeatherData } from '../types'

const CACHE_KEY = 'bn-weather'
const TTL = 30 * 60 * 1000

export function useWeather() {
  const [data, setData] = useState<WeatherData | null>(null)
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

    fetch('https://api.open-meteo.com/v1/forecast?latitude=50.846&longitude=4.352&current=temperature_2m,weathercode,windspeed_10m&timezone=Europe%2FBrussels', {
      signal: AbortSignal.timeout(5000),
    })
      .then(r => r.json())
      .then(json => {
        const d: WeatherData = {
          temperature: Math.round(json.current.temperature_2m),
          weathercode: json.current.weathercode,
          windspeed: Math.round(json.current.windspeed_10m),
        }
        try { localStorage.setItem(CACHE_KEY, JSON.stringify({ data: d, ts: Date.now() })) } catch {}
        setData(d)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return { data, loading }
}
