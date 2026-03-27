'use client'

import Link from 'next/link'
import { useNews } from '@/lib/hooks/use-news'
import { ArrowRight, Newspaper } from 'lucide-react'

export function NewsPreview() {
  const { data: news, loading } = useNews()
  const preview = news.slice(0, 3)

  return (
    <Link
      href="/this-week"
      className="block bg-surface-1 border border-border rounded-xl p-4 shadow-card hover:border-border-hover hover:shadow-card-hover hover:-translate-y-px transition-all duration-150 group"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Newspaper className="w-4 h-4 text-content-3" />
          <p className="text-xs font-display font-semibold uppercase tracking-widest text-content-3">r/brussels</p>
        </div>
        <ArrowRight className="w-4 h-4 text-content-4 group-hover:text-content-2 transition-colors" />
      </div>

      {loading ? (
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-8 bg-surface-3 rounded animate-pulse" />
          ))}
        </div>
      ) : preview.length === 0 ? (
        <p className="text-xs text-content-4">No posts found.</p>
      ) : (
        <div className="space-y-2.5">
          {preview.map(item => (
            <p key={item.id} className="text-sm text-content leading-snug line-clamp-2">{item.title}</p>
          ))}
        </div>
      )}
    </Link>
  )
}
