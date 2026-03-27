'use client'
import { useState } from 'react'
import { COMMUNES } from '@/lib/constants'
import { useRates } from '@/lib/hooks/use-rates'
import { useCurrency } from '@/lib/hooks/use-preferences'
import { CURRENCIES } from '@/lib/constants'
import { DotRating } from '@/components/ui/DotRating'
import { cn } from '@/lib/utils'

type Commune = typeof COMMUNES[number]

export default function NeighborhoodsPage() {
  const [selected, setSelected] = useState<Commune>(COMMUNES[0])
  const { currency, setCurrency } = useCurrency()
  const { convert } = useRates()

  const formatRent = (eur: number) => {
    if (currency === 'EUR') return `€${eur}`
    const converted = convert(eur, currency)
    if (converted == null) return `€${eur}`
    const sym = CURRENCIES.find(c => c.code === currency)?.symbol ?? currency
    return `${sym}${Math.round(converted).toLocaleString()}`
  }

  return (
    <div>
      <p className="text-walnut dark:text-night-muted text-xs uppercase tracking-widest mb-2">Tools</p>
      <h1 className="font-display text-4xl md:text-5xl font-bold text-espresso dark:text-night-text mb-4">
        Neighbourhood guide
      </h1>
      <p className="text-walnut dark:text-night-muted text-base max-w-xl mb-8">
        Compare Brussels communes on the factors that matter most to expats.
      </p>

      {/* Currency selector */}
      <div className="mb-6">
        <select
          value={currency}
          onChange={e => setCurrency(e.target.value)}
          className="px-4 py-2 rounded-full border border-sand dark:border-night-border bg-cream dark:bg-night text-espresso dark:text-night-text text-sm focus:outline-none"
        >
          <option value="EUR">EUR (Euro)</option>
          {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code} ({c.name})</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Commune list */}
        <div className="lg:col-span-1">
          <div className="border border-sand/50 dark:border-night-border rounded-2xl overflow-hidden divide-y divide-sand/50 dark:divide-night-border">
            {COMMUNES.map(commune => (
              <button
                key={commune.id}
                onClick={() => setSelected(commune)}
                className={cn(
                  'w-full flex items-center justify-between px-5 py-4 text-left transition-colors',
                  selected.id === commune.id
                    ? 'bg-terracotta/10 dark:bg-terracotta/10'
                    : 'hover:bg-ivory dark:hover:bg-night-1'
                )}
              >
                <div>
                  <p className={cn(
                    'text-sm font-medium transition-colors',
                    selected.id === commune.id ? 'text-terracotta' : 'text-espresso dark:text-night-text'
                  )}>
                    {commune.name}
                  </p>
                  <p className="text-xs text-walnut dark:text-night-muted mt-0.5">{commune.vibe}</p>
                </div>
                <p className="text-sm font-medium text-espresso dark:text-night-text shrink-0 ml-3">
                  {formatRent(commune.rent)}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Detail card */}
        <div className="lg:col-span-2">
          <div className="bg-ivory dark:bg-night-1 border border-sand/50 dark:border-night-border rounded-2xl p-6 sticky top-20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-display text-2xl font-bold text-espresso dark:text-night-text">
                  {selected.name}
                </h2>
                <p className="text-walnut dark:text-night-muted text-sm">{selected.vibe}</p>
              </div>
              <div className="text-right">
                <p className="font-display text-2xl font-bold text-terracotta">{formatRent(selected.rent)}</p>
                <p className="text-walnut dark:text-night-muted text-xs">avg 1BR/month</p>
              </div>
            </div>

            <p className="text-espresso dark:text-night-text text-sm leading-relaxed mb-6">
              {selected.desc}
            </p>

            {/* Ratings */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { label: 'Expat community', value: selected.expat },
                { label: 'Public transit', value: selected.transit },
                { label: 'Green space', value: selected.green },
                { label: 'Safety', value: selected.safety },
                { label: 'Walkability', value: selected.walk },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-sm text-walnut dark:text-night-muted">{label}</span>
                  <DotRating value={value} label={label} />
                </div>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-3">
              <a
                href={`https://www.immoweb.be/en/search/apartment/for-rent?countries=BE&localities=${selected.immoweb}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-espresso text-cream rounded-full text-sm font-medium hover:bg-ink dark:bg-cream dark:text-espresso dark:hover:bg-stone transition-colors"
              >
                Search on Immoweb
              </a>
              <a
                href={`/tools/map`}
                className="px-5 py-2.5 border border-espresso/30 dark:border-night-border text-espresso dark:text-night-text rounded-full text-sm font-medium hover:bg-sand/50 dark:hover:bg-night-2 transition-colors"
              >
                View on map
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Ratings legend */}
      <div className="mt-8 max-w-sm">
        <p className="text-xs text-walnut dark:text-night-muted leading-relaxed">
          Ratings are 1–5. Data verified March 2026. Rent figures are estimates for unfurnished 1-bedroom apartments.
        </p>
      </div>
    </div>
  )
}
