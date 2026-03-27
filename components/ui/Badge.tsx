import * as React from 'react'
import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'terracotta' | 'sage' | 'sky' | 'coral'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'border border-sand dark:border-night-border text-walnut dark:text-night-muted bg-ivory dark:bg-night-2',
  terracotta: 'bg-terracotta/10 text-terracotta-dark dark:bg-terracotta/20 dark:text-terracotta-light border border-terracotta/20',
  sage: 'bg-sage-light text-sage dark:bg-sage/20 dark:text-sage border border-sage/20',
  sky: 'bg-sky-light text-sky dark:bg-sky/20 dark:text-sky border border-sky/20',
  coral: 'bg-coral-light text-coral dark:bg-coral/20 dark:text-coral border border-coral/20',
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
