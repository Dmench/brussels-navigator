'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { Answer } from '@/lib/types'
import { Badge } from '@/components/ui/Badge'

const CATEGORY_BADGE_MAP: Record<string, 'default' | 'terracotta' | 'sage' | 'sky' | 'coral'> = {
  Administration: 'sky',
  Housing: 'terracotta',
  Money: 'sage',
  Health: 'coral',
  'Daily Life': 'default',
  Legal: 'default',
}

function renderContent(content: string) {
  const paragraphs = content.split(/\n\n+/)
  return paragraphs.map((para, i) => {
    if (para.startsWith('## ')) {
      return (
        <h2 key={i} className="font-display text-xl font-semibold text-espresso mt-8 mb-3">
          {para.slice(3)}
        </h2>
      )
    }
    return (
      <p key={i} className="text-espresso leading-relaxed mb-4">
        {para}
      </p>
    )
  })
}

interface Props {
  answer: Answer
  relatedAnswers: Answer[]
}

export function AnswerClient({ answer, relatedAnswers }: Props) {
  const [helpful, setHelpful] = useState<boolean | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`bn-helpful-${answer.slug}`)
      if (stored !== null) setHelpful(stored === 'true')
    } catch {}
  }, [answer.slug])

  const markHelpful = (val: boolean) => {
    setHelpful(val)
    try { localStorage.setItem(`bn-helpful-${answer.slug}`, String(val)) } catch {}
  }

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-16">
    <div className="max-w-2xl">
      {/* Back */}
      <Link
        href="/answers"
        className="inline-flex items-center gap-1 text-walnut text-sm hover:text-espresso transition-colors mb-8"
      >
        Back to answers
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant={CATEGORY_BADGE_MAP[answer.category] ?? 'default'}>
            {answer.category}
          </Badge>
          <span className="text-walnut text-xs">{answer.readTime} read</span>
          <span className="text-walnut text-xs">·</span>
          <span className="text-walnut text-xs">Last verified March 2026</span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-espresso leading-tight">
          {answer.title}
        </h1>
      </div>

      {/* Content */}
      <div className="mb-10">
        {renderContent(answer.content)}
      </div>

      {/* Official links */}
      {answer.officialLinks && answer.officialLinks.length > 0 && (
        <div className="bg-ivory border border-sand/50 rounded-2xl p-5 mb-8">
          <p className="text-walnut text-xs uppercase tracking-widest mb-3">Official sources</p>
          <div className="space-y-2">
            {answer.officialLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-sky hover:text-sky/80 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Related links */}
      {answer.relatedLinks && answer.relatedLinks.length > 0 && (
        <div className="bg-ivory border border-sand/50 rounded-2xl p-5 mb-8">
          <p className="text-walnut text-xs uppercase tracking-widest mb-3">Related tools and answers</p>
          <div className="space-y-2">
            {answer.relatedLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm text-terracotta hover:text-terracotta-dark transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Helpful? */}
      <div className="border border-sand/50 rounded-2xl p-5 mb-10">
        <p className="text-sm text-espresso mb-3">Was this helpful?</p>
        {helpful === null ? (
          <div className="flex gap-3">
            <button
              onClick={() => markHelpful(true)}
              className="px-5 py-2 rounded-full border border-sand text-sm text-walnut hover:border-sage hover:text-sage transition-colors"
            >
              Yes
            </button>
            <button
              onClick={() => markHelpful(false)}
              className="px-5 py-2 rounded-full border border-sand text-sm text-walnut hover:border-coral hover:text-coral transition-colors"
            >
              Not really
            </button>
          </div>
        ) : (
          <p className="text-sm text-walnut">
            {helpful ? 'Thank you for the feedback.' : 'Thanks — we will review this answer.'}
          </p>
        )}
      </div>

      {/* Related questions */}
      {relatedAnswers.length > 0 && (
        <div>
          <h2 className="font-display text-xl font-semibold text-espresso mb-4">
            More in {answer.category}
          </h2>
          <div className="space-y-3">
            {relatedAnswers.map(rel => (
              <Link
                key={rel.slug}
                href={`/answers/${rel.slug}`}
                className="flex items-center justify-between px-5 py-4 bg-ivory border border-sand/50 rounded-2xl hover:border-terracotta/30 transition-colors group"
              >
                <span className="text-sm text-espresso group-hover:text-terracotta transition-colors">
                  {rel.title}
                </span>
                <span className="text-walnut text-xs ml-4 shrink-0">{rel.readTime}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
    </div>
  )
}
