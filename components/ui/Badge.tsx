import * as React from 'react'
import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'terracotta' | 'sage' | 'sky' | 'coral'

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
