'use client'

import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/Skeleton'

const BrusselsMap = dynamic(() => import('@/components/BrusselsMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full rounded-2xl overflow-hidden" style={{ height: 'calc(100vh - 200px)', minHeight: 400 }}>
      <Skeleton className="w-full h-full" />
    </div>
  ),
})

export default function MapPage() {
  return (
    <div>
      <p className="text-xs font-body font-medium uppercase tracking-[0.2em] text-walnut dark:text-night-muted mb-3">Explore</p>
      <h1 className="text-3xl md:text-4xl font-display font-semibold text-ink dark:text-night-text mb-3">Interactive map</h1>
      <p className="text-sm font-body font-light text-walnut dark:text-night-muted mb-6">
        Brussels communes and key landmarks. Click any marker for details.
      </p>
      <BrusselsMap />
    </div>
  )
}
