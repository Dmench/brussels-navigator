import * as React from 'react'
import { cn } from '@/lib/utils'

interface DotRatingProps {
  value: number
  max?: number
  className?: string
  label?: string
}

export function DotRating({ value, max = 5, className, label }: DotRatingProps) {
  return (
    <div className={cn('flex items-center gap-1', className)} title={label ? `${label}: ${value}/${max}` : undefined}>
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={cn(
            'w-2 h-2 rounded-full',
            i < value
              ? 'bg-terracotta'
              : 'bg-sand dark:bg-night-2'
          )}
        />
      ))}
    </div>
  )
}
