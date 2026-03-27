'use client'
import { useState, useEffect, useCallback } from 'react'

export function useTheme() {
  const [theme, setThemeState] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null
    const resolved = stored ?? 'light'
    setThemeState(resolved)
    document.documentElement.classList.toggle('dark', resolved === 'dark')
  }, [])

  const setTheme = useCallback((next: 'light' | 'dark') => {
    setThemeState(next)
    try { localStorage.setItem('theme', next) } catch {}
    document.documentElement.classList.toggle('dark', next === 'dark')
  }, [])

  const toggle = useCallback(() => setTheme(theme === 'dark' ? 'light' : 'dark'), [theme, setTheme])

  return { theme, setTheme, toggle }
}
