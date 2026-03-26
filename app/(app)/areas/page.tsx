'use client'

import { useState } from 'react'
import { COMMUNES, PROFILES } from '@/lib/constants'
import { useProfile, useCurrency } from '@/lib/hooks/use-preferences'
import { useRates } from '@/lib/hooks/use-rates'
import { DotRating } from '@/components/ui/DotRating'
import { Badge } from '@/components/ui/Badge'
import { ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AreasPage() {
  const [selected, setSelected] = useState<string[]>(['ixelles', 'etterbeek', 'saint-gilles'])
  const [profile] = useProfile()
  const [currency] = useCurrency()
  const { formatConverted } = useRates()
  const profileInfo = profile ? PROFILES[profile] : null

  function toggleCommune(id: string) {
    setSelected(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id)
      if (prev.length >= 4) return prev
      return [...prev, id]
    })
  }

  const selectedCommunes = COMMUNES.filter(c => selected.includes(c.id))

  return (
    <div className="animate-fade-up space-y-4">
      <div>
        <h1 className="text-2xl font-display font-bold text-content">Neighborhoods</h1>
        <p className="text-sm text-content-3 mt-0.5">Compare up to 4 communes side-by-side.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {COMMUNES.map(commune => {
          const active = selected.includes(commune.id)
          const recommended = profileInfo?.top_communes.includes(commune.id as never)
          return (
            <button
              key={commune.id}
              onClick={() => toggleCommune(commune.id)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-semibold font-display border transition-all duration-150',
                active
                  ? 'bg-amber-soft text-amber border-amber-border'
                  : recommended
                    ? 'bg-surface-2 text-emerald border-emerald-border hover:border-emerald'
                    : 'bg-surface-2 text-content-3 border-border hover:border-border-hover'
              )}
            >
              {commune.name}
              {recommended && !active && ' ★'}
            </button>
          )
        })}
      </div>
      <p className="text-xs text-content-4">Select up to 4 communes to compare. ★ = recommended for your profile.</p>

      <div className={cn(
        'grid gap-4',
        selectedCommunes.length <= 2 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'
      )}>
        {selectedCommunes.map((commune, i) => {
          const isRecommended = profileInfo?.top_communes.includes(commune.id as never)
          const converted = currency !== 'EUR' ? formatConverted(commune.rent, currency) : null

          return (
            <div key={commune.id} className="bg-surface-1 border border-border rounded-xl p-4 shadow-card hover:border-border-hover hover:shadow-card-hover transition-all duration-150">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-display font-bold text-content">{commune.name}</h3>
                    {i === 0 && isRecommended && <Badge variant="emerald">Recommended</Badge>}
                    {i > 0 && isRecommended && <Badge variant="emerald">For you</Badge>}
                  </div>
                  <p className="text-xs italic text-content-3 mt-0.5">{commune.vibe}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xl font-display font-bold text-amber">€{commune.rent}</p>
                  <p className="text-[10px] text-content-4">avg/mo</p>
                  {converted && <p className="text-xs text-content-3">{converted}</p>}
                </div>
              </div>

              <p className="text-xs text-content-2 mb-3 leading-relaxed">{commune.desc}</p>

              <div className="space-y-2 mb-3">
                {([
                  ['Expat-friendly', commune.expat],
                  ['Transit', commune.transit],
                  ['Green space', commune.green],
                  ['Safety', commune.safety],
                  ['Walkability', commune.walk],
                ] as [string, number][]).map(([label, val]) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-[11px] text-content-3">{label}</span>
                    <DotRating value={val} />
                  </div>
                ))}
              </div>

              <a
                href={`https://www.immoweb.be/en/search/apartment/for-rent/${commune.immoweb}?countries=BE`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-amber hover:text-amber-dark transition-colors"
              >
                Search on Immoweb <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )
        })}
      </div>

      <p className="text-xs text-content-4 text-center pb-2">
        Ratings reflect general expat experience. Visit neighborhoods before deciding.
      </p>
    </div>
  )
}
