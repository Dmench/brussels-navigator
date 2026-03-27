'use client'

import { useState } from 'react'
import { COMMUNES } from '@/lib/constants'
import { useCurrency } from '@/lib/hooks/use-preferences'
import { useRates } from '@/lib/hooks/use-rates'
import { DotRating } from '@/components/ui/DotRating'
import { ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

const CURRENCIES = ['EUR', 'USD', 'GBP', 'CHF'] as const

export default function NeighborhoodsPage() {
  const [selected, setSelected] = useState<string | null>(null)
  const [currency, setCurrency] = useCurrency()
  const { convert } = useRates()

  const commune = COMMUNES.find(c => c.id === selected) ?? COMMUNES[0]

  function formatRent(eur: number): string {
    if (currency === 'EUR') return `€${eur}`
    const converted = convert(eur, currency)
    if (!converted) return `€${eur}`
    const sym = currency === 'USD' ? '$' : currency === 'GBP' ? '£' : currency === 'CHF' ? 'Fr' : currency
    return `${sym}${converted.toLocaleString()}`
  }

  return (
    <div>
      <p className="text-xs font-body font-medium uppercase tracking-[0.2em] text-walnut dark:text-night-muted mb-3">Where to live</p>
      <h1 className="text-3xl md:text-4xl font-display font-semibold text-ink dark:text-night-text mb-4">Brussels neighbourhoods</h1>
      <p className="text-base font-body font-light text-walnut dark:text-night-muted leading-relaxed mb-10 max-w-xl">
        Brussels has 19 communes, each with its own character, price point, and atmosphere. These ten are the most relevant for expats.
      </p>

      {/* Currency selector */}
      <div className="flex items-center gap-4 mb-8">
        <span className="text-xs font-body text-walnut dark:text-night-muted">Show rents in:</span>
        <div className="flex gap-3">
          {CURRENCIES.map(c => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className={cn(
                'text-xs font-body pb-0.5 transition-colors',
                currency === c
                  ? 'text-espresso dark:text-night-text border-b border-espresso dark:border-night-text'
                  : 'text-walnut dark:text-night-muted hover:text-espresso dark:hover:text-night-text'
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Commune list */}
        <div className="md:col-span-1">
          <div className="space-y-px border border-sand/50 dark:border-night-border rounded-xl overflow-hidden">
            {COMMUNES.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setSelected(c.id)}
                className={cn(
                  'w-full flex items-center justify-between px-4 py-3.5 text-left transition-colors duration-200',
                  (selected === c.id || (!selected && i === 0))
                    ? 'bg-espresso dark:bg-night-2 text-cream dark:text-night-text'
                    : 'bg-ivory dark:bg-night-1 text-espresso dark:text-night-text hover:bg-sand/30 dark:hover:bg-night-2'
                )}
              >
                <span className="text-sm font-body">{c.name}</span>
                <span className={cn(
                  'text-xs font-display font-medium',
                  (selected === c.id || (!selected && i === 0)) ? 'text-cream/60 dark:text-night-muted' : 'text-walnut dark:text-night-muted'
                )}>
                  {formatRent(c.rent)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Detail */}
        <div className="md:col-span-2">
          <div className="bg-ivory dark:bg-night-1 border border-sand/50 dark:border-night-border rounded-2xl p-6 md:p-8">
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-2xl font-display font-semibold text-ink dark:text-night-text">{commune.name}</h2>
              <p className="text-2xl font-display font-semibold text-terracotta">{formatRent(commune.rent)}<span className="text-sm font-body font-light text-walnut dark:text-night-muted">/mo avg</span></p>
            </div>
            <p className="text-base italic font-body font-light text-walnut dark:text-night-muted mb-4">{commune.vibe}</p>
            <p className="text-sm font-body font-light text-walnut dark:text-night-muted leading-relaxed mb-6">{commune.desc}</p>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
              {([
                ['Expat friendly', commune.expat],
                ['Transport', commune.transit],
                ['Green space', commune.green],
                ['Safety', commune.safety],
                ['Walkability', commune.walk],
              ] as [string, number][]).map(([label, val]) => (
                <div key={label}>
                  <p className="text-[11px] font-body text-walnut dark:text-night-muted mb-1.5">{label}</p>
                  <DotRating value={val} />
                </div>
              ))}
            </div>

            <a
              href={`https://www.immoweb.be/en/search/apartment/for-rent/${commune.immoweb}?countries=BE`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-body text-terracotta hover:underline underline-offset-4 transition-all"
            >
              Search apartments on Immoweb <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
