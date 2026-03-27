'use client'
import { useState } from 'react'
import { MONTHLY_COSTS_ITEMS, BRUSSELS_COSTS, CITY_COSTS, CURRENCIES } from '@/lib/constants'
import { useRates } from '@/lib/hooks/use-rates'
import { useCurrency } from '@/lib/hooks/use-preferences'
import { cn } from '@/lib/utils'

type BudgetLevel = 'budget' | 'moderate' | 'comfortable'
type Mode = 'monthly' | 'compare'

const CITIES = Object.keys(CITY_COSTS) as (keyof typeof CITY_COSTS)[]

const BUDGET_LABELS: Record<BudgetLevel, string> = {
  budget: 'Budget',
  moderate: 'Moderate',
  comfortable: 'Comfortable',
}

export default function CalculatorPage() {
  const [mode, setMode] = useState<Mode>('monthly')
  const [level, setLevel] = useState<BudgetLevel>('moderate')
  const [compareCity, setCompareCity] = useState<keyof typeof CITY_COSTS>('London')
  const { currency, setCurrency } = useCurrency()
  const { convert, data: rates } = useRates()

  const total = MONTHLY_COSTS_ITEMS.reduce((sum, item) => sum + item[level], 0)
  const maxItem = Math.max(...MONTHLY_COSTS_ITEMS.map(i => i[level]))

  const convertedTotal = currency === 'EUR' ? total : (convert(total, currency) ?? total)
  const currencySymbol = CURRENCIES.find(c => c.code === currency)?.symbol ?? '€'
  const displayCurrency = currency === 'EUR' ? '€' : currencySymbol

  const brusselsTotal = Object.values(BRUSSELS_COSTS).reduce((a, b) => a + b, 0)
  const cityData = CITY_COSTS[compareCity]
  const cityTotal = Object.values(cityData).reduce((a, b) => a + b, 0)
  const savings = cityTotal - brusselsTotal

  const formatAmt = (eur: number) => {
    if (currency === 'EUR') return `€${eur}`
    const converted = convert(eur, currency)
    if (converted == null) return `€${eur}`
    return `${displayCurrency}${Math.round(converted).toLocaleString()}`
  }

  return (
    <div>
      <p className="text-walnut dark:text-night-muted text-xs uppercase tracking-widest mb-2">Tools</p>
      <h1 className="font-display text-4xl md:text-5xl font-bold text-espresso dark:text-night-text mb-8">
        Cost calculator
      </h1>

      {/* Mode tabs */}
      <div className="flex gap-2 mb-8">
        {([['monthly', 'My monthly costs'], ['compare', 'Compare with a city']] as const).map(([m, label]) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={cn(
              'px-5 py-2.5 rounded-full text-sm font-medium transition-colors',
              mode === m
                ? 'bg-espresso text-cream dark:bg-cream dark:text-espresso'
                : 'border border-sand dark:border-night-border text-walnut dark:text-night-muted hover:text-espresso dark:hover:text-night-text'
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {mode === 'monthly' && (
        <div className="max-w-xl">
          {/* Budget toggle */}
          <div className="flex gap-2 mb-6">
            {(Object.keys(BUDGET_LABELS) as BudgetLevel[]).map(l => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={cn(
                  'flex-1 py-2 rounded-full text-sm font-medium transition-colors',
                  level === l
                    ? 'bg-espresso text-cream dark:bg-cream dark:text-espresso'
                    : 'border border-sand dark:border-night-border text-walnut dark:text-night-muted hover:text-espresso dark:hover:text-night-text'
                )}
              >
                {BUDGET_LABELS[l]}
              </button>
            ))}
          </div>

          {/* Total */}
          <div className="mb-6">
            <p className="text-walnut dark:text-night-muted text-sm mb-1">Monthly total</p>
            <p className="font-display text-5xl font-bold text-terracotta">
              {currency === 'EUR' ? `€${total.toLocaleString()}` : `${displayCurrency}${Math.round(convertedTotal).toLocaleString()}`}
              <span className="text-lg font-body font-normal text-walnut dark:text-night-muted ml-2">/month</span>
            </p>
          </div>

          {/* Currency selector */}
          <div className="mb-8">
            <select
              value={currency}
              onChange={e => setCurrency(e.target.value)}
              className="px-4 py-2 rounded-full border border-sand dark:border-night-border bg-cream dark:bg-night text-espresso dark:text-night-text text-sm focus:outline-none"
            >
              <option value="EUR">EUR (Euro)</option>
              {CURRENCIES.map(c => (
                <option key={c.code} value={c.code}>{c.code} ({c.name})</option>
              ))}
            </select>
            {currency !== 'EUR' && !rates && (
              <span className="text-xs text-walnut dark:text-night-muted ml-3">Loading rates...</span>
            )}
          </div>

          {/* Breakdown */}
          <div className="space-y-3">
            {MONTHLY_COSTS_ITEMS.map(item => {
              const amount = item[level]
              const width = Math.round((amount / maxItem) * 100)
              return (
                <div key={item.key}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-espresso dark:text-night-text">{item.label}</span>
                    <span className="text-sm font-medium text-espresso dark:text-night-text">{formatAmt(amount)}</span>
                  </div>
                  <div className="h-1 bg-sand dark:bg-night-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-terracotta/60 rounded-full transition-all duration-300"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {mode === 'compare' && (
        <div className="max-w-2xl">
          {/* City selector */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="text-sm text-walnut dark:text-night-muted">Compare Brussels with</span>
            <select
              value={compareCity}
              onChange={e => setCompareCity(e.target.value as keyof typeof CITY_COSTS)}
              className="px-4 py-2 rounded-full border border-sand dark:border-night-border bg-cream dark:bg-night text-espresso dark:text-night-text text-sm focus:outline-none"
            >
              {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
            </select>
            <select
              value={currency}
              onChange={e => setCurrency(e.target.value)}
              className="px-4 py-2 rounded-full border border-sand dark:border-night-border bg-cream dark:bg-night text-espresso dark:text-night-text text-sm focus:outline-none"
            >
              <option value="EUR">EUR</option>
              {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
            </select>
          </div>

          {/* Savings headline */}
          <div className="mb-6 p-5 bg-ivory dark:bg-night-1 border border-sand/50 dark:border-night-border rounded-2xl">
            {savings > 0 ? (
              <p className="font-display text-xl text-espresso dark:text-night-text">
                You would save{' '}
                <span className="text-sage font-semibold">{formatAmt(savings)}/month</span>
                {' '}in Brussels vs {compareCity}
              </p>
            ) : (
              <p className="font-display text-xl text-espresso dark:text-night-text">
                Brussels costs{' '}
                <span className="text-terracotta font-semibold">{formatAmt(Math.abs(savings))}/month more</span>
                {' '}than {compareCity}
              </p>
            )}
          </div>

          {/* Table */}
          <div className="border border-sand/50 dark:border-night-border rounded-2xl overflow-hidden">
            <div className="grid grid-cols-4 bg-sand/30 dark:bg-night-2 px-5 py-2">
              <span className="text-xs text-walnut dark:text-night-muted uppercase tracking-wide">Category</span>
              <span className="text-xs text-walnut dark:text-night-muted uppercase tracking-wide text-right">{compareCity}</span>
              <span className="text-xs text-walnut dark:text-night-muted uppercase tracking-wide text-right">Brussels</span>
              <span className="text-xs text-walnut dark:text-night-muted uppercase tracking-wide text-right">Diff</span>
            </div>
            <div className="divide-y divide-sand/50 dark:divide-night-border">
              {(Object.keys(BRUSSELS_COSTS) as (keyof typeof BRUSSELS_COSTS)[]).map(key => {
                const bru = BRUSSELS_COSTS[key]
                const city = cityData[key as keyof typeof cityData]
                const diff = city - bru
                return (
                  <div key={key} className="grid grid-cols-4 px-5 py-3">
                    <span className="text-sm text-espresso dark:text-night-text capitalize">{key}</span>
                    <span className="text-sm text-espresso dark:text-night-text text-right">{formatAmt(city)}</span>
                    <span className="text-sm text-espresso dark:text-night-text text-right">{formatAmt(bru)}</span>
                    <span className={cn(
                      'text-sm font-medium text-right',
                      diff > 0 ? 'text-sage' : diff < 0 ? 'text-coral' : 'text-walnut dark:text-night-muted'
                    )}>
                      {diff > 0 ? `-${formatAmt(diff)}` : diff < 0 ? `+${formatAmt(Math.abs(diff))}` : '—'}
                    </span>
                  </div>
                )
              })}
            </div>
            <div className="grid grid-cols-4 bg-sand/30 dark:bg-night-2 px-5 py-3 border-t border-sand/50 dark:border-night-border">
              <span className="text-sm font-semibold text-espresso dark:text-night-text">Total</span>
              <span className="text-sm font-semibold text-espresso dark:text-night-text text-right">{formatAmt(cityTotal)}</span>
              <span className="text-sm font-semibold text-espresso dark:text-night-text text-right">{formatAmt(brusselsTotal)}</span>
              <span className={cn(
                'text-sm font-semibold text-right',
                savings > 0 ? 'text-sage' : 'text-coral'
              )}>
                {savings > 0 ? `-${formatAmt(savings)}` : `+${formatAmt(Math.abs(savings))}`}
              </span>
            </div>
          </div>

          <p className="text-xs text-walnut dark:text-night-muted mt-4">
            Brussels figures use moderate estimates. City figures are representative averages. Actual costs vary significantly by neighbourhood and lifestyle.
          </p>
        </div>
      )}
    </div>
  )
}
