export type Theme = 'light' | 'dark'
export type Language = 'en' | 'fr'
export type PostCategory = 'recommendation' | 'question' | 'heads-up'

export interface WeatherData {
  temperature: number
  weathercode: number
  daily?: { max: number[]; min: number[]; codes: number[] }
}

export interface ExchangeRates {
  base: string
  date: string
  rates: Record<string, number>
}

export interface NeighbourhoodPost {
  id: string
  commune: string
  category: PostCategory
  text: string
  time: string
}

export interface Answer {
  slug: string
  title: string
  category: string
  readTime: string
  excerpt: string
  content: string
  relatedLinks?: { label: string; href: string }[]
  officialLinks?: { label: string; href: string }[]
}
