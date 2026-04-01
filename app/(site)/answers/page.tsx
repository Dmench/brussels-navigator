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
    <>
      {/* Full-bleed gradient header */}
      <div style={{ background: 'linear-gradient(135deg, #F7F4EE 0%, #DDD0C4 50%, #C8B4A0 100%)' }} className="px-6 md:px-8 py-8 md:py-12">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-8">
          <div>
            <p className="text-xs uppercase tracking-widest mb-2 text-walnut/70">Knowledge base</p>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-espresso leading-tight">
              Answers
            </h1>
          </div>
          <div className="hidden lg:block w-52 h-32 rounded-2xl overflow-hidden shrink-0 ring-1 ring-white/30">
            <img
              src="/images/grand-place-facades.jpg"
              alt="Grand Place facades, Brussels"
              className="w-full h-full object-cover"
              style={{ filter: 'saturate(0.7) brightness(0.9)', objectPosition: 'center 40%' }}
            />
          </div>
        </div>
      </div>
      {/* Fade */}
      <div style={{ height: 40, background: 'linear-gradient(to bottom, #C8B4A0, #FDFBF7)' }} />

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-10 md:py-16">
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
                  ? 'bg-terracotta text-cream'
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
              className="group bg-white border border-sand/40 rounded-2xl p-5 hover:border-terracotta/40 hover:bg-[#FFFCF9] transition-colors"
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
    </>
  )
}
