import { ExternalLink } from 'lucide-react'
import { HOUSING_LINKS, COMMUNES, USEFUL_LINKS } from '@/lib/constants'

export default function HousingPage() {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-body font-medium uppercase tracking-[0.2em] text-walnut dark:text-night-muted mb-3">Finding a home</p>
      <h1 className="text-3xl md:text-4xl font-display font-semibold text-ink dark:text-night-text mb-4">Housing in Brussels</h1>
      <p className="text-base font-body font-light text-walnut dark:text-night-muted leading-relaxed mb-12 max-w-xl">
        Most Brussels apartments are listed on Immoweb. These are the key platforms, in order of usefulness for expats.
      </p>

      {/* Platforms */}
      <section className="mb-12">
        <h2 className="text-lg font-display font-medium text-ink dark:text-night-text mb-5">Where to search</h2>
        <div className="space-y-4">
          {HOUSING_LINKS.map(link => (
            <div key={link.name} className="flex items-start gap-4 py-4 border-b border-sand/50 dark:border-night-border last:border-0">
              <div className="flex-1">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-base font-body font-medium text-espresso dark:text-night-text hover:text-terracotta transition-colors mb-1"
                >
                  {link.name} <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <p className="text-sm font-body font-light text-walnut dark:text-night-muted leading-relaxed">{link.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick commune search */}
      <section className="mb-12">
        <h2 className="text-lg font-display font-medium text-ink dark:text-night-text mb-2">Search by commune</h2>
        <p className="text-sm font-body font-light text-walnut dark:text-night-muted mb-5">Direct links to Immoweb search for each commune.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {COMMUNES.map(c => (
            <a
              key={c.id}
              href={`https://www.immoweb.be/en/search/apartment/for-rent/${c.immoweb}?countries=BE`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-3 bg-ivory dark:bg-night-1 border border-sand/50 dark:border-night-border rounded-xl text-sm font-body text-espresso dark:text-night-text hover:border-terracotta/30 hover:text-terracotta transition-colors duration-200 group"
            >
              <span>{c.name}</span>
              <ExternalLink className="w-3 h-3 text-stone dark:text-night-muted group-hover:text-terracotta" />
            </a>
          ))}
        </div>
      </section>

      {/* What to know */}
      <section className="mb-12">
        <h2 className="text-lg font-display font-medium text-ink dark:text-night-text mb-5">What to know before renting</h2>
        <div className="space-y-4 text-sm font-body font-light text-walnut dark:text-night-muted leading-relaxed">
          <p>Standard Belgian leases are nine years with early termination possible (three months' notice per three-year period completed). Short-term leases of one to three years are common and have different rules.</p>
          <p>Expect a rental guarantee of two to three months' rent, deposited in a blocked bank account at BNP, ING, or Belfius. This is separate from your monthly rent payment.</p>
          <p>Agency fees are typically one month's rent plus VAT. Direct-from-owner listings (Facebook groups) avoid this cost — worth checking before going through an agency.</p>
          <p>Always request an état des lieux (condition report) at move-in and move-out. Photograph everything. Disputes over deposits are common.</p>
        </div>
      </section>

      {/* Useful links */}
      <section>
        <h2 className="text-lg font-display font-medium text-ink dark:text-night-text mb-5">Useful resources</h2>
        <div className="space-y-3">
          {USEFUL_LINKS.slice(0, 4).map(link => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 group"
            >
              <span className="text-sm font-body font-medium text-espresso dark:text-night-text group-hover:text-terracotta transition-colors flex items-center gap-1">
                {link.label} <ExternalLink className="w-3 h-3" />
              </span>
              <span className="text-sm font-body font-light text-walnut dark:text-night-muted">— {link.desc}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
