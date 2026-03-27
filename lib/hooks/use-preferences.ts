'use client'
import { useState, useEffect } from 'react'

export function useCurrency() {
  const [currency, setCurrencyState] = useState<string>('USD')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem('bn-currency')
      if (stored) setCurrencyState(stored)
    } catch {}
  }, [])

  const setCurrency = (code: string) => {
    setCurrencyState(code)
    try { localStorage.setItem('bn-currency', code) } catch {}
  }

  return { currency, setCurrency, mounted }
}

export function useChecklist() {
  const [completed, setCompletedState] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem('bn-checklist')
      if (stored) setCompletedState(JSON.parse(stored))
    } catch {}
  }, [])

  const toggle = (id: string) => {
    setCompletedState(prev => {
      const next = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
      try { localStorage.setItem('bn-checklist', JSON.stringify(next)) } catch {}
      return next
    })
  }

  const reset = () => {
    setCompletedState([])
    try { localStorage.removeItem('bn-checklist') } catch {}
  }

  return { completed, toggle, reset, mounted }
}

export function useWaitlist() {
  const [email, setEmailState] = useState<string>('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem('bn-waitlist')
      if (stored) setEmailState(stored)
    } catch {}
  }, [])

  const setEmail = (e: string) => {
    setEmailState(e)
    try { localStorage.setItem('bn-waitlist', e) } catch {}
  }

  return { email, setEmail, mounted }
}
