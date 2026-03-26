'use client'

import { useState, useEffect } from 'react'
import type { WeatherData } from '../types'

const CACHE_KEY = 'weather-cache'
const CACHE_TTL = 30 * 60 * 1000 // 30 min

interface CacheEntry {
  data: WeatherData
  timestamp: number
}

export function useWeather() {
  const [data, setData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function fetchWeather() {
      try {
        // Check cache
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

        const url = 'https://api.open-meteo.com/v1/forecast?latitude=50.8503&longitude=4.3517&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&forecast_days=7&timezone=Europe/Brussels'
        const res = await fetch(url)
        if (!res.ok) throw new Error('Failed')
        const json = await res.json()

        const weather: WeatherData = {
          current: {
            temp: Math.round(json.current.temperature_2m),
            weatherCode: json.current.weather_code,
            windSpeed: Math.round(json.current.wind_speed_10m),
            humidity: Math.round(json.current.relative_humidity_2m),
          },
          daily: json.daily.time.map((date: string, i: number) => ({
            date,
            weatherCode: json.daily.weather_code[i],
            tempMax: Math.round(json.daily.temperature_2m_max[i]),
            tempMin: Math.round(json.daily.temperature_2m_min[i]),
            precipitation: Math.round(json.daily.precipitation_sum[i] * 10) / 10,
          })),
        }

        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ data: weather, timestamp: Date.now() }))
        } catch {}

        if (!cancelled) {
          setData(weather)
          setLoading(false)
        }
      } catch {
        if (!cancelled) {
          setError(true)
          setLoading(false)
        }
      }
    }

    fetchWeather()
    return () => { cancelled = true }
  }, [])

  return { data, loading, error }
}
