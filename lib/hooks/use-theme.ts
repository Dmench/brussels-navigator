'use client'

export function useTheme() {
  return {
    theme: 'light' as const,
    setTheme: (_: 'light' | 'dark') => {},
    toggle: () => {},
  }
}
