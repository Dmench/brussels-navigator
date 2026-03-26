'use client'

import { useState } from 'react'
import { PLAN_QUESTIONS, PROFILES, EVENTS_2026 } from '@/lib/constants'
import { getRecommendedCommunes, getTotalMonthlyCost } from '@/lib/plan-logic'
import { useProfile } from '@/lib/hooks/use-preferences'
import { DotRating } from '@/components/ui/DotRating'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, ExternalLink, Sparkles, X, Check } from 'lucide-react'
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

function UpgradeModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function submit() {
    if (email) {
      try { localStorage.setItem('waitlist-email', email) } catch {}
      setSubmitted(true)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-0/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-surface-1 border border-amber-border rounded-2xl p-6 max-w-md w-full shadow-card-hover animate-slide-up" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-display font-bold text-content">Move Pack — €19</h3>
            <p className="text-xs text-content-3 mt-0.5">All templates, guides, and exports.</p>
          </div>
          <button onClick={onClose} className="text-content-4 hover:text-content-2 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <ul className="space-y-2 mb-5">
          {['All 7 fillable templates (EN/FR)', 'Downloadable checklist PDF', 'Commune comparison export', '12 months of updates'].map(item => (
            <li key={item} className="flex items-center gap-2 text-sm text-content-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        {submitted ? (
          <div className="bg-emerald-soft border border-emerald-border rounded-lg p-3 text-center">
            <p className="text-sm text-emerald font-semibold">You&apos;re on the list!</p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-xs text-content-3">Join the waitlist:</p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 bg-surface-0 border border-border rounded-lg text-content text-sm placeholder:text-content-4 outline-none focus:border-amber focus:ring-1 transition-all duration-150"
              />
              <Button onClick={submit} size="sm">Notify me</Button>
            </div>
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
  const [showUpgrade, setShowUpgrade] = useState(false)
  const [, setProfile] = useProfile()

  const TOTAL_STEPS = PLAN_QUESTIONS.length
  const question = PLAN_QUESTIONS[step]

  function selectAnswer(questionId: string, value: string) {
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)
    if (questionId === 'profile') {
      setProfile(value as UserProfile)
    }
    if (step < TOTAL_STEPS - 1) {
      setTimeout(() => setStep(s => s + 1), 150)
    } else {
      setTimeout(() => setShowResult(true), 150)
    }
  }

  if (showResult) {
    const communes = getRecommendedCommunes(answers, 3)
    const budget = (answers.budget ?? 'moderate') as BudgetLevel
    const total = getTotalMonthlyCost(budget)
    const moveDate = answers.move_date ?? new Date().toISOString().slice(0, 7)
    const moveDateObj = new Date(moveDate + '-01')

    const upcomingEvents = EVENTS_2026
      .filter(e => isAfter(parseISO(e.date), moveDateObj))
      .slice(0, 4)

    return (
      <div className="animate-slide-up space-y-5">
        <div className="flex items-center gap-3">
          <button onClick={() => { setShowResult(false); setStep(0); setAnswers({}) }} className="text-content-4 hover:text-content-2 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-display font-bold text-content">Your Brussels Plan</h1>
        </div>

        {/* Communes */}
        <div className="bg-surface-1 border border-amber-border rounded-xl p-4" style={{ boxShadow: '0 0 20px -5px rgba(245,158,11,0.15)' }}>
          <p className="text-xs font-display font-semibold uppercase tracking-widest text-content-3 mb-3">Recommended Communes</p>
          <div className="space-y-3">
            {communes.map((commune, i) => (
              <div key={commune.id} className={cn(
                'p-3 rounded-xl border',
                i === 0 ? 'bg-amber-soft border-amber-border' : 'bg-surface-2 border-border'
              )}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold font-display text-content">{commune.name}</span>
                      {i === 0 && <Badge variant="amber">Recommended</Badge>}
                    </div>
                    <p className="text-xs italic text-content-3 mt-0.5">{commune.vibe}</p>
                  </div>
                  <p className="text-base font-display font-bold text-amber">€{commune.rent}/mo</p>
                </div>
                <p className="text-xs text-content-2 mt-1.5 mb-2">{commune.desc}</p>
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  {([['Expat', commune.expat], ['Transit', commune.transit], ['Green', commune.green]] as [string, number][]).map(([label, val]) => (
                    <div key={label} className="flex items-center gap-1">
                      <span className="text-[10px] text-content-4">{label}</span>
                      <DotRating value={val} />
                    </div>
                  ))}
                </div>
                <a
                  href={`https://www.immoweb.be/en/search/apartment/for-rent/${commune.immoweb}?countries=BE`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-amber hover:text-amber-dark transition-colors"
                >
                  Search on Immoweb <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Cost */}
        <div className="bg-surface-1 border border-border rounded-xl p-4 shadow-card">
          <p className="text-xs font-display font-semibold uppercase tracking-widest text-content-3 mb-2">Estimated Monthly Cost</p>
          <p className="text-3xl font-display font-bold text-amber">€{total.toLocaleString()}</p>
          <p className="text-xs text-content-3 mt-1">Based on {budget} budget level — includes rent, food, transport, and basics.</p>
        </div>

        {/* Key dates */}
        {upcomingEvents.length > 0 && (
          <div className="bg-surface-1 border border-border rounded-xl shadow-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <p className="text-xs font-display font-semibold uppercase tracking-widest text-content-3">Key Dates After You Arrive</p>
            </div>
            <div className="divide-y divide-border">
              {upcomingEvents.map(event => (
                <div key={`${event.date}-${event.title}`} className="px-4 py-3 flex items-start gap-3">
                  <div className="shrink-0 text-center w-10">
                    <p className="text-[10px] text-content-4 uppercase">{format(parseISO(event.date), 'MMM')}</p>
                    <p className="text-lg font-display font-bold text-content leading-none">{format(parseISO(event.date), 'd')}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-content">{event.title}</p>
                    <p className="text-xs text-content-3 mt-0.5">{event.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-surface-1 border border-amber-border rounded-xl p-5 text-center" style={{ boxShadow: '0 0 20px -5px rgba(245,158,11,0.15)' }}>
          <Sparkles className="w-6 h-6 text-amber mx-auto mb-2" />
          <h3 className="text-base font-display font-bold text-content mb-1">Get the full Move Pack</h3>
          <p className="text-xs text-content-3 mb-3">All 7 fillable templates, downloadable checklist PDF, and commune comparison export.</p>
          <Button onClick={() => setShowUpgrade(true)} size="md">
            Move Pack — €19 one-time
          </Button>
        </div>

        {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}
      </div>
    )
  }

  return (
    <div className="animate-fade-up max-w-lg mx-auto">
      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'rounded-full transition-all duration-300',
              i < step ? 'w-2 h-2 bg-amber' :
              i === step ? 'w-3 h-3 bg-amber' :
              'w-2 h-2 bg-surface-4'
            )}
          />
        ))}
      </div>

      <div className="text-center mb-8">
        <h2 className="text-xl font-display font-bold text-content">{question.question}</h2>
      </div>

      <div className="space-y-3">
        {'type' in question && question.type === 'month-picker' ? (
          <div className="grid grid-cols-3 gap-2">
            {getNextMonths(6).map(month => (
              <button
                key={month}
                onClick={() => selectAnswer('move_date', month)}
                className={cn(
                  'p-3 rounded-xl border text-center font-display font-semibold text-sm transition-all duration-150',
                  answers.move_date === month
                    ? 'bg-amber-soft border-amber-border text-amber'
                    : 'bg-surface-1 border-border text-content-2 hover:border-border-hover hover:text-content'
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
                'w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-150',
                answers[question.id as keyof PlanAnswers] === opt.value
                  ? 'bg-amber-soft border-amber-border'
                  : 'bg-surface-1 border-border hover:border-border-hover hover:bg-surface-2'
              )}
            >
              <div className={cn(
                'w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150',
                answers[question.id as keyof PlanAnswers] === opt.value
                  ? 'bg-amber text-surface-0'
                  : 'bg-surface-3 text-content-3'
              )}>
                {answers[question.id as keyof PlanAnswers] === opt.value
                  ? <Check className="w-4 h-4" />
                  : <span className="text-sm font-bold">›</span>
                }
              </div>
              <span className="text-sm font-semibold text-content">{opt.label}</span>
            </button>
          ))
        )}
      </div>

      {step > 0 && (
        <button
          onClick={() => setStep(s => s - 1)}
          className="mt-8 flex items-center gap-1.5 text-xs text-content-3 hover:text-content-2 transition-colors mx-auto"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </button>
      )}
    </div>
  )
}
