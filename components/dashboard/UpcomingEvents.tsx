'use client'

import Link from 'next/link'
import { EVENTS_2026 } from '@/lib/constants'
import { Badge } from '@/components/ui/Badge'
import { ArrowRight } from 'lucide-react'
import { format, parseISO, isAfter, startOfToday } from 'date-fns'
import type { BadgeVariant } from '@/lib/types'

const TYPE_VARIANT: Record<string, BadgeVariant> = {
  holiday: 'amber',
  event: 'emerald',
  info: 'sky',
}

export function UpcomingEvents() {
  const today = startOfToday()
  const upcoming = EVENTS_2026
    .filter(e => {
      const d = parseISO(e.date)
      return isAfter(d, today) || e.date === today.toISOString().slice(0, 10)
    })
    .slice(0, 5)

  return (
    <div className="bg-surface-1 border border-border rounded-xl shadow-card">
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <p className="text-xs font-display font-semibold uppercase tracking-widest text-content-3">Upcoming</p>
        <Link href="/calendar" className="text-xs text-amber hover:text-amber-dark flex items-center gap-1 transition-colors">
          Full calendar <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="divide-y divide-border">
        {upcoming.map(event => (
          <div key={`${event.date}-${event.title}`} className="px-4 py-3 flex items-start gap-3">
            <div className="shrink-0 w-10 text-center">
              <p className="text-[10px] text-content-4 uppercase">{format(parseISO(event.date), 'MMM')}</p>
              <p className="text-lg font-display font-bold text-content leading-none">{format(parseISO(event.date), 'd')}</p>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <p className="text-sm font-medium text-content">{event.title}</p>
                <Badge variant={TYPE_VARIANT[event.type] ?? 'neutral'}>{event.type}</Badge>
              </div>
              <p className="text-xs text-content-3 mt-0.5 line-clamp-1">{event.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
