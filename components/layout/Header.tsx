'use client'

import Link from 'next/link'

export function Header() {
  return (
    <header className="h-13 sticky top-0 z-50 bg-surface-1/80 backdrop-blur-xl border-b border-border flex items-center px-4 lg:px-6">
      <Link href="/" className="flex items-center gap-2.5 group">
        <div className="w-8 h-8 rounded-lg border border-amber-border bg-amber-soft flex items-center justify-center text-base shadow-glow-amber group-hover:shadow-glow-amber-strong transition-all duration-150">
          🇧🇪
        </div>
        <span className="font-display font-bold text-base text-content">Brussels Navigator</span>
      </Link>
    </header>
  )
}
