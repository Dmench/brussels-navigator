'use client'

import Link from 'next/link'
import { useEvents } from '@/lib/hooks/use-events'
import { ArrowRight, Calendar } from 'lucide-react'

function formatEventDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric' })
}

export function ThisWeekPreview() {
  const { data: events, loading } = useEvents()
  const preview = events.slice(0, 3)

  return (
    <Link
      href="/this-week"
      className="block bg-surface-1 border border-border rounded-xl p-4 shadow-card hover:border-border-hover hover:shadow-card-hover hover:-translate-y-px transition-all duration-150 group"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-content-3" />
          <p className="text-xs font-display font-semibold uppercase tracking-widest text-content-3">This Week</p>
        </div>
        <ArrowRight className="w-4 h-4 text-content-4 group-hover:text-content-2 transition-colors" />
      </div>

      {loading ? (
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-8 bg-surface-3 rounded animate-pulse" />
          ))}
        </div>
      ) : preview.length === 0 ? (
        <p className="text-xs text-content-4">No events found. Check back soon.</p>
      ) : (
        <div className="space-y-2">
          {preview.map(event => (
            <div key={event.id} className="flex items-center justify-between gap-2">
              <p className="text-sm text-content truncate">{event.name}</p>
              <p className="text-xs text-content-4 shrink-0">{formatEventDate(event.date)}</p>
            </div>
          ))}
        </div>
      )}
    </Link>
  )
}
