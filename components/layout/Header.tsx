'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/hooks/use-auth'
import { AuthModal } from '@/components/auth/AuthModal'

const NAV_LINKS = [
  { href: '/explore', label: 'Explore' },
  { href: '/answers', label: 'Answers' },
  { href: '/events', label: 'Events' },
  { href: '/connect', label: 'Connect' },
  { href: '/tools', label: 'Tools' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const pathname = usePathname()
  const { user, signOut, isConfigured } = useAuth()

  return (
    <>
      <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-sand/50">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between h-14">
            <Link
              href="/"
              className="font-display font-bold text-xl text-terracotta hover:text-terracotta-dark transition-colors"
            >
              Bubl
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map(link => {
                const active = pathname.startsWith(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'text-sm transition-colors relative pb-0.5',
                      active
                        ? 'text-espresso font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-terracotta after:rounded-full'
                        : 'text-walnut hover:text-espresso'
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            <div className="flex items-center gap-3">
              {isConfigured && (
                <div className="hidden md:flex items-center gap-3">
                  {user ? (
                    <>
                      <div className="w-7 h-7 rounded-full bg-terracotta/20 text-terracotta flex items-center justify-center text-xs font-semibold">
                        {(user.email?.[0] ?? 'U').toUpperCase()}
                      </div>
                      <button
                        onClick={signOut}
                        className="text-xs text-walnut hover:text-espresso transition-colors link-hover"
                      >
                        Sign out
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setShowAuthModal(true)}
                      className="text-sm text-walnut hover:text-terracotta transition-colors link-hover"
                    >
                      Sign in
                    </button>
                  )}
                </div>
              )}

              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden p-2 rounded-full text-walnut hover:bg-sand/40 transition-colors"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-cream flex flex-col">
          <div className="flex items-center justify-between h-14 px-6 border-b border-sand/50">
            <Link href="/" className="font-display font-bold text-xl text-terracotta" onClick={() => setMobileOpen(false)}>
              Bubl
            </Link>
            <button onClick={() => setMobileOpen(false)} className="p-2 rounded-full text-walnut hover:bg-sand/40 transition-colors" aria-label="Close menu">
              <X size={20} />
            </button>
          </div>
          <nav className="flex flex-col px-6 py-8 gap-6">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn('text-2xl font-display transition-colors', pathname.startsWith(link.href) ? 'text-terracotta' : 'text-espresso hover:text-terracotta')}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          {isConfigured && (
            <div className="px-6 pb-8 mt-auto border-t border-sand/50 pt-6">
              {user ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-terracotta/20 text-terracotta flex items-center justify-center text-sm font-semibold">
                      {(user.email?.[0] ?? 'U').toUpperCase()}
                    </div>
                    <span className="text-sm text-espresso truncate max-w-[160px]">{user.email}</span>
                  </div>
                  <button onClick={() => { signOut(); setMobileOpen(false) }} className="text-xs text-walnut hover:text-espresso transition-colors">
                    Sign out
                  </button>
                </div>
              ) : (
                <button onClick={() => { setMobileOpen(false); setShowAuthModal(true) }} className="text-sm text-terracotta font-medium">
                  Sign in to Bubl
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  )
}
