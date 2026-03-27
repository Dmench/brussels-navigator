'use client'

import { useState } from 'react'
import { MONTHLY_COSTS, CURRENCIES } from '@/lib/constants'
import { getTotalMonthlyCost, getCostBreakdown } from '@/lib/plan-logic'
import { useCurrency } from '@/lib/hooks/use-preferences'
import { useRates } from '@/lib/hooks/use-rates'
import { cn } from '@/lib/utils'
import type { BudgetLevel } from '@/lib/types'

export default function CostsPage() {
  const [budget, setBudget] = useState<BudgetLevel>('moderate')
  const [currency, setCurrency] = useCurrency()
  const { convert, data: rates } = useRates()

  const total = getTotalMonthlyCost(budget)
  const breakdown = getCostBreakdown(budget)

  function formatAmount(eur: number): string {
    if (currency === 'EUR') return `€${eur.toLocaleString()}`
    const converted = convert(eur, currency)
    if (!converted) return `€${eur.toLocaleString()}`
    const curr = CURRENCIES.find(c => c.code === currency)
    return `${curr?.symbol ?? currency}${converted.toLocaleString()}`
  }

  return (
    <div className="max-w-2xl">
      <p className="text-xs font-body font-medium uppercase tracking-[0.2em] text-walnut dark:text-night-muted mb-3">Planning</p>
      <h1 className="text-3xl md:text-4xl font-display font-semibold text-ink dark:text-night-text mb-4">Monthly cost estimate</h1>
      <p className="text-base font-body font-light text-walnut dark:text-night-muted leading-relaxed mb-10 max-w-xl">
        Brussels is significantly cheaper than London, Paris, or Amsterdam. These figures reflect realistic 2025–2026 costs for a single person in a one-bedroom apartment.
      </p>

      {/* Budget toggle */}
      <div className="flex items-center gap-6 mb-8">
        <span className="text-xs font-body text-walnut dark:text-night-muted">Budget level:</span>
        {(['budget', 'moderate', 'comfortable'] as BudgetLevel[]).map(b => (
          <button
            key={b}
            onClick={() => setBudget(b)}
            className={cn(
              'text-sm font-body pb-0.5 capitalize transition-colors duration-200',
              budget === b
                ? 'text-espresso dark:text-night-text border-b border-espresso dark:border-night-text'
                : 'text-walnut dark:text-night-muted hover:text-espresso dark:hover:text-night-text'
            )}
          >
            {b}
          </button>
        ))}
      </div>

      {/* Currency selector */}
      <div className="flex items-center gap-4 mb-10">
        <span className="text-xs font-body text-walnut dark:text-night-muted">Show in:</span>
        <div className="flex flex-wrap gap-3">
          {['EUR', ...CURRENCIES.slice(0, 5).map(c => c.code)].map(c => (
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

      {/* Total */}
      <div className="mb-8">
        <p className="text-xs font-body font-medium uppercase tracking-[0.2em] text-walnut dark:text-night-muted mb-2">Total estimate</p>
        <p className="text-5xl font-display font-bold text-terracotta">{formatAmount(total)}</p>
        <p className="text-sm font-body font-light text-walnut dark:text-night-muted mt-1">per month</p>
        {currency !== 'EUR' && rates && (
          <p className="text-xs font-body text-stone dark:text-night-muted mt-1">1 EUR = {rates.rates[currency]?.toFixed(2)} {currency} · {rates.date}</p>
        )}
      </div>

      {/* Breakdown */}
      <div className="border border-sand/50 dark:border-night-border rounded-xl overflow-hidden divide-y divide-sand/50 dark:divide-night-border">
        {breakdown.map(item => (
          <div key={item.label} className="bg-ivory dark:bg-night-1 px-5 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-body text-espresso dark:text-night-text">{item.label}</span>
              <span className="text-sm font-display font-medium text-espresso dark:text-night-text">{formatAmount(item.amount)}</span>
            </div>
            <div className="w-full h-px bg-sand dark:bg-night-2 overflow-hidden rounded-full">
              <div
                className="h-full bg-espresso/30 dark:bg-night-text/30 rounded-full transition-all duration-500"
                style={{ width: `${item.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs font-body font-light text-walnut dark:text-night-muted leading-relaxed mt-6">
        These are estimates for planning purposes. Actual costs vary by neighbourhood, lifestyle, and individual circumstances. Figures do not include one-off costs such as rental deposit, agency fees, or furniture.
      </p>
    </div>
  )
}
