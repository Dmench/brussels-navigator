'use client'
import { useState, useEffect } from 'react'
import { COMMUNITIES, RECURRING_EVENTS, SEED_POSTS, COMMUNES } from '@/lib/constants'
import type { NeighbourhoodPost, PostCategory } from '@/lib/types'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

const COMMUNE_NAMES = ['All communes', ...COMMUNES.map(c => c.name)]

const CATEGORY_COLORS: Record<PostCategory, 'terracotta' | 'sage' | 'sky'> = {
  recommendation: 'sage',
  question: 'sky',
  'heads-up': 'terracotta',
}

const PLATFORM_BADGE: Record<string, 'default' | 'terracotta' | 'sage' | 'sky'> = {
  Facebook: 'sky',
  Reddit: 'terracotta',
  InterNations: 'sage',
  Meetup: 'default',
  News: 'default',
}

export default function ConnectPage() {
  const [selectedCommune, setSelectedCommune] = useState('All communes')
  const [postFilter, setPostFilter] = useState<'all' | PostCategory>('all')
  const [posts, setPosts] = useState<NeighbourhoodPost[]>([])
  const [newPost, setNewPost] = useState({ commune: '', category: 'recommendation' as PostCategory, text: '' })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    let local: NeighbourhoodPost[] = []
    try {
      const stored = localStorage.getItem('bn-posts')
      if (stored) local = JSON.parse(stored)
    } catch {}
    setPosts([...local, ...SEED_POSTS])
  }, [])

  const filteredPosts = posts.filter(p => {
    if (selectedCommune !== 'All communes' && p.commune !== selectedCommune) return false
    if (postFilter !== 'all' && p.category !== postFilter) return false
    return true
  })

  const submitPost = () => {
    if (!newPost.commune || !newPost.text.trim()) return
    const post: NeighbourhoodPost = {
      id: `u${Date.now()}`,
      commune: newPost.commune,
      category: newPost.category,
      text: newPost.text.trim(),
      time: 'just now',
    }
    const updated = [post, ...posts]
    setPosts(updated)
    try {
      const userPosts = updated.filter(p => p.id.startsWith('u'))
      localStorage.setItem('bn-posts', JSON.stringify(userPosts))
    } catch {}
    setNewPost({ commune: '', category: 'recommendation', text: '' })
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const networkingEvents = RECURRING_EVENTS.filter(e => e.category === 'networking' || e.category === 'sports')

  return (
    <div>
      <p className="text-walnut text-xs uppercase tracking-widest mb-2">Community</p>
      <h1 className="font-display text-4xl md:text-5xl font-bold text-espresso mb-10">
        Connect
      </h1>

      <div className="space-y-12">
        {/* Section 1: Find your people */}
        <section>
          <h2 className="font-display text-2xl font-semibold text-espresso mb-4">
            Find your people
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {COMMUNITIES.map(c => (
              <a
                key={c.name}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-ivory border border-sand/50 rounded-2xl p-5 hover:border-terracotta/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-espresso group-hover:text-terracotta transition-colors">
                      {c.name}
                    </p>
                    {c.members && (
                      <p className="text-xs text-walnut mt-0.5">{c.members} members</p>
                    )}
                  </div>
                  <Badge variant={PLATFORM_BADGE[c.platform] ?? 'default'}>{c.platform}</Badge>
                </div>
                <p className="text-xs text-walnut leading-relaxed">{c.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Section 2: Regular meetups */}
        <section>
          <h2 className="font-display text-2xl font-semibold text-espresso mb-4">
            Regular meetups
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {networkingEvents.map(event => (
              <div
                key={event.title}
                className="bg-ivory border border-sand/50 rounded-2xl p-4"
              >
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-espresso">{event.title}</p>
                  <Badge>{event.day}</Badge>
                </div>
                <p className="text-xs text-walnut mb-1">{event.time} · {event.location}</p>
                <p className="text-xs text-walnut">{event.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Neighbourhood board */}
        <section>
          <h2 className="font-display text-2xl font-semibold text-espresso mb-2">
            Neighbourhood board
          </h2>
          <p className="text-walnut text-sm mb-6">
            Local tips, questions, and heads-up from Brussels residents.
          </p>

          {/* Post form */}
          <div className="bg-ivory border border-sand/50 rounded-2xl p-5 mb-6">
            <p className="text-sm font-medium text-espresso mb-4">Share something</p>
            <div className="space-y-3">
              <select
                value={newPost.commune}
                onChange={e => setNewPost(p => ({ ...p, commune: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-sand bg-cream text-espresso text-sm focus:outline-none focus:border-terracotta/50"
              >
                <option value="">Select commune</option>
                {COMMUNES.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>

              <div className="flex gap-2">
                {(['recommendation', 'question', 'heads-up'] as PostCategory[]).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setNewPost(p => ({ ...p, category: cat }))}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors',
                      newPost.category === cat
                        ? cat === 'recommendation' ? 'bg-sage/20 text-sage border border-sage/30'
                          : cat === 'question' ? 'bg-sky/20 text-sky border border-sky/30'
                          : 'bg-terracotta/20 text-terracotta border border-terracotta/30'
                        : 'border border-sand text-walnut hover:border-espresso/30'
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div>
                <textarea
                  value={newPost.text}
                  onChange={e => setNewPost(p => ({ ...p, text: e.target.value.slice(0, 280) }))}
                  placeholder="What do you want to share?"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-sand bg-cream text-espresso placeholder:text-walnut/50 text-sm focus:outline-none focus:border-terracotta/50 resize-none"
                />
                <p className="text-xs text-walnut text-right mt-1">{newPost.text.length}/280</p>
              </div>

              <button
                onClick={submitPost}
                disabled={!newPost.commune || !newPost.text.trim()}
                className="px-6 py-2.5 bg-espresso text-cream rounded-full text-sm font-medium hover:bg-ink transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {submitted ? 'Posted' : 'Post anonymously'}
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            {/* Commune filter */}
            <select
              value={selectedCommune}
              onChange={e => setSelectedCommune(e.target.value)}
              className="px-4 py-1.5 rounded-full border border-sand bg-cream text-espresso text-sm focus:outline-none focus:border-terracotta/50"
            >
              {COMMUNE_NAMES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            {/* Category filter */}
            {(['all', 'recommendation', 'question', 'heads-up'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setPostFilter(cat)}
                className={cn(
                  'px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors',
                  postFilter === cat
                    ? 'bg-espresso text-cream'
                    : 'border border-sand text-walnut hover:text-espresso'
                )}
              >
                {cat === 'all' ? 'All posts' : cat}
              </button>
            ))}
          </div>

          {/* Posts feed */}
          <div className="space-y-3">
            {filteredPosts.length === 0 ? (
              <p className="text-walnut text-sm py-8 text-center">No posts match this filter.</p>
            ) : (
              filteredPosts.map(post => (
                <div
                  key={post.id}
                  className="bg-ivory border border-sand/50 rounded-2xl px-5 py-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={CATEGORY_COLORS[post.category]}>{post.category}</Badge>
                    <span className="text-xs text-walnut">{post.commune}</span>
                    <span className="text-xs text-walnut ml-auto">{post.time}</span>
                  </div>
                  <p className="text-sm text-espresso leading-relaxed">{post.text}</p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Section 4: English news */}
        <section>
          <h2 className="font-display text-2xl font-semibold text-espresso mb-4">
            English news
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href="https://www.brusselstimes.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-ivory border border-sand/50 rounded-2xl p-5 hover:border-terracotta/30 transition-colors"
            >
              <p className="font-medium text-sm text-espresso group-hover:text-terracotta transition-colors mb-1">The Brussels Times</p>
              <p className="text-xs text-walnut">English-language Belgian news and analysis</p>
            </a>
            <a
              href="https://www.thebulletin.be/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-ivory border border-sand/50 rounded-2xl p-5 hover:border-terracotta/30 transition-colors"
            >
              <p className="font-medium text-sm text-espresso group-hover:text-terracotta transition-colors mb-1">The Bulletin</p>
              <p className="text-xs text-walnut">English-language magazine on Belgian life and culture</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
