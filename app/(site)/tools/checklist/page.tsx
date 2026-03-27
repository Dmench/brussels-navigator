'use client'
import { useChecklist } from '@/lib/hooks/use-preferences'
import { cn } from '@/lib/utils'

const CHECKLIST_PHASES = [
  {
    id: 'before',
    title: 'Before you arrive',
    items: [
      { id: 'b1', text: 'Arrange temporary accommodation for your first 2–4 weeks (Spotahome, HousingAnywhere)' },
      { id: 'b2', text: 'Check visa requirements — EU citizens need no visa; non-EU citizens should confirm work permit process with employer' },
      { id: 'b3', text: 'Get apostille on birth certificate if you are non-EU (can take weeks from your home country)' },
      { id: 'b4', text: 'Download STIB app and Doctena to your phone before landing' },
    ],
  },
  {
    id: 'week1',
    title: 'Week one',
    items: [
      { id: 'w1', text: 'Sign rental contract and start état des lieux (condition report) — photograph everything' },
      { id: 'w2', text: 'Register at your commune within 8 working days of moving in — book online to avoid walk-in queue' },
      { id: 'w3', text: 'Open Belgian bank account (BNP, KBC, or Belfius) — bring passport and rental contract' },
      { id: 'w4', text: 'Set up utilities: contact Sibelga for electricity and gas, and arrange internet (Proximus, Telenet, or Orange)' },
      { id: 'w5', text: 'Register rental guarantee (2–3 months\' rent) in blocked bank account — do not pay directly to landlord' },
    ],
  },
  {
    id: 'month1',
    title: 'First month',
    items: [
      { id: 'm1', text: 'Join a mutuelle within 3 months of starting work — bring Annex 8 or eID and employer NSSO number' },
      { id: 'm2', text: 'Register with a GP (médecin traitant) — use Doctena to find English-speaking doctors near you' },
      { id: 'm3', text: 'Get MOBIB card for STIB and set up monthly pass (€49/month) — check if employer covers it' },
      { id: 'm4', text: 'Be home for police verification visit (within 2 weeks of commune registration) — they may not call ahead' },
      { id: 'm5', text: 'Collect your eID or residence card from commune once notified (2–4 weeks after police visit)' },
    ],
  },
  {
    id: '90days',
    title: 'First 90 days',
    items: [
      { id: 'd1', text: 'Register with Belgian tax authority via MyMinfin — note if you qualify for the Belgian expat tax regime (apply within 3 months)' },
      { id: 'd2', text: 'Register your lease at MyRent (myrental.be) if landlord has not done so — free, takes 5 minutes' },
      { id: 'd3', text: 'Enrol in French or Dutch classes — many communes offer free courses for residents' },
    ],
  },
]

export default function ChecklistPage() {
  const { completed, toggle, reset, mounted } = useChecklist()

  const totalItems = CHECKLIST_PHASES.flatMap(p => p.items).length
  const completedCount = mounted ? completed.length : 0
  const progressPct = Math.round((completedCount / totalItems) * 100)

  return (
    <div>
      <p className="text-walnut dark:text-night-muted text-xs uppercase tracking-widest mb-2">Tools</p>
      <h1 className="font-display text-4xl md:text-5xl font-bold text-espresso dark:text-night-text mb-4">
        Setup checklist
      </h1>
      <p className="text-walnut dark:text-night-muted text-base max-w-xl mb-8">
        Most expats finish their Brussels setup in 6–8 weeks. Work through these in the order shown.
      </p>

      {/* Progress */}
      <div className="mb-8 max-w-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-walnut dark:text-night-muted">{completedCount} of {totalItems} complete</span>
          <span className="text-sm font-medium text-espresso dark:text-night-text">{progressPct}%</span>
        </div>
        <div className="h-2 bg-sand dark:bg-night-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-terracotta rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        {completedCount === totalItems && mounted && (
          <p className="text-sage text-sm mt-2">All done. Welcome to Brussels.</p>
        )}
      </div>

      {/* Phases */}
      <div className="max-w-2xl space-y-8">
        {CHECKLIST_PHASES.map(phase => (
          <div key={phase.id}>
            <h2 className="font-display text-xl font-semibold text-espresso dark:text-night-text mb-3">
              {phase.title}
            </h2>
            <div className="border border-sand/50 dark:border-night-border rounded-2xl overflow-hidden divide-y divide-sand/50 dark:divide-night-border">
              {phase.items.map(item => {
                const isComplete = mounted && completed.includes(item.id)
                return (
                  <button
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    className="w-full flex items-start gap-4 px-5 py-4 text-left hover:bg-ivory dark:hover:bg-night-1 transition-colors group"
                  >
                    {/* Checkbox */}
                    <span className={cn(
                      'mt-0.5 w-5 h-5 rounded border shrink-0 flex items-center justify-center transition-colors',
                      isComplete
                        ? 'bg-terracotta border-terracotta'
                        : 'border-sand dark:border-night-border group-hover:border-terracotta/50'
                    )}>
                      {isComplete && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </span>
                    <span className={cn(
                      'text-sm leading-relaxed transition-colors',
                      isComplete ? 'text-walnut/60 dark:text-night-muted line-through' : 'text-espresso dark:text-night-text'
                    )}>
                      {item.text}
                    </span>
                  </button>
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
            onClick={reset}
            className="text-walnut dark:text-night-muted text-sm hover:text-espresso dark:hover:text-night-text transition-colors"
          >
            Reset checklist
          </button>
        </div>
      )}
    </div>
  )
}
