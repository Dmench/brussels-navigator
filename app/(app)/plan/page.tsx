'use client'

import { useState, useRef, useCallback } from 'react'
import { PLAN_QUESTIONS, EVENTS_2026 } from '@/lib/constants'
import { getRecommendedCommunes, getTotalMonthlyCost } from '@/lib/plan-logic'
import { useProfile, useWaitlistEmail } from '@/lib/hooks/use-preferences'
import { DotRating } from '@/components/ui/DotRating'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, ArrowRight, ExternalLink, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format, parseISO, isAfter, addMonths, startOfMonth } from 'date-fns'
import type { PlanAnswers, UserProfile, BudgetLevel } from '@/lib/types'

function getNextMonths(count = 6) {
  const months: string[] = []
  let d = startOfMonth(new Date())
  for (let i = 0; i < count; i++) {
    months.push(format(d, 'yyyy-MM'))
    d = addMonths(d, 1)
  }
  return months
}

function ProModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useWaitlistEmail()
  const [saved, setSaved] = useState(false)

  function save() {
    if (email) { setSaved(true) }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-cream dark:bg-night-1 border border-sand/50 dark:border-night-border rounded-2xl p-8 max-w-md w-full"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-xs font-body font-medium uppercase tracking-[0.2em] text-walnut dark:text-night-muted mb-1">Coming soon</p>
            <h3 className="text-2xl font-display font-medium text-ink dark:text-night-text">Navigator Pro</h3>
          </div>
          <button onClick={onClose} className="text-walnut hover:text-espresso dark:text-night-muted transition-colors mt-1">
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm font-body font-light text-walnut dark:text-night-muted leading-relaxed mb-5">
          All seven templates, weekly events digest, admin renewal reminders, and priority updates.
        </p>
        <ul className="space-y-2 mb-6">
          {['All 7 fillable templates (EN/FR)', 'Downloadable checklist PDF', 'Commune comparison export', '12 months of updates'].map(item => (
            <li key={item} className="flex items-center gap-2.5 text-sm font-body text-espresso dark:text-night-text font-light">
              <div className="w-1 h-1 rounded-full bg-terracotta shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        {saved ? (
          <p className="text-sm font-body text-sage font-medium">You are on the list.</p>
        ) : (
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-2.5 bg-ivory dark:bg-night-2 border border-sand dark:border-night-border rounded-full text-espresso dark:text-night-text text-sm placeholder:text-stone dark:placeholder:text-night-muted outline-none focus:border-terracotta/50 transition-colors font-body"
            />
            <Button size="sm" onClick={save}>Join waitlist</Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function PlanPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<PlanAnswers>({})
  const [showResult, setShowResult] = useState(false)
  const [showPro, setShowPro] = useState(false)
  const [sharing, setSharing] = useState(false)
  const [, setProfile] = useProfile()
  const cardRef = useRef<HTMLDivElement>(null)

  const shareCard = useCallback(async () => {
    if (!cardRef.current) return
    setSharing(true)
    try {
      const html2canvas = (await import('html2canvas')).default
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const canvas = await html2canvas(cardRef.current, { scale: 2 } as any)
      const link = document.createElement('a')
      link.download = 'brussels-plan.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch {}
    finally { setSharing(false) }
  }, [])

  const TOTAL = PLAN_QUESTIONS.length
  const question = PLAN_QUESTIONS[step]

  function selectAnswer(qId: string, value: string) {
    const next = { ...answers, [qId]: value }
    setAnswers(next)
    if (qId === 'profile') setProfile(value as UserProfile)
    if (step < TOTAL - 1) setTimeout(() => setStep(s => s + 1), 120)
    else setTimeout(() => setShowResult(true), 120)
  }

  if (showResult) {
    const communes = getRecommendedCommunes(answers, 3)
    const budget = (answers.budget ?? 'moderate') as BudgetLevel
    const total = getTotalMonthlyCost(budget)
    const moveDate = answers.move_date ?? new Date().toISOString().slice(0, 7)
    const moveDateObj = new Date(moveDate + '-01')
    const upcomingEvents = EVENTS_2026.filter(e => isAfter(parseISO(e.date), moveDateObj)).slice(0, 4)

    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={() => { setShowResult(false); setStep(0); setAnswers({}) }}
            className="text-walnut hover:text-espresso dark:text-night-muted dark:hover:text-night-text transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-3xl md:text-4xl font-display font-semibold text-ink dark:text-night-text">Your Brussels plan</h1>
          <button
            onClick={shareCard}
            disabled={sharing}
            className="ml-auto text-xs font-body text-walnut hover:text-espresso dark:text-night-muted dark:hover:text-night-text transition-colors disabled:opacity-40"
          >
            {sharing ? 'Saving…' : 'Save as image'}
          </button>
        </div>

        <div ref={cardRef} className="space-y-6">
          {/* Communes */}
          <div className="bg-ivory dark:bg-night-1 border border-sand/50 dark:border-night-border rounded-2xl p-6 md:p-8">
            <p className="text-xs font-body font-medium uppercase tracking-[0.2em] text-walnut dark:text-night-muted mb-6">Recommended communes</p>
            <div className="space-y-5">
              {communes.map((commune, i) => (
                <div key={commune.id} className={cn(
                  'pb-5 border-b border-sand/50 dark:border-night-border last:border-0 last:pb-0'
                )}>
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-display font-medium text-ink dark:text-night-text">{commune.name}</h3>
                      {i === 0 && <Badge variant="terracotta">Best match</Badge>}
                    </div>
                    <p className="text-xl font-display font-semibold text-terracotta">€{commune.rent}<span className="text-sm font-body font-light text-walnut dark:text-night-muted">/mo</span></p>
                  </div>
                  <p className="text-sm italic font-body text-walnut dark:text-night-muted mb-2">{commune.vibe}</p>
                  <p className="text-sm font-body font-light text-walnut dark:text-night-muted leading-relaxed mb-3">{commune.desc}</p>
                  <div className="flex items-center gap-5 mb-3">
                    {([['Expat', commune.expat], ['Transit', commune.transit], ['Green', commune.green]] as [string, number][]).map(([label, val]) => (
                      <div key={label} className="flex items-center gap-2">
                        <span className="text-xs font-body text-walnut dark:text-night-muted">{label}</span>
                        <DotRating value={val} />
                      </div>
                    ))}
                  </div>
                  <a
                    href={`https://www.immoweb.be/en/search/apartment/for-rent/${commune.immoweb}?countries=BE`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-body text-terracotta hover:underline underline-offset-4 transition-all"
                  >
                    Search on Immoweb <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Cost */}
          <div className="bg-ivory dark:bg-night-1 border border-sand/50 dark:border-night-border rounded-2xl p-6 md:p-8">
            <p className="text-xs font-body font-medium uppercase tracking-[0.2em] text-walnut dark:text-night-muted mb-3">Estimated monthly cost</p>
            <p className="text-4xl font-display font-bold text-terracotta mb-1">€{total.toLocaleString()}</p>
            <p className="text-sm font-body font-light text-walnut dark:text-night-muted">
              Based on {budget} budget — includes rent, food, transport, and essentials.
            </p>
          </div>

          {/* Key dates */}
          {upcomingEvents.length > 0 && (
            <div className="bg-ivory dark:bg-night-1 border border-sand/50 dark:border-night-border rounded-2xl overflow-hidden">
              <div className="px-6 md:px-8 py-5 border-b border-sand/50 dark:border-night-border">
                <p className="text-xs font-body font-medium uppercase tracking-[0.2em] text-walnut dark:text-night-muted">Key dates after you arrive</p>
              </div>
              <div className="divide-y divide-sand/50 dark:divide-night-border">
                {upcomingEvents.map(event => (
                  <div key={`${event.date}-${event.title}`} className="flex items-start gap-5 px-6 md:px-8 py-4">
                    <div className="shrink-0 w-10 text-center">
                      <p className="text-[10px] font-body uppercase text-walnut dark:text-night-muted">{format(parseISO(event.date), 'MMM')}</p>
                      <p className="text-lg font-display font-semibold text-ink dark:text-night-text leading-none">{format(parseISO(event.date), 'd')}</p>
                    </div>
                    <div>
                      <p className="text-sm font-body font-medium text-espresso dark:text-night-text">{event.title}</p>
                      <p className="text-xs font-body font-light text-walnut dark:text-night-muted mt-0.5 leading-relaxed">{event.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Watermark */}
          <p className="text-xs font-body text-center text-stone dark:text-night-muted">brusselsnavigator.com</p>
        </div>

        {/* Pro CTA */}
        <div className="mt-8 bg-ivory dark:bg-night-1 border border-terracotta/20 rounded-2xl p-6 md:p-8 text-center">
          <h3 className="text-xl font-display font-medium text-ink dark:text-night-text mb-2">Get the full move pack</h3>
          <p className="text-sm font-body font-light text-walnut dark:text-night-muted mb-5">
            All 7 fillable templates, downloadable checklist PDF, and commune comparison export.
          </p>
          <Button onClick={() => setShowPro(true)}>
            Navigator Pro — €9/month
          </Button>
        </div>

        {showPro && <ProModal onClose={() => setShowPro(false)} />}
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="mb-10">
        <p className="text-xs font-body font-medium uppercase tracking-[0.2em] text-walnut dark:text-night-muted mb-2">Step {step + 1} of {TOTAL}</p>
        {/* Progress line */}
        <div className="w-full h-px bg-sand dark:bg-night-2 overflow-hidden rounded-full">
          <div
            className="h-full bg-espresso dark:bg-night-text transition-all duration-500"
            style={{ width: `${((step + 1) / TOTAL) * 100}%` }}
          />
        </div>
      </div>

      <h2 className="text-3xl font-display font-semibold text-ink dark:text-night-text mb-10 leading-tight">
        {question.question}
      </h2>

      <div className="space-y-3">
        {'type' in question && question.type === 'month-picker' ? (
          <div className="grid grid-cols-3 gap-3">
            {getNextMonths(6).map(month => (
              <button
                key={month}
                onClick={() => selectAnswer('move_date', month)}
                className={cn(
                  'py-4 rounded-xl border text-center font-display font-medium text-sm transition-colors duration-200',
                  answers.move_date === month
                    ? 'border-espresso dark:border-night-text bg-espresso dark:bg-night-text text-cream dark:text-night'
                    : 'border-sand dark:border-night-border text-espresso dark:text-night-text hover:border-stone dark:hover:border-night-muted bg-ivory dark:bg-night-1'
                )}
              >
                {format(new Date(month + '-01'), 'MMM yyyy')}
              </button>
            ))}
          </div>
        ) : (
          'options' in question && question.options.map(opt => (
            <button
              key={opt.value}
              onClick={() => selectAnswer(question.id, opt.value)}
              className={cn(
                'w-full flex items-center justify-between p-5 rounded-xl border text-left transition-colors duration-200',
                answers[question.id as keyof PlanAnswers] === opt.value
                  ? 'border-espresso dark:border-night-text bg-espresso/5 dark:bg-night-text/5'
                  : 'border-sand dark:border-night-border bg-ivory dark:bg-night-1 hover:border-stone dark:hover:border-night-muted'
              )}
            >
              <span className="text-base font-body font-light text-espresso dark:text-night-text">{opt.label}</span>
              <ArrowRight className="w-4 h-4 text-stone dark:text-night-muted shrink-0" />
            </button>
          ))
        )}
      </div>

      {step > 0 && (
        <button
          onClick={() => setStep(s => s - 1)}
          className="mt-8 flex items-center gap-1.5 text-sm font-body text-walnut hover:text-espresso dark:text-night-muted dark:hover:text-night-text transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      )}
    </div>
  )
}
