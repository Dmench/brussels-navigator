'use client'
import { useState } from 'react'
import { X } from 'lucide-react'
import { useAuth } from '@/lib/hooks/use-auth'
import { cn } from '@/lib/utils'

interface Props {
  onClose: () => void
}

type Mode = 'signin' | 'signup'

export function AuthModal({ onClose }: Props) {
  const [mode, setMode] = useState<Mode>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const { signIn, signUp, signInWithGoogle } = useAuth()

  const inputClass = 'w-full px-4 py-3 rounded-xl border border-sand bg-cream text-espresso placeholder:text-walnut/50 text-sm focus:outline-none focus:border-terracotta/50 transition-colors'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) return
    setSubmitting(true)
    setError(null)

    const err = mode === 'signin'
      ? await signIn(email, password)
      : await signUp(email, password, displayName || undefined)

    setSubmitting(false)
    if (err) {
      setError(err)
    } else {
      if (mode === 'signup') {
        setDone(true)
      } else {
        onClose()
      }
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-cream rounded-3xl border border-sand/50 w-full max-w-sm p-8 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-walnut hover:bg-sand/40 transition-colors"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        {done ? (
          <div className="text-center py-4">
            <p className="font-display text-2xl font-bold text-espresso mb-3">Check your email</p>
            <p className="text-walnut text-sm leading-relaxed mb-6">
              We sent a confirmation link to <strong>{email}</strong>. Click it to complete your account setup.
            </p>
            <button onClick={onClose} className="px-6 py-2.5 bg-terracotta text-cream rounded-full text-sm font-medium hover:bg-terracotta-dark transition-colors">
              Got it
            </button>
          </div>
        ) : (
          <>
            <p className="font-display text-2xl font-bold text-espresso mb-6">
              {mode === 'signin' ? 'Sign in to Bubl' : 'Create account'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              {mode === 'signup' && (
                <input
                  type="text"
                  placeholder="Display name (optional)"
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                  className={inputClass}
                />
              )}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className={inputClass}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={6}
                className={inputClass}
              />

              {error && (
                <p className="text-coral text-xs px-1">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-terracotta text-cream rounded-full text-sm font-medium hover:bg-terracotta-dark transition-colors disabled:opacity-50"
              >
                {submitting ? 'Please wait...' : mode === 'signin' ? 'Sign in' : 'Create account'}
              </button>
            </form>

            <div className="mt-4">
              <button
                onClick={signInWithGoogle}
                className="w-full py-3 border border-sand rounded-full text-sm text-walnut hover:border-espresso/30 hover:text-espresso transition-colors"
              >
                Continue with Google
              </button>
            </div>

            <div className="mt-5 text-center space-y-2">
              <button
                onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(null) }}
                className="text-xs text-walnut hover:text-terracotta transition-colors"
              >
                {mode === 'signin' ? 'New here? Create an account' : 'Already have an account? Sign in'}
              </button>
              <br />
              <button
                onClick={onClose}
                className="text-xs text-walnut/60 hover:text-walnut transition-colors"
              >
                or continue as guest
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
