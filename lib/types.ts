export type EventType = 'holiday' | 'event' | 'info'

export interface CalendarEvent {
  date: string
  title: string
  type: EventType
  desc: string
  approximate?: boolean
}

export interface Commune {
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

export interface ChecklistItem {
  id: string
  label: string
  desc: string
}

export interface ChecklistCategory {
  cat: string
  items: readonly ChecklistItem[]
}

export interface Template {
  id: string
  title: string
  desc: string
  free: boolean
  fields: readonly string[]
  en: string
  fr: string
}

export interface Community {
  id: string
  name: string
  platform: string
  members: string
  desc: string
  url: string
}

export interface Currency {
  code: string
  name: string
  flag: string
}

export interface CostItem {
  label: string
  budget: number
  moderate: number
  comfortable: number
}

export interface HousingLink {
  name: string
  desc: string
  url: string
  badge?: string
}

export interface UsefulLink {
  name: string
  desc: string
  url: string
}

export type UserProfile = 'eu' | 'non-eu' | 'student'
export type BadgeVariant = 'amber' | 'emerald' | 'sky' | 'rose' | 'neutral'
export type BudgetLevel = 'budget' | 'moderate' | 'comfortable'
export type VibeType = 'lively' | 'green' | 'central' | 'family'
export type CommuteType = 'eu-quarter' | 'city-center' | 'nato' | 'remote' | 'university'

export interface PlanAnswers {
  profile?: UserProfile
  move_date?: string
  budget?: BudgetLevel
  vibe?: VibeType
  commute?: CommuteType
}

export interface WeatherDay {
  date: string
  weatherCode: number
  tempMax: number
  tempMin: number
  precipitation: number
}

export interface WeatherData {
  current: {
    temp: number
    weatherCode: number
    windSpeed: number
    humidity: number
  }
  daily: WeatherDay[]
}

export interface ExchangeRates {
  base: string
  date: string
  rates: Record<string, number>
}
