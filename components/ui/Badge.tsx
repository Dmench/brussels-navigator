import * as React from 'react'
import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'terracotta' | 'sage' | 'sky' | 'coral' | 'markets' | 'networking' | 'workshops' | 'sports' | 'holidays' | 'events'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'border border-sand text-walnut bg-ivory',
  terracotta: 'bg-terracotta/10 text-terracotta-dark border border-terracotta/20',
  sage: 'bg-sage-light text-sage border border-sage/20',
  sky: 'bg-sky-light text-sky border border-sky/20',
  coral: 'bg-coral-light text-coral border border-coral/20',
  markets: 'bg-amber-100 text-amber-800 border border-amber-200',
  networking: 'bg-sky-light text-sky border border-sky/20',
  workshops: 'bg-purple-100 text-purple-800 border border-purple-200',
  sports: 'bg-emerald-100 text-emerald-800 border border-emerald-200',
  holidays: 'bg-terracotta/10 text-terracotta-dark border border-terracotta/20',
  events: 'bg-sage-light text-sage border border-sage/20',
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
