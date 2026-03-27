'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/explore', label: 'Explore' },
  { href: '/answers', label: 'Answers' },
  { href: '/events', label: 'Events' },
  { href: '/connect', label: 'Connect' },
  { href: '/tools', label: 'Tools' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <header className="sticky top-0 z-50 bg-cream/95 dark:bg-night/95 backdrop-blur-sm border-b border-sand/50 dark:border-night-border">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link
              href="/"
              className="font-display font-semibold text-lg text-espresso dark:text-night-text hover:text-terracotta dark:hover:text-terracotta transition-colors"
            >
              Brussels Navigator
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm transition-colors',
                    pathname.startsWith(link.href)
                      ? 'text-espresso dark:text-night-text font-medium'
                      : 'text-walnut dark:text-night-muted hover:text-espresso dark:hover:text-night-text'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden p-2 rounded-full text-walnut dark:text-night-muted hover:bg-sand/40 dark:hover:bg-night-2 transition-colors"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-cream dark:bg-night flex flex-col">
          <div className="flex items-center justify-between h-14 px-6 border-b border-sand/50 dark:border-night-border">
            <Link
              href="/"
              className="font-display font-semibold text-lg text-espresso dark:text-night-text"
              onClick={() => setMobileOpen(false)}
            >
              Brussels Navigator
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-full text-walnut dark:text-night-muted hover:bg-sand/40 dark:hover:bg-night-2 transition-colors"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
          <nav className="flex flex-col px-6 py-8 gap-6">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-2xl font-display transition-colors',
                  pathname.startsWith(link.href)
                    ? 'text-terracotta'
                    : 'text-espresso dark:text-night-text hover:text-terracotta'
                )}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="px-6 pb-8 mt-auto">
            <ThemeToggle />
          </div>
        </div>
      )}
    </>
  )
}
