'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { X, Menu } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { NAV_ITEMS, ALL_NAV_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 h-16 bg-cream/90 dark:bg-night/90 backdrop-blur-xl border-b border-sand/50 dark:border-night-border flex items-center px-6 md:px-8">
        <Link href="/" className="mr-8 shrink-0">
          <span className="font-display font-semibold text-lg text-ink dark:text-night-text tracking-tight">
            Brussels Navigator
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 flex-1">
          {NAV_ITEMS.map(item => {
            const active = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-body transition-colors duration-200',
                  active
                    ? 'text-espresso dark:text-night-text font-medium'
                    : 'text-walnut hover:text-espresso dark:text-night-muted dark:hover:text-night-text'
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden w-8 h-8 flex items-center justify-center text-walnut hover:text-espresso dark:text-night-muted dark:hover:text-night-text transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile overlay menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-cream dark:bg-night flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-sand/50 dark:border-night-border justify-between">
            <span className="font-display font-semibold text-lg text-ink dark:text-night-text">Brussels Navigator</span>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-8 h-8 flex items-center justify-center text-walnut hover:text-espresso dark:text-night-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-6 py-8">
            {(['Getting started', 'Explore', 'Guides', 'Community'] as const).map(group => {
              const items = ALL_NAV_ITEMS.filter(i => i.group === group)
              if (!items.length) return null
              return (
                <div key={group} className="mb-8">
                  <p className="text-xs font-body font-medium uppercase tracking-[0.2em] text-walnut dark:text-night-muted mb-3">{group}</p>
                  <div className="space-y-1">
                    {items.map(item => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="block py-2.5 text-base font-body text-espresso dark:text-night-text hover:text-terracotta dark:hover:text-terracotta transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </nav>
          <div className="px-6 py-6 border-t border-sand/50 dark:border-night-border flex items-center justify-between">
            <span className="text-xs text-walnut dark:text-night-muted">Toggle theme</span>
            <ThemeToggle />
          </div>
        </div>
      )}
    </>
  )
}
