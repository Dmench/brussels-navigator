'use client'

import { useState } from 'react'
import { useHolidays } from '@/lib/hooks/use-holidays'
import { Badge } from '@/components/ui/Badge'
import { TAX_RESOURCES } from '@/lib/constants'
import { format, parseISO, getMonth, getYear } from 'date-fns'
import { cn } from '@/lib/utils'
import { ExternalLink } from 'lucide-react'
import type { BadgeVariant } from '@/lib/types'

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
type FilterType = 'all' | 'holiday' | 'event' | 'info'

const TYPE_VARIANT: Record<string, BadgeVariant> = {
  holiday: 'amber',
  event: 'emerald',
  info: 'sky',
}

export default function CalendarPage() {
  const { events } = useHolidays()
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [filter, setFilter] = useState<FilterType>('all')

  const filtered = events.filter(e => {
    const d = parseISO(e.date)
    const monthMatch = getMonth(d) === selectedMonth && getYear(d) === 2026
    const typeMatch = filter === 'all' || e.type === filter
    return monthMatch && typeMatch
  })

  return (
    <div className="animate-fade-up space-y-4">
      <div>
        <h1 className="text-2xl font-display font-bold text-content">2026 Calendar</h1>
        <p className="text-sm text-content-3 mt-0.5">Belgian public holidays and Brussels events.</p>
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {MONTHS.map((m, i) => (
          <button
            key={m}
            onClick={() => setSelectedMonth(i)}
            className={cn(
              'shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold font-display transition-all duration-150',
              selectedMonth === i
                ? 'bg-amber text-surface-0'
                : 'bg-surface-2 text-content-3 border border-border hover:border-border-hover'
            )}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        {(['all', 'holiday', 'event', 'info'] as FilterType[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'px-3 py-1 rounded-full text-xs font-semibold font-display border transition-all duration-150',
              filter === f
                ? 'bg-surface-3 text-content border-border-active'
                : 'bg-transparent text-content-3 border-border hover:border-border-hover'
            )}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="bg-surface-1 border border-border rounded-xl p-8 text-center">
            <p className="text-content-3 text-sm">No events in {MONTHS[selectedMonth]} 2026 for this filter.</p>
          </div>
        ) : (
          filtered.map(event => (
            <div key={`${event.date}-${event.title}`} className="bg-surface-1 border border-border rounded-xl p-4 shadow-card">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-12 text-center bg-surface-2 rounded-lg py-1.5">
                  <p className="text-[9px] text-content-4 uppercase">{format(parseISO(event.date), 'MMM')}</p>
                  <p className="text-xl font-display font-bold text-content leading-none">{format(parseISO(event.date), 'd')}</p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <p className="text-sm font-semibold text-content">{event.title}</p>
                    <Badge variant={TYPE_VARIANT[event.type] ?? 'neutral'}>{event.type}</Badge>
                  </div>
                  <p className="text-xs text-content-3 mt-1 leading-relaxed">{event.desc}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-surface-1 border border-border rounded-xl p-4 shadow-card">
        <p className="text-xs font-display font-semibold uppercase tracking-widest text-content-3 mb-3">Tax Resources</p>
        <div className="space-y-2">
          {TAX_RESOURCES.map(r => (
            <a
              key={r.url}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-surface-2 rounded-lg hover:bg-surface-3 transition-all duration-150 group"
            >
              <div>
                <p className="text-sm font-medium text-content">{r.name}</p>
                <p className="text-xs text-content-3">{r.desc}</p>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-content-4 group-hover:text-content-2 transition-colors shrink-0" />
            </a>
          ))}
        </div>
      </div>

      <p className="text-xs text-content-4 text-center pb-2">
        Public holidays verified via Belgian law. Event dates labeled &quot;approximate&quot; should be confirmed at source.
        Strike dates are unpredictable — check stib-mivb.be or belgiantrain.be.
      </p>
    </div>
  )
}
