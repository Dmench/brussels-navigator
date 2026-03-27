import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center rounded-full font-body font-medium transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap'

    const variants = {
      primary: 'bg-espresso text-cream hover:bg-ink dark:bg-cream dark:text-espresso dark:hover:bg-white',
      secondary: 'border border-espresso text-espresso hover:bg-espresso hover:text-cream dark:border-night-text dark:text-night-text dark:hover:bg-night-text dark:hover:text-night',
      ghost: 'text-walnut hover:text-espresso dark:text-night-muted dark:hover:text-night-text',
    }

    const sizes = {
      sm: 'px-5 py-2 text-sm',
      md: 'px-7 py-2.5 text-sm',
      lg: 'px-9 py-3.5 text-base',
    }

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
