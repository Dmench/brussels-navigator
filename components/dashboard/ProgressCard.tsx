'use client'

import Link from 'next/link'
import { useChecklist } from '@/lib/hooks/use-preferences'
import { CHECKLIST } from '@/lib/constants'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const ALL_ITEMS = CHECKLIST.flatMap(cat => [...cat.items] as { id: string; label: string; desc: string }[])

export function ProgressCard() {
  const [completed] = useChecklist()
  const total = ALL_ITEMS.length
  const done = completed.filter(id => ALL_ITEMS.some(item => item.id === id)).length
  const percent = total > 0 ? Math.round((done / total) * 100) : 0

  return (
    <Link
      href="/checklist"
      className="block bg-surface-1 border border-border rounded-xl p-4 shadow-card hover:border-border-hover hover:shadow-card-hover hover:-translate-y-px transition-all duration-150 cursor-pointer group"
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-display font-semibold uppercase tracking-widest text-content-3">Setup Progress</p>
        <ArrowRight className="w-4 h-4 text-content-4 group-hover:text-content-2 transition-colors" />
      </div>
      <div className="flex items-end gap-2 mb-3">
        <span className="text-2xl font-display font-bold text-content">{done}</span>
        <span className="text-sm text-content-3 pb-0.5">/ {total} tasks</span>
        <span className={cn(
          'ml-auto text-sm font-bold font-display',
          percent === 100 ? 'text-emerald' : 'text-amber'
        )}>{percent}%</span>
      </div>
      <div className="h-1.5 bg-surface-3 rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500',
            percent === 100 ? 'bg-emerald' : 'bg-amber'
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
      {done === 0 && (
        <p className="text-xs text-content-4 mt-2">Start your Brussels setup checklist →</p>
      )}
    </Link>
  )
}
