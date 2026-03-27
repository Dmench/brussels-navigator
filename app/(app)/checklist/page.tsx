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
  const percent = total > 0 ? Math.round((done / total) * 100) : 0

  function toggle(id: string) {
    setCompleted(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  return (
    <div className="max-w-2xl">
      <p className="text-xs font-body font-medium uppercase tracking-[0.2em] text-walnut dark:text-night-muted mb-3">Getting started</p>
      <h1 className="text-3xl md:text-4xl font-display font-semibold text-ink dark:text-night-text mb-3">Your setup checklist</h1>
      <p className="text-base font-body font-light text-walnut dark:text-night-muted leading-relaxed mb-10">
        Most expats complete their Brussels setup in six to eight weeks. Work through these in order.
      </p>

      {/* Progress */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-body text-espresso dark:text-night-text">{done} of {total} completed</span>
          <span className="text-sm font-body font-medium text-terracotta">{percent}%</span>
        </div>
        <div className="w-full h-1 bg-sand dark:bg-night-2 rounded-full overflow-hidden">
          <div
            className={cn('h-full rounded-full transition-all duration-500', percent === 100 ? 'bg-sage' : 'bg-espresso dark:bg-night-text')}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Pro banner at 40%+ */}
      {percent >= 40 && percent < 100 && (
        <div className="mb-8 bg-ivory dark:bg-night-1 border border-terracotta/20 rounded-xl px-5 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-body font-medium text-espresso dark:text-night-text">Great progress.</p>
            <p className="text-xs font-body font-light text-walnut dark:text-night-muted mt-0.5">Unlock all templates and a downloadable PDF with Navigator Pro.</p>
          </div>
          <span className="shrink-0 text-xs font-body font-medium text-terracotta hover:underline underline-offset-2 cursor-pointer whitespace-nowrap">
            Navigator Pro
          </span>
        </div>
      )}

      {/* Categories */}
      <div className="space-y-8">
        {CHECKLIST.map(category => {
          const catDone = category.items.filter(item => completed.includes(item.id)).length
          return (
            <div key={category.cat}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-display font-medium text-ink dark:text-night-text">{category.cat}</h2>
                <span className="text-xs font-body text-walnut dark:text-night-muted">{catDone} / {category.items.length}</span>
              </div>
              <div className="border border-sand/50 dark:border-night-border rounded-xl overflow-hidden divide-y divide-sand/50 dark:divide-night-border">
                {category.items.map(item => {
                  const isDone = completed.includes(item.id)
                  const isExpanded = expanded === item.id
                  const note = profileInfo?.checklist_notes?.[item.id as keyof typeof profileInfo.checklist_notes]

                  return (
                    <div key={item.id} className="bg-ivory dark:bg-night-1 px-5 py-4">
                      <div className="flex items-start gap-4">
                        <button
                          onClick={() => toggle(item.id)}
                          className={cn(
                            'w-5 h-5 rounded border shrink-0 mt-0.5 flex items-center justify-center transition-all duration-200',
                            isDone
                              ? 'bg-espresso dark:bg-night-text border-espresso dark:border-night-text'
                              : 'border-stone dark:border-night-muted hover:border-espresso dark:hover:border-night-text bg-transparent'
                          )}
                          aria-label={isDone ? 'Mark incomplete' : 'Mark complete'}
                        >
                          {isDone && (
                            <svg className="w-3 h-3 text-cream dark:text-night" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                        <div className="flex-1 min-w-0">
                          <button
                            onClick={() => setExpanded(isExpanded ? null : item.id)}
                            className="flex items-center gap-2 text-left w-full"
                          >
                            <span className={cn(
                              'text-sm font-body',
                              isDone ? 'text-walnut dark:text-night-muted line-through' : 'text-espresso dark:text-night-text font-medium'
                            )}>
                              {item.label}
                            </span>
                            {isExpanded
                              ? <ChevronUp className="w-3.5 h-3.5 text-stone dark:text-night-muted shrink-0" />
                              : <ChevronDown className="w-3.5 h-3.5 text-stone dark:text-night-muted shrink-0" />
                            }
                          </button>
                          {isExpanded && (
                            <div className="mt-3 space-y-3">
                              <p className="text-sm font-body font-light text-walnut dark:text-night-muted leading-relaxed">{item.desc}</p>
                              {note && (
                                <div className="border-l-2 border-terracotta/30 pl-3">
                                  <p className="text-xs font-body text-terracotta leading-relaxed">
                                    <span className="font-medium">For you: </span>{note}
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
      </div>
      <p className="text-xs font-body text-center text-stone dark:text-night-muted mt-10">Progress saved in your browser automatically.</p>
    </div>
  )
}
