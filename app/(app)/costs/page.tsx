'use client'

import { useState } from 'react'
import { MONTHLY_COSTS, CURRENCIES } from '@/lib/constants'
import { useCurrency } from '@/lib/hooks/use-preferences'
import { useRates } from '@/lib/hooks/use-rates'
import { SegmentControl } from '@/components/ui/SegmentControl'
import { cn } from '@/lib/utils'
import type { BudgetLevel } from '@/lib/types'

const SEGMENT_OPTIONS = [
  { value: 'budget', label: 'Budget' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'comfortable', label: 'Comfortable' },
]

const TOP_CURRENCIES = ['USD', 'GBP', 'CHF', 'CAD', 'AUD', 'JPY']

export default function CostsPage() {
  const [budget, setBudget] = useState<BudgetLevel>('moderate')
  const [currency, setCurrency] = useCurrency()
  const { formatConverted } = useRates()

  const total = MONTHLY_COSTS.reduce((sum, item) => sum + item[budget], 0)
  const maxCost = Math.max(...MONTHLY_COSTS.map(i => i[budget]))

  return (
    <div className="animate-fade-up space-y-4">
      <div>
        <h1 className="text-2xl font-display font-bold text-content">Monthly Costs</h1>
        <p className="text-sm text-content-3 mt-0.5">Estimated living costs in Brussels.</p>
      </div>

      <SegmentControl
        options={SEGMENT_OPTIONS}
        value={budget}
        onChange={v => setBudget(v as BudgetLevel)}
      />

      <div className="bg-surface-1 border border-amber-border rounded-xl p-5 text-center" style={{ boxShadow: '0 0 20px -5px rgba(245,158,11,0.15)' }}>
        <p className="text-xs font-display font-semibold uppercase tracking-widest text-content-3 mb-1">Estimated Monthly Total</p>
        <p className="text-4xl font-display font-bold text-amber">€{total.toLocaleString()}</p>
        {currency !== 'EUR' && formatConverted(total, currency) && (
          <p className="text-sm text-content-3 mt-1">≈ {formatConverted(total, currency)}</p>
        )}
      </div>

      <div>
        <p className="text-xs text-content-4 mb-2">Convert to:</p>
        <div className="flex flex-wrap gap-1.5">
          {TOP_CURRENCIES.map(code => {
            const c = CURRENCIES.find(x => x.code === code)
            return (
              <button
                key={code}
                onClick={() => setCurrency(code)}
                className={cn(
                  'px-2.5 py-1 rounded-lg text-xs font-semibold font-display border transition-all duration-150',
                  currency === code
                    ? 'bg-amber-soft text-amber border-amber-border'
                    : 'bg-surface-2 text-content-3 border-border hover:border-border-hover'
                )}
              >
                {c?.flag} {code}
              </button>
            )
          })}
        </div>
      </div>

      <div className="bg-surface-1 border border-border rounded-xl shadow-card overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <p className="text-xs font-display font-semibold uppercase tracking-widest text-content-3">Breakdown</p>
        </div>
        <div className="divide-y divide-border">
          {MONTHLY_COSTS.map(item => {
            const amount = item[budget]
            const barWidth = maxCost > 0 ? (amount / maxCost) * 100 : 0
            const converted = formatConverted(amount, currency)

            return (
              <div key={item.label} className="px-4 py-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-content-2">{item.label}</span>
                  <div className="text-right">
                    <span className="text-sm font-semibold font-display text-content">€{amount}</span>
                    {converted && currency !== 'EUR' && (
                      <span className="text-[11px] text-content-4 ml-1.5">{converted}</span>
                    )}
                  </div>
                </div>
                <div className="h-1 bg-surface-3 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber rounded-full transition-all duration-500"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <p className="text-xs text-content-4 text-center pb-2">
        Estimates based on 2024–2026 Brussels averages. Your actual costs will vary.
      </p>
    </div>
  )
}
