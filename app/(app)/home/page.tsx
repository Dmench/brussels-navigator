'use client'

import Link from 'next/link'
import { useProfile } from '@/lib/hooks/use-preferences'
import { PROFILES } from '@/lib/constants'
import { WeatherCard } from '@/components/dashboard/WeatherCard'
import { CurrencyCard } from '@/components/dashboard/CurrencyCard'
import { UpcomingEvents } from '@/components/dashboard/UpcomingEvents'
import { ProgressCard } from '@/components/dashboard/ProgressCard'
import { ThisWeekPreview } from '@/components/dashboard/ThisWeekPreview'
import { NewsPreview } from '@/components/dashboard/NewsPreview'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function HomePage() {
  const [profile] = useProfile()
  const profileInfo = profile ? PROFILES[profile] : null

  return (
    <div className="animate-fade-up space-y-4">
      {profileInfo ? (
        <div className="bg-amber-soft border border-amber-border rounded-xl px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-content-3">Your profile</p>
            <p className="text-sm font-semibold text-content">{profileInfo.label}</p>
          </div>
          <Link href="/plan" className="text-xs text-amber hover:text-amber-dark flex items-center gap-1 transition-colors">
            Retake plan <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      ) : (
        <Link
          href="/plan"
          className="block bg-surface-1 border border-amber-border rounded-xl px-4 py-4 shadow-glow-amber hover:shadow-glow-amber-strong transition-all duration-150"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-content-3 mb-1">Get started</p>
              <p className="text-base font-display font-bold text-content">Build your Brussels plan</p>
              <p className="text-sm text-content-3 mt-0.5">Answer 5 questions. Get your personalized guide.</p>
            </div>
            <div className="flex items-center gap-2 text-amber">
              <Sparkles className="w-5 h-5" />
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>
      )}

      <WeatherCard />
      <CurrencyCard />
      <ProgressCard />
      <ThisWeekPreview />
      <NewsPreview />
      <UpcomingEvents />
    </div>
  )
}
