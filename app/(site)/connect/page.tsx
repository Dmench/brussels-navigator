'use client'
import { useState, useEffect } from 'react'
import { COMMUNITIES, RECURRING_EVENTS, SEED_POSTS, COMMUNES } from '@/lib/constants'
import type { NeighbourhoodPost, PostCategory } from '@/lib/types'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/hooks/use-auth'
import { supabase } from '@/lib/supabase'
import { AuthModal } from '@/components/auth/AuthModal'

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
  const [showAuth, setShowAuth] = useState(false)
  const { user, isConfigured } = useAuth()

  useEffect(() => {
    let local: NeighbourhoodPost[] = []
    try {
      const stored = localStorage.getItem('bn-posts')
      if (stored) local = JSON.parse(stored)
    } catch {}

    if (supabase) {
      supabase.from('board_posts')
        .select('id, commune, category, text, created_at, profiles(display_name)')
        .order('created_at', { ascending: false })
        .limit(50)
        .then(({ data }) => {
          const remote: NeighbourhoodPost[] = (data ?? []).map((p: any) => ({
            id: p.id,
            commune: p.commune,
            category: p.category as PostCategory,
            text: p.text,
            time: new Date(p.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
          }))
          setPosts([...local, ...remote, ...SEED_POSTS])
        })
    } else {
      setPosts([...local, ...SEED_POSTS])
    }
  }, [])

  const filteredPosts = posts.filter(p => {
    if (selectedCommune !== 'All communes' && p.commune !== selectedCommune) return false
    if (postFilter !== 'all' && p.category !== postFilter) return false
    return true
  })

  const submitPost = async () => {
    if (!newPost.commune || !newPost.text.trim()) return
    const post: NeighbourhoodPost = {
      id: `u${Date.now()}`,
      commune: newPost.commune,
      category: newPost.category,
      text: newPost.text.trim(),
      time: 'just now',
    }

    if (user && supabase) {
      await supabase.from('board_posts').insert({
        user_id: user.id,
        commune: newPost.commune,
        category: newPost.category,
        text: newPost.text.trim(),
      })
    } else {
      // localStorage fallback
      const updated = [post, ...posts]
      try {
        const userPosts = updated.filter(p => p.id.startsWith('u'))
        localStorage.setItem('bn-posts', JSON.stringify(userPosts))
      } catch {}
    }

    setPosts(prev => [post, ...prev])
    setNewPost({ commune: '', category: 'recommendation', text: '' })
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const networkingEvents = RECURRING_EVENTS.filter(e => e.category === 'networking' || e.category === 'sports')

  // Show post form if: supabase not configured OR user is signed in
  const showPostForm = !isConfigured || !!user

  return (
    <>
      {/* Full-bleed gradient header */}
      <div style={{ background: 'linear-gradient(135deg, #F7F4EE 0%, #C9D5C4 50%, #A8C4A0 100%)' }} className="px-6 md:px-8 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest mb-2 text-walnut/70">Community</p>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-espresso leading-tight">
            Connect
          </h1>
          <p className="text-walnut text-sm mt-2 max-w-lg">Groups, meetups, and your neighbourhood board.</p>
        </div>
      </div>
      {/* Fade */}
      <div style={{ height: 40, background: 'linear-gradient(to bottom, #A8C4A0, #FDFBF7)' }} />

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-10 md:py-16">
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
                  className="group bg-white border border-sand/40 rounded-2xl p-5 hover:border-terracotta/40 hover:bg-[#FFFCF9] transition-colors"
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
                  className="bg-white border border-sand/40 rounded-2xl p-4"
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

            {/* Post form or sign-in prompt */}
            {showPostForm ? (
              <div className="bg-white border border-sand/40 rounded-2xl p-5 mb-6">
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
                    className="px-6 py-2.5 bg-terracotta text-cream rounded-full text-sm font-medium hover:bg-terracotta-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {submitted ? 'Posted' : 'Post anonymously'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-terracotta/10 via-cream to-terracotta/5 border border-terracotta/20 rounded-2xl p-6 mb-6 text-center">
                <p className="text-espresso font-medium mb-2">Sign in to post</p>
                <p className="text-walnut text-sm mb-4">Share a recommendation, question, or heads-up with your neighbours.</p>
                <button onClick={() => setShowAuth(true)} className="px-6 py-2.5 bg-terracotta text-cream rounded-full text-sm font-medium hover:bg-terracotta-dark transition-colors">
                  Sign in
                </button>
              </div>
            )}

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
                      ? 'bg-terracotta text-cream'
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
                    className="bg-white border border-sand/40 rounded-2xl px-5 py-4"
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
                className="group bg-white border border-sand/40 rounded-2xl p-5 hover:border-terracotta/40 hover:bg-[#FFFCF9] transition-colors"
              >
                <p className="font-medium text-sm text-espresso group-hover:text-terracotta transition-colors mb-1">The Brussels Times</p>
                <p className="text-xs text-walnut">English-language Belgian news and analysis</p>
              </a>
              <a
                href="https://www.thebulletin.be/"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white border border-sand/40 rounded-2xl p-5 hover:border-terracotta/40 hover:bg-[#FFFCF9] transition-colors"
              >
                <p className="font-medium text-sm text-espresso group-hover:text-terracotta transition-colors mb-1">The Bulletin</p>
                <p className="text-xs text-walnut">English-language magazine on Belgian life and culture</p>
              </a>
            </div>
          </section>
        </div>
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  )
}
