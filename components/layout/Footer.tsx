import Link from 'next/link'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const FOOTER_SECTIONS = [
  {
    title: 'Navigate',
    links: [
      { href: '/explore', label: 'Explore' },
      { href: '/answers', label: 'Answers' },
      { href: '/events', label: 'Events' },
      { href: '/connect', label: 'Connect' },
    ],
  },
  {
    title: 'Tools',
    links: [
      { href: '/tools/calculator', label: 'Cost calculator' },
      { href: '/tools/templates', label: 'Letter templates' },
      { href: '/tools/checklist', label: 'Setup checklist' },
      { href: '/tools/neighborhoods', label: 'Neighbourhood guide' },
      { href: '/tools/map', label: 'Interactive map' },
    ],
  },
  {
    title: 'Answers',
    links: [
      { href: '/answers/how-to-register-commune', label: 'Register at your commune' },
      { href: '/answers/which-neighbourhood', label: 'Choose a neighbourhood' },
      { href: '/answers/cost-of-living', label: 'Cost of living' },
      { href: '/answers/find-english-doctor', label: 'Find a doctor' },
      { href: '/answers/how-transport-works', label: 'Public transport' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-espresso text-cream dark:bg-night-1 dark:text-night-text">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="font-display text-xl font-semibold mb-3">Brussels Navigator</p>
            <p className="text-stone dark:text-night-muted text-sm leading-relaxed">
              The community platform for Brussels expats. Tools, answers, events, and local connections.
            </p>
            <div className="mt-4">
              <ThemeToggle className="text-stone dark:text-night-muted hover:text-cream dark:hover:text-night-text" />
            </div>
          </div>

          {/* Navigation sections */}
          {FOOTER_SECTIONS.map(section => (
            <div key={section.title}>
              <p className="text-stone/60 dark:text-night-muted text-xs uppercase tracking-widest font-medium mb-3">
                {section.title}
              </p>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-stone dark:text-night-muted text-sm hover:text-cream dark:hover:text-night-text transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 dark:border-night-border">
          <p className="text-stone/50 dark:text-night-muted text-xs leading-relaxed max-w-2xl">
            Brussels Navigator provides information, not advice. Data verified March 2026. Always verify important administrative, legal, and financial information with official sources or qualified professionals.
          </p>
        </div>
      </div>
    </footer>
  )
}
