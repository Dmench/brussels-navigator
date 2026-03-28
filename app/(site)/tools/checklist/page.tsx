'use client'
import { useState } from 'react'
import { SETUP_CHECKLIST } from '@/lib/constants'
import { cn } from '@/lib/utils'

// Flatten all items for progress tracking
const ALL_ITEMS = SETUP_CHECKLIST.flatMap(phase => phase.items.map(item => item.id))
const TOTAL = ALL_ITEMS.length

function CheckIcon() {
  return (
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14" height="14" viewBox="0 0 14 14" fill="none"
      className={cn('transition-transform duration-200 shrink-0', open && 'rotate-180')}
    >
      <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function ChecklistPage() {
  const [completed, setCompleted] = useState<string[]>(() => {
    if (typeof window === 'undefined') return []
    try {
      return JSON.parse(localStorage.getItem('bubl-checklist') ?? '[]')
    } catch { return [] }
  })
  const [expanded, setExpanded] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  // Hydration-safe: use useEffect to read localStorage
  if (typeof window !== 'undefined' && !mounted) {
    setMounted(true)
  }

  function toggle(id: string) {
    setCompleted(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      try { localStorage.setItem('bubl-checklist', JSON.stringify(next)) } catch {}
      return next
    })
  }

  function toggleExpand(id: string) {
    setExpanded(prev => prev === id ? null : id)
  }

  const completedCount = completed.length
  const progressPct = Math.round((completedCount / TOTAL) * 100)

  return (
    <div>
      <p className="text-walnut text-xs uppercase tracking-widest mb-2">Tools</p>
      <h1 className="font-display text-4xl md:text-5xl font-bold text-espresso mb-4">
        Setup checklist
      </h1>
      <p className="text-walnut text-base max-w-xl mb-8 leading-relaxed">
        Most people finish their Brussels setup in six to eight weeks. Work through these in the order shown — and don't stress, everyone figures it out.
      </p>

      {/* Progress */}
      <div className="mb-10 max-w-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-walnut">{completedCount} of {TOTAL} complete</span>
          <span className="text-sm font-medium text-espresso">{progressPct}%</span>
        </div>
        <div className="h-2 bg-sand rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progressPct}%`,
              background: progressPct === 100
                ? 'linear-gradient(to right, #C4704B, #7A9E7E)'
                : '#C4704B',
            }}
          />
        </div>
        {completedCount === TOTAL && completedCount > 0 && (
          <p className="text-sage text-sm mt-2 font-medium">All done. Welcome to Brussels.</p>
        )}
      </div>

      {/* Phases */}
      <div className="max-w-2xl space-y-8">
        {SETUP_CHECKLIST.map(phase => (
          <div key={phase.phase} className="bg-ivory border border-sand/30 rounded-2xl overflow-hidden">
            {/* Phase header */}
            <div className="px-6 py-5 border-b border-sand/30">
              <h2 className="font-display text-xl font-semibold text-espresso mb-1">
                {phase.phase}
              </h2>
              <p className="text-walnut text-sm">{phase.intro}</p>
            </div>

            {/* Items */}
            <div className="divide-y divide-sand/30">
              {phase.items.map(item => {
                const isComplete = completed.includes(item.id)
                const isExpanded = expanded === item.id
                const hasDetails = item.desc || item.tip || item.links.length > 0

                return (
                  <div key={item.id}>
                    {/* Main row */}
                    <div className="flex items-start gap-3 px-5 py-4">
                      {/* Checkbox */}
                      <button
                        onClick={() => toggle(item.id)}
                        className={cn(
                          'mt-0.5 w-5 h-5 rounded border shrink-0 flex items-center justify-center transition-colors',
                          isComplete
                            ? 'bg-sage border-sage'
                            : 'border-sand hover:border-terracotta/50'
                        )}
                        aria-label={isComplete ? 'Mark incomplete' : 'Mark complete'}
                      >
                        {isComplete && <CheckIcon />}
                      </button>

                      {/* Label */}
                      <button
                        onClick={() => hasDetails && toggleExpand(item.id)}
                        className={cn(
                          'flex-1 text-left text-sm leading-relaxed transition-colors',
                          isComplete ? 'text-walnut/60 line-through' : 'text-espresso',
                          hasDetails && 'cursor-pointer'
                        )}
                      >
                        {item.label}
                      </button>

                      {/* Expand toggle */}
                      {hasDetails && (
                        <button
                          onClick={() => toggleExpand(item.id)}
                          className="text-walnut hover:text-espresso transition-colors mt-0.5"
                          aria-label="Toggle details"
                        >
                          <ChevronIcon open={isExpanded} />
                        </button>
                      )}
                    </div>

                    {/* Expanded details */}
                    {isExpanded && hasDetails && (
                      <div className="px-5 pb-5 ml-8 space-y-3">
                        {item.desc && (
                          <p className="text-sm text-walnut leading-relaxed">{item.desc}</p>
                        )}
                        {item.tip && (
                          <div className="bg-sage-light rounded-xl px-4 py-3">
                            <p className="text-xs text-espresso/80 leading-relaxed">
                              <span className="font-medium text-sage">Tip: </span>
                              {item.tip}
                            </p>
                          </div>
                        )}
                        {item.links.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {item.links.map(link => (
                              <a
                                key={link.url}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-terracotta hover:text-terracotta-dark transition-colors link-hover border border-terracotta/20 rounded-full px-3 py-1"
                              >
                                {link.text}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Reset */}
      {completedCount > 0 && (
        <div className="mt-8 max-w-2xl">
          <button
            onClick={() => {
              setCompleted([])
              try { localStorage.removeItem('bubl-checklist') } catch {}
            }}
            className="text-walnut text-sm hover:text-espresso transition-colors"
          >
            Reset checklist
          </button>
        </div>
      )}
    </div>
  )
}
