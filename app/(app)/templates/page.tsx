'use client'

import { useState } from 'react'
import { TEMPLATES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Copy, Check } from 'lucide-react'
import type { Language } from '@/lib/types'

function fillTemplate(template: string, values: Record<string, string>): string {
  return template.replace(/\{([^}]+)\}/g, (_, key) => values[key] || `{${key}}`)
}

function TemplateCard({ template, language }: { template: typeof TEMPLATES[number]; language: Language }) {
  const [values, setValues] = useState<Record<string, string>>({})
  const [copied, setCopied] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const rawText = language === 'en' ? template.en : template.fr
  const fields = [...rawText.matchAll(/\{([^}]+)\}/g)].map(m => m[1]).filter((v, i, arr) => arr.indexOf(v) === i)
  const filled = fillTemplate(rawText, values)

  function copyToClipboard() {
    navigator.clipboard.writeText(filled).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const isLocked = template.tier === 'pro'

  return (
    <div className="border border-sand/50 dark:border-night-border rounded-xl overflow-hidden">
      <button
        onClick={() => !isLocked && setIsOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 bg-ivory dark:bg-night-1 text-left"
      >
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <p className="text-sm font-body font-medium text-espresso dark:text-night-text">{template.title}</p>
            {isLocked && (
              <span className="text-[10px] font-body uppercase tracking-[0.1em] px-2 py-0.5 rounded-full border border-terracotta/20 text-terracotta">
                Pro
              </span>
            )}
          </div>
          <p className="text-xs font-body font-light text-walnut dark:text-night-muted">{template.desc}</p>
        </div>
        <span className="text-xs font-body text-walnut dark:text-night-muted shrink-0 ml-3">{template.category}</span>
      </button>

      {isOpen && !isLocked && (
        <div className="px-5 pb-5 border-t border-sand/50 dark:border-night-border bg-ivory dark:bg-night-1">
          {/* Fields */}
          {fields.length > 0 && (
            <div className="pt-4 mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {fields.map(field => (
                <div key={field}>
                  <label className="block text-xs font-body text-walnut dark:text-night-muted mb-1">{field}</label>
                  <input
                    type="text"
                    value={values[field] ?? ''}
                    onChange={e => setValues(prev => ({ ...prev, [field]: e.target.value }))}
                    placeholder={field}
                    className="w-full px-3 py-2 bg-cream dark:bg-night-2 border-b border-terracotta/30 text-espresso dark:text-night-text text-sm font-body placeholder:text-stone dark:placeholder:text-night-muted outline-none focus:border-terracotta transition-colors"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Filled text */}
          <div className="relative">
            <pre className="whitespace-pre-wrap text-xs font-body text-espresso dark:text-night-text leading-relaxed p-4 bg-cream dark:bg-night-2 rounded-lg border border-sand/50 dark:border-night-border">
              {filled}
            </pre>
            <button
              onClick={copyToClipboard}
              className="absolute top-3 right-3 flex items-center gap-1.5 text-xs font-body text-walnut dark:text-night-muted hover:text-espresso dark:hover:text-night-text transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-sage" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      )}

      {isLocked && (
        <div className="px-5 py-4 bg-ivory/50 dark:bg-night-1/50 border-t border-sand/50 dark:border-night-border">
          <p className="text-xs font-body font-light text-walnut dark:text-night-muted">
            Available with Navigator Pro. <span className="text-terracotta cursor-pointer hover:underline">Join the waitlist.</span>
          </p>
        </div>
      )}
    </div>
  )
}

export default function TemplatesPage() {
  const [language, setLanguage] = useState<Language>('en')

  return (
    <div className="max-w-2xl">
      <p className="text-xs font-body font-medium uppercase tracking-[0.2em] text-walnut dark:text-night-muted mb-3">Tools</p>
      <h1 className="text-3xl md:text-4xl font-display font-semibold text-ink dark:text-night-text mb-4">Communication templates</h1>
      <p className="text-base font-body font-light text-walnut dark:text-night-muted leading-relaxed mb-8 max-w-xl">
        Belgian landlords, communes, and service providers expect formal written communication. Fill in the fields and copy — no writing required.
      </p>

      {/* Language toggle */}
      <div className="flex items-center gap-4 mb-8">
        <span className="text-xs font-body text-walnut dark:text-night-muted">Language:</span>
        {(['en', 'fr'] as Language[]).map(lang => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={cn(
              'text-sm font-body pb-0.5 transition-colors',
              language === lang
                ? 'text-espresso dark:text-night-text border-b border-espresso dark:border-night-text'
                : 'text-walnut dark:text-night-muted hover:text-espresso dark:hover:text-night-text'
            )}
          >
            {lang === 'en' ? 'English' : 'Français'}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {TEMPLATES.map(template => (
          <TemplateCard key={template.id} template={template} language={language} />
        ))}
      </div>

      <p className="text-xs font-body font-light text-walnut dark:text-night-muted leading-relaxed mt-8">
        Templates are provided as a starting point. Review carefully before sending — Belgian administrative procedures may have specific requirements.
      </p>
    </div>
  )
}
