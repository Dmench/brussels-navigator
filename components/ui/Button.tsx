import * as React from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-espresso text-cream rounded-full hover:bg-ink dark:bg-cream dark:text-espresso dark:hover:bg-stone transition-colors',
  secondary: 'border border-espresso/30 dark:border-night-border text-espresso dark:text-night-text rounded-full hover:bg-sand/50 dark:hover:bg-night-2 transition-colors',
  ghost: 'text-espresso dark:text-night-text hover:text-ink dark:hover:text-cream rounded-full hover:bg-sand/40 dark:hover:bg-night-2 transition-colors',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-1.5 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3 text-base',
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-body font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/50 disabled:opacity-50 disabled:cursor-not-allowed',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
