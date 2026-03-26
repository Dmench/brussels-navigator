'use client'

import { useState } from 'react'
import { CHECKLIST, PROFILES } from '@/lib/constants'
import { useChecklist, useProfile } from '@/lib/hooks/use-preferences'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

const ALL_ITEMS = CHECKLIST.flatMap(cat => [...cat.items] as { id: string; label: string; desc: string }[])

export default function ChecklistPage() {
  const [completed, setCompleted] = useChecklist()
  const [profile] = useProfile()
  const [expanded, setExpanded] = useState<string | null>(null)
  const profileInfo = profile ? PROFILES[profile] : null

  const total = ALL_ITEMS.length
  const done = completed.filter(id => ALL_ITEMS.some(item => item.id === id)).length
  const percent = Math.round((done / total) * 100)

  function toggle(id: string) {
    setCompleted(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  return (
    <div className="animate-fade-up space-y-4">
      <div>
        <h1 className="text-2xl font-display font-bold text-content">Setup Checklist</h1>
        <p className="text-sm text-content-3 mt-0.5">Everything you need to do in your first 90 days.</p>
      </div>

      <div className="bg-surface-1 border border-border rounded-xl p-4 shadow-card">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-content">{done} / {total} completed</span>
          <span className={cn('text-sm font-bold font-display', percent === 100 ? 'text-emerald' : 'text-amber')}>
            {percent}%
          </span>
        </div>
        <div className="h-2 bg-surface-3 rounded-full overflow-hidden">
          <div
            className={cn('h-full rounded-full transition-all duration-500', percent === 100 ? 'bg-emerald' : 'bg-amber')}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {CHECKLIST.map(category => {
        const catDone = category.items.filter(item => completed.includes(item.id)).length
        return (
          <div key={category.cat} className="bg-surface-1 border border-border rounded-xl shadow-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <p className="text-xs font-display font-semibold uppercase tracking-widest text-content-3">{category.cat}</p>
              <span className="text-xs text-content-4">{catDone}/{category.items.length}</span>
            </div>
            <div className="divide-y divide-border">
              {category.items.map(item => {
                const isDone = completed.includes(item.id)
                const isExpanded = expanded === item.id
                const note = profileInfo?.checklist_notes?.[item.id as keyof typeof profileInfo.checklist_notes]

                return (
                  <div key={item.id} className="px-4 py-3">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggle(item.id)}
                        className={cn(
                          'w-5 h-5 rounded border-2 shrink-0 mt-0.5 flex items-center justify-center transition-all duration-150',
                          isDone
                            ? 'bg-emerald border-emerald text-surface-0'
                            : 'border-border-active hover:border-border-hover bg-transparent'
                        )}
                        aria-label={isDone ? 'Mark incomplete' : 'Mark complete'}
                      >
                        {isDone && (
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        <button
                          onClick={() => setExpanded(isExpanded ? null : item.id)}
                          className="flex items-center gap-1.5 text-left w-full"
                        >
                          <span className={cn('text-sm font-medium', isDone ? 'text-content-3 line-through' : 'text-content')}>
                            {item.label}
                          </span>
                          {isExpanded
                            ? <ChevronUp className="w-3 h-3 text-content-4 shrink-0" />
                            : <ChevronDown className="w-3 h-3 text-content-4 shrink-0" />
                          }
                        </button>
                        {isExpanded && (
                          <div className="mt-2 space-y-2">
                            <p className="text-xs text-content-3 leading-relaxed">{item.desc}</p>
                            {note && (
                              <div className="bg-amber-soft border border-amber-border rounded-lg px-3 py-2">
                                <p className="text-[11px] text-amber leading-relaxed">
                                  <span className="font-bold">For you: </span>{note}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}

      <p className="text-xs text-content-4 text-center pb-4">Progress saved in your browser automatically.</p>
    </div>
  )
}
