'use client'

import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/lib/hooks/use-theme'
import { cn } from '@/lib/utils'

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      className={cn(
        'w-8 h-8 rounded-full flex items-center justify-center text-walnut hover:text-espresso dark:text-night-muted dark:hover:text-night-text transition-colors',
        className
      )}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  )
}
