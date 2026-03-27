import Link from 'next/link'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

export function Footer() {
  return (
    <footer className="bg-espresso text-cream dark:bg-night-1">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <p className="font-display font-semibold text-xl mb-3">Brussels Navigator</p>
            <p className="text-sm text-cream/60 leading-relaxed max-w-sm">
              An independent guide for expats moving to and living in Brussels. Not affiliated with any government body or official organisation.
            </p>
          </div>

          {/* Getting started */}
          <div>
            <p className="text-xs font-body font-medium uppercase tracking-[0.2em] text-cream/40 mb-4">Getting started</p>
            <div className="space-y-2.5">
              {[
                { href: '/plan', label: 'Plan builder' },
                { href: '/checklist', label: 'Setup checklist' },
                { href: '/calendar', label: 'Calendar 2026' },
                { href: '/templates', label: 'Templates' },
              ].map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-sm text-cream/60 hover:text-cream transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <p className="text-xs font-body font-medium uppercase tracking-[0.2em] text-cream/40 mb-4">Explore</p>
            <div className="space-y-2.5">
              {[
                { href: '/neighborhoods', label: 'Neighbourhoods' },
                { href: '/housing', label: 'Finding housing' },
                { href: '/costs', label: 'Cost calculator' },
                { href: '/guides', label: 'Guides' },
                { href: '/community', label: 'Community' },
              ].map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-sm text-cream/60 hover:text-cream transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs text-cream/40">
              Brussels Navigator provides information, not advice. We are not liable for decisions made based on this content.
            </p>
            <p className="text-xs text-cream/40">
              Data verified March 2026. Information may change — always check official sources.
            </p>
          </div>
          <ThemeToggle className="text-cream/40 hover:text-cream" />
        </div>
      </div>
    </footer>
  )
}
