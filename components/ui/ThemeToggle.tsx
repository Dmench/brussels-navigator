'use client'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/lib/hooks/use-theme'
import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'p-2 rounded-full text-walnut dark:text-night-muted hover:text-espresso dark:hover:text-night-text hover:bg-sand/40 dark:hover:bg-night-2 transition-colors',
        className
      )}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
