'use client'

import { cn } from '@/lib/utils'

interface SegmentOption {
  value: string
  label: string
}

interface SegmentControlProps {
  options: SegmentOption[]
  value: string
  onChange: (value: string) => void
  className?: string
}

export function SegmentControl({ options, value, onChange, className }: SegmentControlProps) {
  return (
    <div className={cn('flex p-1 bg-surface-2 rounded-lg border border-border', className)}>
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            'flex-1 px-3 py-1.5 rounded-md text-sm font-semibold font-display transition-all duration-150',
            value === opt.value
              ? 'bg-surface-4 text-content shadow-sm'
              : 'text-content-3 hover:text-content-2'
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
