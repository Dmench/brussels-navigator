'use client'

import { useState } from 'react'
import { TEMPLATES } from '@/lib/constants'
import { SegmentControl } from '@/components/ui/SegmentControl'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Copy, Check, Lock, X, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

type Lang = 'en' | 'fr'

function FillableTemplate({ template, lang }: { template: typeof TEMPLATES[number]; lang: Lang }) {
  const text = lang === 'en' ? template.en : template.fr
  const [values, setValues] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState(false)

  function getFilledText() {
    return (template.fields as readonly string[]).reduce((acc, field) => {
      return acc.replace(new RegExp(`\\{${field}\\}`, 'g'), values[field] || `[${field.replace(/_/g, ' ')}]`)
    }, text)
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(getFilledText())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  const parts = text.split(/(\{[^}]+\})/)

  return (
    <div className="mt-4 space-y-4">
      {template.fields.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {(template.fields as readonly string[]).map(field => (
            <div key={field}>
              <label className="text-[10px] text-content-4 uppercase tracking-wide">{field.replace(/_/g, ' ')}</label>
              <input
                type="text"
                value={values[field] || ''}
                onChange={e => setValues(prev => ({ ...prev, [field]: e.target.value }))}
                placeholder={field.replace(/_/g, ' ')}
                className="w-full mt-0.5 px-3 py-2 bg-surface-0 border border-border rounded-lg text-content text-xs placeholder:text-content-4 outline-none focus:border-amber focus:ring-1 transition-all duration-150"
              />
            </div>
          ))}
        </div>
      )}

      <div className="bg-surface-0 border border-border rounded-lg p-4 font-mono text-xs text-content-2 leading-relaxed whitespace-pre-wrap">
        {parts.map((part, i) => {
          const match = part.match(/^\{([^}]+)\}$/)
          if (match) {
            const field = match[1]
            return (
              <span
                key={i}
                className={cn(
                  'border-b border-amber-border',
                  values[field] ? 'text-amber' : 'text-content-4 italic'
                )}
              >
                {values[field] || `[${field.replace(/_/g, ' ')}]`}
              </span>
            )
          }
          return <span key={i}>{part}</span>
        })}
      </div>

      <Button onClick={copy} variant="primary" size="sm" className="w-full">
        {copied
          ? <><Check className="w-3.5 h-3.5 mr-1.5" />Copied!</>
          : <><Copy className="w-3.5 h-3.5 mr-1.5" />Copy to clipboard</>
        }
      </Button>
    </div>
  )
}

function UpgradeModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function submit() {
    if (email) {
      try { localStorage.setItem('waitlist-email', email) } catch {}
      setSubmitted(true)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-0/80 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-surface-1 border border-border rounded-2xl p-6 max-w-md w-full shadow-card-hover animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-display font-bold text-content">Move Pack — €19</h3>
            <p className="text-xs text-content-3 mt-0.5">One-time. Yours forever.</p>
          </div>
          <button onClick={onClose} className="text-content-4 hover:text-content-2 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <ul className="space-y-2 mb-5">
          {[
            'All 7 fillable templates (EN/FR)',
            'Downloadable checklist PDF',
            'Commune comparison export',
            '12 months of updates',
          ].map(item => (
            <li key={item} className="flex items-center gap-2 text-sm text-content-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        {submitted ? (
          <div className="bg-emerald-soft border border-emerald-border rounded-lg p-3 text-center">
            <p className="text-sm text-emerald font-semibold">You&apos;re on the list!</p>
            <p className="text-xs text-content-3 mt-0.5">We&apos;ll email you when Move Pack launches.</p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-xs text-content-3 font-semibold">Coming soon — join the waitlist:</p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 bg-surface-0 border border-border rounded-lg text-content text-sm placeholder:text-content-4 outline-none focus:border-amber focus:ring-1 transition-all duration-150"
              />
              <Button onClick={submit} size="sm">Notify me</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function TemplatesPage() {
  const [lang, setLang] = useState<Lang>('en')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [showUpgrade, setShowUpgrade] = useState(false)

  return (
    <div className="animate-fade-up space-y-4">
      <div>
        <h1 className="text-2xl font-display font-bold text-content">Templates</h1>
        <p className="text-sm text-content-3 mt-0.5">Fill-in-the-blank letters for every situation.</p>
      </div>

      <SegmentControl
        options={[{ value: 'en', label: 'English' }, { value: 'fr', label: 'Français' }]}
        value={lang}
        onChange={v => setLang(v as Lang)}
      />

      <div className="space-y-2">
        {TEMPLATES.map(template => {
          const isExpanded = expanded === template.id
          return (
            <div key={template.id} className="bg-surface-1 border border-border rounded-xl shadow-card overflow-hidden">
              <button
                onClick={() => {
                  if (!template.free) { setShowUpgrade(true); return }
                  setExpanded(isExpanded ? null : template.id)
                }}
                className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-surface-2 transition-all duration-150"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-content">{template.title}</p>
                  <p className="text-xs text-content-3">{template.desc}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-3">
                  {template.free
                    ? <Badge variant="emerald">Free</Badge>
                    : <Badge variant="amber">Move Pack</Badge>
                  }
                  {template.free && (
                    isExpanded
                      ? <ChevronUp className="w-4 h-4 text-content-4" />
                      : <ChevronDown className="w-4 h-4 text-content-4" />
                  )}
                  {!template.free && <Lock className="w-4 h-4 text-content-4" />}
                </div>
              </button>
              {isExpanded && template.free && (
                <div className="px-4 pb-4 border-t border-border">
                  <FillableTemplate template={template} lang={lang} />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}

      <p className="text-xs text-content-4 text-center pb-2">
        Templates are starting points. Adapt to your specific situation.
      </p>
    </div>
  )
}
