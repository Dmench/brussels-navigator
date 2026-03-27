'use client'

import { useState } from 'react'
import { useHolidays } from '@/lib/hooks/use-holidays'
import { format, parseISO } from 'date-fns'
import { cn } from '@/lib/utils'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const TYPES = ['all', 'holiday', 'event', 'info'] as const
type Filter = typeof TYPES[number]

const TYPE_LABELS = {
  holiday: 'Public holiday',
  event: 'Event',
  info: 'Information',
}

export default function CalendarPage() {
  const { events, loading } = useHolidays()
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null)
  const [filter, setFilter] = useState<Filter>('all')

  const filtered = events.filter(e => {
    const month = parseISO(e.date).getMonth()
    if (selectedMonth !== null && month !== selectedMonth) return false
    if (filter !== 'all' && e.type !== filter) return false
    return true
  })

  return (
    <div>
      <p className="text-xs font-body font-medium uppercase tracking-[0.2em] text-walnut dark:text-night-muted mb-3">Planning</p>
      <h1 className="text-3xl md:text-4xl font-display font-semibold text-ink dark:text-night-text mb-8">Brussels calendar 2026</h1>

      {/* Month selector */}
      <div className="flex flex-wrap gap-x-5 gap-y-1 mb-6">
        <button
          onClick={() => setSelectedMonth(null)}
          className={cn(
            'text-sm font-body pb-0.5 transition-colors duration-200',
            selectedMonth === null
              ? 'text-espresso dark:text-night-text border-b border-espresso dark:border-night-text'
              : 'text-walnut dark:text-night-muted hover:text-espresso dark:hover:text-night-text'
          )}
        >
          All
        </button>
        {MONTHS.map((m, i) => (
          <button
            key={m}
            onClick={() => setSelectedMonth(selectedMonth === i ? null : i)}
            className={cn(
              'text-sm font-body pb-0.5 transition-colors duration-200',
              selectedMonth === i
                ? 'text-espresso dark:text-night-text border-b border-espresso dark:border-night-text'
                : 'text-walnut dark:text-night-muted hover:text-espresso dark:hover:text-night-text'
            )}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Type filter */}
      <div className="flex flex-wrap gap-3 mb-10">
        {TYPES.map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={cn(
              'text-[11px] font-body font-medium uppercase tracking-[0.15em] px-3 py-1 rounded-full border transition-colors duration-200',
              filter === t
                ? 'border-espresso dark:border-night-text text-espresso dark:text-night-text bg-espresso/5 dark:bg-night-text/5'
                : 'border-sand dark:border-night-border text-walnut dark:text-night-muted hover:border-stone'
            )}
          >
            {t === 'all' ? 'All types' : TYPE_LABELS[t]}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => <div key={i} className="h-16 bg-sand/40 dark:bg-night-1 rounded-xl animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-sm font-body font-light text-walnut dark:text-night-muted">No events match your filters.</p>
      ) : (
        <div className="border border-sand/50 dark:border-night-border rounded-xl overflow-hidden divide-y divide-sand/50 dark:divide-night-border">
          {filtered.map((event, i) => (
            <div key={`${event.date}-${i}`} className="flex items-start gap-5 px-5 py-5 bg-ivory dark:bg-night-1">
              <div className="shrink-0 w-12 text-center">
                <p className="text-[10px] font-body uppercase text-walnut dark:text-night-muted">{format(parseISO(event.date), 'MMM')}</p>
                <p className="text-xl font-display font-semibold text-ink dark:text-night-text leading-none">{format(parseISO(event.date), 'd')}</p>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <p className="text-sm font-body font-medium text-espresso dark:text-night-text">{event.title}</p>
                  <span className={cn(
                    'text-[10px] font-body uppercase tracking-[0.1em] px-2 py-0.5 rounded-full',
                    event.type === 'holiday' && 'bg-terracotta/10 text-terracotta',
                    event.type === 'event' && 'bg-sage/10 text-sage',
                    event.type === 'info' && 'bg-sky/10 text-sky',
                  )}>
                    {TYPE_LABELS[event.type]}
                  </span>
                </div>
                <p className="text-xs font-body font-light text-walnut dark:text-night-muted leading-relaxed">{event.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs font-body text-walnut dark:text-night-muted mt-6 leading-relaxed">
        Dates marked as approximate should be confirmed on official websites. Public holidays verified for Belgium 2026.
      </p>
    </div>
  )
}
