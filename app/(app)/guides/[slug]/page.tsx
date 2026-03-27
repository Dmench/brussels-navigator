import { GUIDES } from '@/lib/guides'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return GUIDES.map(g => ({ slug: g.slug }))
}

function renderContent(content: string) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let key = 0

  for (const line of lines) {
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={key++} className="text-2xl font-display font-medium text-ink dark:text-night-text mt-10 mb-4 leading-snug">
          {line.slice(3)}
        </h2>
      )
    } else if (line.trim().length > 0) {
      elements.push(
        <p key={key++} className="text-base font-body font-light text-walnut dark:text-night-muted leading-[1.8] mb-4">
          {line}
        </p>
      )
    }
  }

  return elements
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = GUIDES.find(g => g.slug === params.slug)
  if (!guide) notFound()

  const currentIndex = GUIDES.findIndex(g => g.slug === params.slug)
  const related = GUIDES.filter((_, i) => i !== currentIndex).slice(0, 2)

  return (
    <div>
      <Link
        href="/guides"
        className="inline-flex items-center gap-1.5 text-sm font-body text-walnut dark:text-night-muted hover:text-espresso dark:hover:text-night-text transition-colors mb-10"
      >
        <ArrowLeft className="w-4 h-4" /> Back to guides
      </Link>

      <article className="max-w-2xl">
        <p className="text-xs font-body font-medium uppercase tracking-[0.2em] text-terracotta mb-3">{guide.category}</p>
        <h1 className="text-3xl md:text-5xl font-display font-semibold text-ink dark:text-night-text leading-tight tracking-tight mb-4">
          {guide.title}
        </h1>
        <p className="text-sm font-body text-walnut dark:text-night-muted mb-10">{guide.readTime} read</p>

        <div className="border-t border-sand/50 dark:border-night-border pt-8">
          {renderContent(guide.content)}
        </div>

        <p className="text-xs font-body text-walnut dark:text-night-muted mt-10 leading-relaxed border-t border-sand/50 dark:border-night-border pt-6">
          This guide provides general information only. Laws and procedures may change — always verify with official Belgian government sources before taking action.
        </p>
      </article>

      {/* Related guides */}
      {related.length > 0 && (
        <div className="max-w-2xl mt-16 border-t border-sand/50 dark:border-night-border pt-10">
          <p className="text-xs font-body font-medium uppercase tracking-[0.2em] text-walnut dark:text-night-muted mb-6">More guides</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map(g => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                className="group block bg-ivory dark:bg-night-1 border border-sand/50 dark:border-night-border rounded-xl p-5 hover:border-terracotta/30 transition-colors duration-300"
              >
                <p className="text-[11px] font-body uppercase tracking-[0.15em] text-terracotta mb-2">{g.category}</p>
                <h3 className="text-base font-display font-medium text-ink dark:text-night-text leading-tight group-hover:text-terracotta transition-colors mb-2">{g.title}</h3>
                <span className="inline-flex items-center gap-1 text-xs font-body text-terracotta">
                  Read <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
