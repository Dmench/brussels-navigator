import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'terracotta' | 'sage' | 'sky'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  const base = 'inline-flex items-center text-[11px] font-body font-medium uppercase tracking-[0.15em] px-3 py-1 rounded-full border'

  const variants = {
    default: 'border-sand text-walnut bg-ivory dark:border-night-border dark:text-night-muted dark:bg-night-2',
    terracotta: 'border-terracotta/20 text-terracotta bg-terracotta/5',
    sage: 'border-sage/20 text-sage bg-sage/5',
    sky: 'border-sky/20 text-sky bg-sky/5',
  }

  return (
    <span className={cn(base, variants[variant], className)}>
      {children}
    </span>
  )
}
