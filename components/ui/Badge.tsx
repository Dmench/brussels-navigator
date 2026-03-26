import { cn } from '@/lib/utils'

type BadgeVariant = 'amber' | 'emerald' | 'sky' | 'rose' | 'neutral'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  amber: 'bg-amber-soft text-amber border-amber-border',
  emerald: 'bg-emerald-soft text-emerald border-emerald-border',
  sky: 'bg-sky-soft text-sky border-sky-border',
  rose: 'bg-rose-soft text-rose border-rose-border',
  neutral: 'bg-surface-3 text-content-2 border-border',
}

export function Badge({ children, variant = 'neutral', className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold font-display uppercase tracking-wide border',
      variantClasses[variant],
      className
    )}>
      {children}
    </span>
  )
}
