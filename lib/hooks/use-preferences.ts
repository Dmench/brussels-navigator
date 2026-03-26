'use client'

import { useState, useEffect, useCallback } from 'react'
import type { UserProfile } from '../types'

function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key)
      if (stored !== null) {
        setValue(JSON.parse(stored) as T)
      }
    } catch {}
    setLoaded(true)
  }, [key])

  const set = useCallback((newValue: T | ((prev: T) => T)) => {
    setValue(prev => {
      const next = typeof newValue === 'function' ? (newValue as (prev: T) => T)(prev) : newValue
      try {
        localStorage.setItem(key, JSON.stringify(next))
      } catch {}
      return next
    })
  }, [key])

  return [value, set, loaded] as const
}

export function useProfile() {
  return useLocalStorage<UserProfile | null>('user-profile', null)
}

export function useCurrency() {
  return useLocalStorage<string>('preferred-currency', 'USD')
}

export function useChecklist() {
  return useLocalStorage<string[]>('checklist-completed', [])
}

export function useWaitlistEmail() {
  return useLocalStorage<string>('waitlist-email', '')
}
