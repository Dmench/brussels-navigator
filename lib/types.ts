export type UserProfile = 'eu' | 'non-eu' | 'student'
export type BudgetLevel = 'budget' | 'moderate' | 'comfortable'
export type Theme = 'light' | 'dark'
export type Language = 'en' | 'fr'

export interface WeatherData {
  temperature: number
  weathercode: number
  windspeed: number
}

export interface ExchangeRates {
  base: string
  date: string
  rates: Record<string, number>
}

export interface PlanAnswers {
  profile?: string
  budget?: string
  vibe?: string
  commute?: string
  move_date?: string
}

export interface CommuneData {
  id: string
  name: string
  rent: number
  vibe: string
  expat: number
  transit: number
  green: number
  safety: number
  walk: number
  desc: string
  lat: number
  lng: number
  immoweb: string
}

export interface EventData {
  date: string
  title: string
  type: 'holiday' | 'event' | 'info'
  desc: string
}

export interface ChecklistItem {
  id: string
  label: string
  desc: string
}

export interface ChecklistCategory {
  cat: string
  items: readonly ChecklistItem[]
}

export interface Guide {
  slug: string
  title: string
  category: string
  readTime: string
  excerpt: string
  content: string
}
