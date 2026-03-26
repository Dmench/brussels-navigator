'use client'

import { useWeather } from '@/lib/hooks/use-weather'
import { getWeatherCode } from '@/lib/constants'
import { Skeleton } from '@/components/ui/Skeleton'
import { Wind, Droplets } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

export function WeatherCard() {
  const { data, loading, error } = useWeather()

  if (error) {
    return (
      <div className="bg-surface-1 border border-border rounded-xl p-4 shadow-card">
        <p className="text-xs text-content-3">Weather unavailable · Open-Meteo</p>
      </div>
    )
  }

  if (loading || !data) {
    return (
      <div className="bg-surface-1 border border-border rounded-xl p-4 shadow-card space-y-3">
        <Skeleton className="h-12 w-32" />
        <Skeleton className="h-4 w-48" />
        <div className="flex gap-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-16 flex-1" />
          ))}
        </div>
      </div>
    )
  }

  const current = data.current
  const { emoji, label } = getWeatherCode(current.weatherCode)

  return (
    <div className="bg-surface-1 border border-border rounded-xl p-4 shadow-card">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-4xl font-display font-bold text-content">{current.temp}°C</span>
            <span className="text-2xl">{emoji}</span>
          </div>
          <p className="text-sm text-content-2 mt-0.5">{label}</p>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="flex items-center gap-1 text-xs text-content-3">
              <Wind className="w-3 h-3" /> {current.windSpeed} km/h
            </span>
            <span className="flex items-center gap-1 text-xs text-content-3">
              <Droplets className="w-3 h-3" /> {current.humidity}%
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-display font-semibold text-content-3 uppercase tracking-widest">Brussels</p>
          <p className="text-[10px] text-content-4 mt-0.5">Open-Meteo · live</p>
        </div>
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {data.daily.slice(0, 7).map((day, i) => (
          <div
            key={day.date}
            className={cn(
              'flex-1 min-w-[44px] flex flex-col items-center gap-1 p-1.5 rounded-lg bg-surface-2',
              i === 0 && 'ring-1 ring-amber-border'
            )}
          >
            <p className="text-[9px] font-semibold text-content-3 uppercase">
              {i === 0 ? 'Today' : format(new Date(day.date + 'T12:00:00'), 'EEE')}
            </p>
            <span className="text-sm">{getWeatherCode(day.weatherCode).emoji}</span>
            <p className="text-[10px] font-bold text-content">{day.tempMax}°</p>
            <p className="text-[10px] text-content-4">{day.tempMin}°</p>
            {day.precipitation > 25 && (
              <p className="text-[9px] text-sky">{day.precipitation}%</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
