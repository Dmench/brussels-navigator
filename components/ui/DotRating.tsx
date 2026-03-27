import { cn } from '@/lib/utils'

interface DotRatingProps {
  value: number
  max?: number
  className?: string
}

export function DotRating({ value, max = 5, className }: DotRatingProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'w-1.5 h-1.5 rounded-full',
            i < value ? 'bg-terracotta' : 'bg-sand dark:bg-night-2'
          )}
        />
      ))}
    </div>
  )
}
