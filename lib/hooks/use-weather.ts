'use client'
import { useState, useEffect } from 'react'
import type { WeatherData } from '../types'

const CACHE_KEY = 'bn-weather'
const CACHE_TTL = 30 * 60 * 1000 // 30 minutes

interface CacheEntry {
  data: WeatherData
  timestamp: number
}

export function useWeather() {
  const [data, setData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchWeather() {
      try {
        // Check cache
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
        const url = 'https://api.open-meteo.com/v1/forecast?latitude=50.85&longitude=4.35&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=Europe/Brussels&forecast_days=5'
        const res = await fetch(url, { signal: AbortSignal.timeout(5000) })
        if (!res.ok) throw new Error('Weather fetch failed')
        const json = await res.json()

        const weatherData: WeatherData = {
          temperature: Math.round(json.current?.temperature_2m ?? 0),
          weathercode: json.current?.weather_code ?? 0,
          daily: json.daily ? {
            max: json.daily.temperature_2m_max?.map((t: number) => Math.round(t)) ?? [],
            min: json.daily.temperature_2m_min?.map((t: number) => Math.round(t)) ?? [],
            codes: json.daily.weather_code ?? [],
          } : undefined,
        }

        try {
          const entry: CacheEntry = { data: weatherData, timestamp: Date.now() }
          localStorage.setItem(CACHE_KEY, JSON.stringify(entry))
        } catch {}

        if (!cancelled) {
          setData(weatherData)
          setLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError('Weather unavailable')
          setLoading(false)
        }
      }
    }

    fetchWeather()
    return () => { cancelled = true }
  }, [])

  return { data, loading, error }
}
