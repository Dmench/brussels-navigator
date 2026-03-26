'use client'

import { useState } from 'react'
import { useRates } from '@/lib/hooks/use-rates'
import { useCurrency } from '@/lib/hooks/use-preferences'
import { CURRENCIES } from '@/lib/constants'
import { Skeleton } from '@/components/ui/Skeleton'
import { cn } from '@/lib/utils'

const TOP_CURRENCIES = ['USD', 'GBP', 'CHF', 'CAD', 'AUD', 'JPY']

export function CurrencyCard() {
  const { data, loading, error, convert } = useRates()
  const [currency, setCurrency] = useCurrency()
  const [eurAmount, setEurAmount] = useState(1000)

  if (error) {
    return (
      <div className="bg-surface-1 border border-border rounded-xl p-4 shadow-card">
        <p className="text-xs text-content-3">Exchange rates unavailable</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="bg-surface-1 border border-border rounded-xl p-4 shadow-card space-y-3">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
    )
  }

  const converted = convert(eurAmount, currency)
  const currencyInfo = CURRENCIES.find(c => c.code === currency)

  return (
    <div className="bg-surface-1 border border-border rounded-xl p-4 shadow-card">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-display font-semibold uppercase tracking-widest text-content-3">Currency</p>
        {data && <p className="text-[10px] text-content-4">ECB · {data.date}</p>}
      </div>

      <div className="flex items-end gap-2 mb-3">
        <div className="flex-1">
          <label className="text-[10px] text-content-4 uppercase tracking-wide">EUR</label>
          <input
            type="number"
            value={eurAmount}
            onChange={e => setEurAmount(Number(e.target.value))}
            className="w-full px-3 py-2.5 bg-surface-0 border border-border rounded-lg text-content text-sm font-display font-bold placeholder:text-content-4 outline-none focus:border-amber focus:ring-1 transition-all duration-150 mt-0.5"
          />
        </div>
        <div className="pb-3 text-content-3 text-sm">→</div>
        <div className="flex-1">
          <label className="text-[10px] text-content-4 uppercase tracking-wide">{currencyInfo?.flag} {currency}</label>
          <div className="w-full px-3 py-2.5 bg-surface-2 border border-border rounded-lg text-amber text-sm font-display font-bold mt-0.5">
            {converted !== null
              ? new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(converted)
              : '—'}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {TOP_CURRENCIES.map(code => {
          const c = CURRENCIES.find(x => x.code === code)
          return (
            <button
              key={code}
              onClick={() => setCurrency(code)}
              className={cn(
                'px-2 py-1 rounded text-[11px] font-semibold font-display transition-all duration-150',
                currency === code
                  ? 'bg-amber-soft text-amber border border-amber-border'
                  : 'bg-surface-2 text-content-3 border border-border hover:border-border-hover hover:text-content-2'
              )}
            >
              {c?.flag} {code}
            </button>
          )
        })}
      </div>

      <select
        value={currency}
        onChange={e => setCurrency(e.target.value)}
        className="w-full px-3 py-2 bg-surface-0 border border-border rounded-lg text-content-2 text-xs outline-none focus:border-amber transition-all duration-150"
      >
        {CURRENCIES.map(c => (
          <option key={c.code} value={c.code}>{c.flag} {c.name} ({c.code})</option>
        ))}
      </select>
    </div>
  )
}
