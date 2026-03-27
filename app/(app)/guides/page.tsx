import Link from 'next/link'
import { GUIDES } from '@/lib/guides'
import { ArrowRight } from 'lucide-react'

export default function GuidesPage() {
  return (
    <div>
      <p className="text-xs font-body font-medium uppercase tracking-[0.2em] text-walnut dark:text-night-muted mb-3">Guides</p>
      <h1 className="text-3xl md:text-4xl font-display font-semibold text-ink dark:text-night-text mb-4">Essential reading</h1>
      <p className="text-base font-body font-light text-walnut dark:text-night-muted leading-relaxed mb-12 max-w-xl">
        Practical, detailed guides to the most important aspects of moving to and living in Brussels.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {GUIDES.map(guide => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group block bg-ivory dark:bg-night-1 border border-sand/50 dark:border-night-border rounded-2xl p-7 hover:border-terracotta/30 dark:hover:border-terracotta/30 transition-colors duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-body font-medium uppercase tracking-[0.15em] text-terracotta">{guide.category}</span>
              <span className="text-xs font-body text-walnut dark:text-night-muted">{guide.readTime}</span>
            </div>
            <h2 className="text-xl font-display font-medium text-ink dark:text-night-text leading-tight mb-3 group-hover:text-terracotta transition-colors duration-300">
              {guide.title}
            </h2>
            <p className="text-sm font-body font-light text-walnut dark:text-night-muted leading-relaxed mb-5">
              {guide.excerpt}
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm font-body text-terracotta group-hover:underline underline-offset-4 transition-all">
              Read <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
