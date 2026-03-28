'use client'
import { useState } from 'react'
import { TEMPLATE_CATEGORIES } from '@/lib/templates'
import type { Template } from '@/lib/templates'
import { useWaitlist } from '@/lib/hooks/use-preferences'
import { cn } from '@/lib/utils'

type Language = 'en' | 'fr'

function renderTemplate(body: string, fields: Record<string, string>): string {
  return body.replace(/\{(\w+)\}/g, (_, key) => fields[key] || `{${key}}`)
}

function TemplateEditor({ template, language }: { template: Template; language: Language }) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(template.fields.map(f => [f.key, '']))
  )
  const [copied, setCopied] = useState(false)

  const body = language === 'fr' ? template.bodyFr : template.body
  const rendered = renderTemplate(body, values)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rendered)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  // Render body with inline inputs for placeholders
  const parts = body.split(/(\{[a-z_]+\})/g)

  return (
    <div>
      <div className="mb-5 p-5 bg-ivory border border-sand/50 rounded-2xl font-body text-sm leading-relaxed text-espresso whitespace-pre-wrap">
        {parts.map((part, i) => {
          const match = part.match(/^\{([a-z_]+)\}$/)
          if (match) {
            const key = match[1]
            const field = template.fields.find(f => f.key === key)
            return (
              <input
                key={i}
                type="text"
                value={values[key] || ''}
                onChange={e => setValues(v => ({ ...v, [key]: e.target.value }))}
                placeholder={field?.placeholder ?? key}
                className="border-b border-terracotta/40 bg-transparent text-terracotta placeholder:text-terracotta/40 focus:outline-none focus:border-terracotta px-1 min-w-16 max-w-48 text-sm"
                style={{ width: `${Math.max((values[key] || field?.placeholder || key).length * 8 + 16, 64)}px` }}
              />
            )
          }
          return <span key={i}>{part}</span>
        })}
      </div>
      <button
        onClick={handleCopy}
        className="px-6 py-2.5 bg-espresso text-cream rounded-full text-sm font-medium hover:bg-ink transition-colors"
      >
        {copied ? 'Copied!' : 'Copy to clipboard'}
      </button>
    </div>
  )
}

function ProModal({ onClose }: { onClose: () => void }) {
  const { email, setEmail } = useWaitlist()
  const [input, setInput] = useState(email)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    if (!input.includes('@')) return
    setEmail(input)
    setSaved(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-ink/50">
      <div className="bg-cream border border-sand rounded-2xl p-8 max-w-md w-full">
        <h2 className="font-display text-2xl font-semibold text-espresso mb-2">
          Bubl Pro
        </h2>
        <p className="text-walnut text-sm mb-6 leading-relaxed">
          This template is part of Bubl Pro — a full library of ready-to-send letters for every situation.
          Join the waitlist and we will let you know when it launches.
        </p>
        {!saved ? (
          <div className="flex gap-2">
            <input
              type="email"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-2.5 rounded-full border border-sand bg-cream text-espresso text-sm focus:outline-none focus:border-terracotta/50"
            />
            <button
              onClick={handleSave}
              className="px-5 py-2.5 bg-espresso text-cream rounded-full text-sm font-medium hover:bg-ink transition-colors"
            >
              Join
            </button>
          </div>
        ) : (
          <p className="text-sage text-sm">You are on the list. Thank you.</p>
        )}
        <button
          onClick={onClose}
          className="mt-4 text-walnut text-sm hover:text-espresso transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [language, setLanguage] = useState<Language>('en')
  const [proModalOpen, setProModalOpen] = useState(false)

  const category = TEMPLATE_CATEGORIES.find(c => c.id === selectedCategory)

  const handleTemplateSelect = (t: Template) => {
    if (t.tier === 'pro') {
      setProModalOpen(true)
    } else {
      setSelectedTemplate(t)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-16">
      <p className="text-walnut text-xs uppercase tracking-widest mb-2">Tools</p>
      <h1 className="font-display text-4xl md:text-5xl font-bold text-espresso mb-4">
        Letter templates
      </h1>
      <p className="text-walnut text-base mb-8 max-w-xl">
        Professional letters for every situation. Fill in the fields and copy.
      </p>

      {/* Step 1: Select recipient */}
      {!selectedCategory && (
        <div>
          <p className="text-walnut text-sm mb-4">I need to write to my...</p>
          <div className="flex flex-wrap gap-3">
            {TEMPLATE_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="px-6 py-3 bg-ivory border border-sand/50 rounded-2xl text-sm font-medium text-espresso hover:border-terracotta/30 hover:text-terracotta transition-colors"
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Select topic */}
      {selectedCategory && !selectedTemplate && (
        <div>
          <button
            onClick={() => setSelectedCategory(null)}
            className="text-walnut text-sm hover:text-espresso transition-colors mb-6"
          >
            Back
          </button>
          <p className="text-walnut text-sm mb-4">
            I want to...
          </p>
          <div className="flex flex-wrap gap-3">
            {category?.topics.map(t => (
              <button
                key={t.id}
                onClick={() => handleTemplateSelect(t)}
                className="group px-6 py-3 bg-ivory border border-sand/50 rounded-2xl text-sm text-espresso hover:border-terracotta/30 hover:text-terracotta transition-colors text-left"
              >
                <span>{t.title}</span>
                {t.tier === 'pro' && (
                  <span className="ml-2 text-xs text-walnut border border-walnut/30 rounded-full px-2 py-0.5">Pro</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Template editor */}
      {selectedTemplate && (
        <div>
          <button
            onClick={() => setSelectedTemplate(null)}
            className="text-walnut text-sm hover:text-espresso transition-colors mb-6"
          >
            Back
          </button>

          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-semibold text-espresso">
              {language === 'fr' ? selectedTemplate.titleFr : selectedTemplate.title}
            </h2>
            <div className="flex gap-2">
              {(['en', 'fr'] as Language[]).map(l => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={cn(
                    'px-4 py-1.5 rounded-full text-sm font-medium transition-colors',
                    language === l
                      ? 'bg-espresso text-cream'
                      : 'border border-sand text-walnut hover:text-espresso'
                  )}
                >
                  {l === 'en' ? 'English' : 'Français'}
                </button>
              ))}
            </div>
          </div>

          <TemplateEditor template={selectedTemplate} language={language} />
        </div>
      )}

      {proModalOpen && <ProModal onClose={() => setProModalOpen(false)} />}
    </div>
  )
}
