'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useProfile } from '@/lib/hooks/use-preferences'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ArrowRight, CheckSquare, Calendar, MapPin, DollarSign, Home, FileText, Sparkles } from 'lucide-react'

const FEATURES = [
  { icon: CheckSquare, title: 'Setup Checklist', desc: 'Everything you need to do, in order. Profile-aware tips for EU, non-EU, and students.' },
  { icon: Calendar, title: 'Events Calendar', desc: '2026 public holidays and major Brussels events, with live API sync.' },
  { icon: MapPin, title: 'Neighborhoods', desc: 'Compare 10 communes with expat ratings, avg rents, and vibes.' },
  { icon: DollarSign, title: 'Cost Estimator', desc: 'Realistic monthly budget with live currency conversion for 12 currencies.' },
  { icon: Home, title: 'Housing Links', desc: 'All major platforms. Search by commune. Quick Immoweb deep links.' },
  { icon: FileText, title: 'Letter Templates', desc: 'Fill-in-the-blank letters in English and French for every situation.' },
]

const PROFILE_CARDS = [
  { id: 'eu' as const, label: 'EU Professional', desc: 'EU citizen working in Brussels', icon: '💼' },
  { id: 'non-eu' as const, label: 'Non-EU Professional', desc: 'Work permit holder or relocating expat', icon: '🌍' },
  { id: 'student' as const, label: 'Student / Trainee', desc: 'Studying or interning in Brussels', icon: '🎓' },
]

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [emailSaved, setEmailSaved] = useState(false)
  const [, setProfile] = useProfile()

  function saveEmail() {
    if (email) {
      try { localStorage.setItem('waitlist-email', email) } catch {}
      setEmailSaved(true)
    }
  }

  return (
    <div className="min-h-screen bg-surface-0 text-content font-body relative overflow-hidden">
      {/* Ambient gradients */}
      <div className="fixed top-0 right-0 w-96 h-96 opacity-5 pointer-events-none" style={{ background: 'radial-gradient(circle, #F59E0B 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
      <div className="fixed bottom-0 left-0 w-96 h-96 opacity-5 pointer-events-none" style={{ background: 'radial-gradient(circle, #60A5FA 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface-1/80 backdrop-blur-xl border-b border-border h-13 flex items-center px-4 lg:px-8">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg border border-amber-border bg-amber-soft flex items-center justify-center text-base shadow-glow-amber">
            🇧🇪
          </div>
          <span className="font-display font-bold text-base text-content">Brussels Navigator</span>
        </div>
        <div className="ml-auto">
          <Link href="/home" className="text-sm text-content-3 hover:text-content transition-colors px-3 py-1.5">
            Open App →
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-16 lg:py-24">
        {/* Hero */}
        <section className="text-center mb-20 animate-fade-up">
          <Badge variant="amber" className="mb-4">Free tool · No sign-up required</Badge>
          <h1 className="text-4xl lg:text-6xl font-display font-extrabold text-content leading-tight mb-4">
            Your first 90 days<br />in Brussels.
          </h1>
          <p className="text-lg text-content-3 mb-2">One place. No chaos.</p>
          <p className="text-sm text-content-4 mb-8 max-w-md mx-auto">
            The complete guide for expats: what to do, how much it costs, and where to live.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/plan">
              <Button size="lg" className="flex items-center gap-2">
                Build My Brussels Plan <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/home">
              <Button variant="ghost" size="lg">
                Explore the tool
              </Button>
            </Link>
          </div>
          <p className="text-xs text-content-4 mt-4">Takes 60 seconds. Completely free.</p>
        </section>

        {/* Profile selector */}
        <section className="mb-20">
          <p className="text-xs font-display font-semibold uppercase tracking-widest text-content-3 text-center mb-6">Who are you?</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PROFILE_CARDS.map(p => (
              <Link
                key={p.id}
                href="/plan"
                onClick={() => setProfile(p.id)}
                className="block p-5 bg-surface-1 border border-border rounded-xl hover:border-amber-border hover:-translate-y-px transition-all duration-150 text-center shadow-card"
              >
                <div className="text-3xl mb-3">{p.icon}</div>
                <p className="text-sm font-display font-bold text-content mb-1">{p.label}</p>
                <p className="text-xs text-content-3">{p.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mb-20">
          <p className="text-xs font-display font-semibold uppercase tracking-widest text-content-3 text-center mb-6">Everything included, free</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {FEATURES.map(feature => (
              <div key={feature.title} className="p-4 bg-surface-1 border border-border rounded-xl shadow-card">
                <feature.icon className="w-5 h-5 text-amber mb-3" />
                <p className="text-sm font-display font-bold text-content mb-1">{feature.title}</p>
                <p className="text-xs text-content-3 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-20">
          <p className="text-xs font-display font-semibold uppercase tracking-widest text-content-3 text-center mb-6">Simple pricing</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="p-5 bg-surface-1 border border-border rounded-xl shadow-card">
              <p className="text-xl font-display font-bold text-content mb-0.5">Free</p>
              <p className="text-sm text-content-3 mb-4">Everything you need to get settled.</p>
              <ul className="space-y-1.5 mb-5">
                {['Setup checklist', 'Events calendar', '10 commune guides', 'Cost estimator', 'Housing links', '2 fillable templates', 'Interactive map', 'Community links'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-xs text-content-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/home">
                <Button variant="ghost" size="sm" className="w-full">Start for free</Button>
              </Link>
            </div>

            <div className="p-5 bg-surface-1 border border-amber-border rounded-xl shadow-glow-amber">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-xl font-display font-bold text-content">Move Pack</p>
                <Badge variant="amber">Coming soon</Badge>
              </div>
              <p className="text-lg font-display font-bold text-amber mb-0.5">€19 <span className="text-sm font-normal text-content-3">one-time</span></p>
              <p className="text-xs text-content-3 mb-4">For when you really need to get it right.</p>
              <ul className="space-y-1.5 mb-5">
                {['All 7 fillable templates (EN/FR)', 'Downloadable checklist PDF', 'Commune comparison export', '12 months of updates'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-xs text-content-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="ghost" size="sm" className="w-full" disabled>
                Coming soon
              </Button>
            </div>
          </div>
        </section>

        {/* Email capture */}
        <section className="mb-20 text-center">
          <Sparkles className="w-6 h-6 text-amber mx-auto mb-3" />
          <h3 className="text-lg font-display font-bold text-content mb-1">Get notified when Move Pack launches</h3>
          <p className="text-xs text-content-3 mb-4">No spam. One email when it&apos;s ready.</p>
          {emailSaved ? (
            <p className="text-sm text-emerald font-semibold">You&apos;re on the list!</p>
          ) : (
            <div className="flex gap-2 max-w-sm mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && saveEmail()}
                placeholder="your@email.com"
                className="flex-1 px-3 py-2.5 bg-surface-0 border border-border rounded-lg text-content text-sm placeholder:text-content-4 outline-none focus:border-amber focus:ring-1 transition-all duration-150"
              />
              <Button onClick={saveEmail}>Notify me</Button>
            </div>
          )}
        </section>

        <section className="text-center">
          <p className="text-xs text-content-4 leading-relaxed max-w-lg mx-auto">
            Brussels Navigator provides information, not advice. We are not liable for decisions made based on this content.
            Information reflects 2024–2026 conditions and may change.
          </p>
        </section>
      </main>

      <footer className="border-t border-border py-8 px-4 text-center">
        <p className="text-xs text-content-4">
          © 2026 Brussels Navigator ·{' '}
          <Link href="/home" className="hover:text-content-2 transition-colors">Open App</Link>
          {' '}· Information only, not advice
        </p>
      </footer>
    </div>
  )
}
