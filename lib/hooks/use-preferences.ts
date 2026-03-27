'use client'

import { useState, useEffect, useCallback } from 'react'
import type { UserProfile } from '../types'

function usePersisted<T>(key: string, defaultValue: T): [T, (val: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(defaultValue)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key)
      if (stored !== null) setValue(JSON.parse(stored))
    } catch {}
  }, [key])

  const set = useCallback((val: T | ((prev: T) => T)) => {
    setValue(prev => {
      const next = typeof val === 'function' ? (val as (p: T) => T)(prev) : val
      try { localStorage.setItem(key, JSON.stringify(next)) } catch {}
      return next
    })
  }, [key])

  return [value, set]
}

export function useProfile() {
  return usePersisted<UserProfile | null>('bn-profile', null)
}

export function useCurrency() {
  return usePersisted<string>('bn-currency', 'USD')
}

export function useChecklist() {
  return usePersisted<string[]>('bn-checklist', [])
}

export function useWaitlistEmail() {
  return usePersisted<string>('bn-waitlist-email', '')
}
