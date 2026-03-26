import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-bold font-display transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-amber text-surface-0 rounded-lg hover:bg-amber-dark hover:-translate-y-px': variant === 'primary',
            'bg-transparent text-content-2 border border-border rounded-lg hover:border-border-hover hover:text-content hover:bg-surface-2': variant === 'ghost',
            'bg-transparent text-content border border-border-active rounded-lg hover:border-border-hover hover:bg-surface-2': variant === 'outline',
          },
          {
            'px-3 py-1.5 text-xs': size === 'sm',
            'px-5 py-2.5 text-sm': size === 'md',
            'px-7 py-3 text-base': size === 'lg',
          },
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
