import Link from 'next/link'

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
    <footer className="bg-espresso text-cream">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          <div className="md:col-span-1">
            <p className="font-display text-xl font-semibold mb-2">Bubl</p>
            <p className="text-stone text-sm leading-relaxed mb-1">Your Brussels bubble.</p>
            <p className="text-stone/70 text-sm leading-relaxed">
              For everyone who lives here.
            </p>
          </div>

          {FOOTER_SECTIONS.map(section => (
            <div key={section.title}>
              <p className="text-stone/60 text-xs uppercase tracking-widest font-medium mb-3">
                {section.title}
              </p>
              <ul className="space-y-2">
                {section.links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-stone text-sm hover:text-cream transition-colors link-hover"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-white/10">
          <p className="text-stone/50 text-xs leading-relaxed max-w-2xl">
            Bubl provides information, not advice. Always verify with official sources.
          </p>
        </div>
      </div>
    </footer>
  )
}
