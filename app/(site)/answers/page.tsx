'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ANSWERS } from '@/lib/answers'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

const CATEGORIES = ['All', 'Administration', 'Housing', 'Money', 'Health', 'Daily Life', 'Legal']

const CATEGORY_BADGE_MAP: Record<string, 'default' | 'terracotta' | 'sage' | 'sky' | 'coral'> = {
  Administration: 'sky',
  Housing: 'terracotta',
  Money: 'sage',
  Health: 'coral',
  'Daily Life': 'default',
  Legal: 'default',
}

export default function AnswersPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = ANSWERS.filter(a => {
    const matchesCategory = category === 'All' || a.category === category
    const matchesSearch = !search || (
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase())
    )
    return matchesCategory && matchesSearch
  })

  return (
    <div>
      <p className="text-walnut text-xs uppercase tracking-widest mb-2">Knowledge base</p>
      <h1 className="font-display text-4xl md:text-5xl font-bold text-espresso mb-8">
        Answers
      </h1>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search answers..."
          className="w-full max-w-xl px-5 py-3 rounded-full border border-sand bg-ivory text-espresso placeholder:text-walnut/50 text-sm focus:outline-none focus:border-terracotta/50 transition-colors"
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={cn(
              'px-4 py-1.5 rounded-full text-sm font-medium transition-colors',
              category === cat
                ? 'bg-espresso text-cream'
                : 'border border-sand text-walnut hover:border-espresso/30 hover:text-espresso'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-walnut text-sm mb-6">
        {filtered.length} {filtered.length === 1 ? 'answer' : 'answers'}
        {category !== 'All' || search ? ` matching your filter` : ''}
      </p>

      {/* Answer cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(answer => (
          <Link
            key={answer.slug}
            href={`/answers/${answer.slug}`}
            className="group bg-ivory border border-sand/50 rounded-2xl p-5 hover:border-terracotta/30 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={CATEGORY_BADGE_MAP[answer.category] ?? 'default'}>
                {answer.category}
              </Badge>
              <span className="text-walnut text-xs">{answer.readTime} read</span>
            </div>
            <h2 className="font-display text-lg font-semibold text-espresso mb-2 group-hover:text-terracotta transition-colors leading-snug">
              {answer.title}
            </h2>
            <p className="text-walnut text-sm leading-relaxed line-clamp-2">
              {answer.excerpt}
            </p>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-walnut">No answers match your search.</p>
          <button
            onClick={() => { setSearch(''); setCategory('All') }}
            className="mt-3 text-terracotta text-sm hover:text-terracotta-dark transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}
