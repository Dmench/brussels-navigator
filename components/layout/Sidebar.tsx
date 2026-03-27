'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/lib/constants'
import {
  Home, Map, CheckSquare, Calendar, MapPin,
  Building2, DollarSign, Globe, Users, FileText, Newspaper
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const ICONS: Record<string, LucideIcon> = {
  Home, Map, CheckSquare, Calendar, MapPin,
  Building2, DollarSign, Globe, Users, FileText, Newspaper
}

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex flex-col w-[220px] shrink-0 border-r border-border bg-surface-1 h-[calc(100vh-52px)] sticky top-[52px] overflow-y-auto">
      <nav className="p-3 space-y-0.5">
        {NAV_ITEMS.map(item => {
          const Icon = ICONS[item.icon] ?? Home
          const active = pathname === item.href || (item.href !== '/home' && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150',
                active
                  ? 'bg-amber-soft text-amber border border-amber-border'
                  : 'text-content-3 hover:text-content hover:bg-surface-2 border border-transparent'
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="mt-auto p-4 border-t border-border">
        <p className="text-[10px] text-content-4 leading-relaxed">
          Brussels Navigator provides information, not advice.
        </p>
      </div>
    </aside>
  )
}
