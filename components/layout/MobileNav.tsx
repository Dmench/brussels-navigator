'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { MOBILE_NAV_ITEMS } from '@/lib/constants'
import { Home, Map, CheckSquare, MapPin, Newspaper } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const ICONS: Record<string, LucideIcon> = {
  Home, Map, CheckSquare, MapPin, Newspaper
}

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 h-14 bg-surface-1 border-t border-border flex items-stretch">
      {MOBILE_NAV_ITEMS.map(item => {
        const Icon = ICONS[item.icon] ?? Home
        const active = pathname === item.href || (item.href !== '/home' && pathname.startsWith(item.href))
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex-1 flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold font-display transition-all duration-150',
              active ? 'text-amber' : 'text-content-4 hover:text-content-2'
            )}
          >
            <Icon className="w-5 h-5" />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
