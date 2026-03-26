'use client'

import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/Skeleton'

const BrusselsMap = dynamic(() => import('@/components/map/BrusselsMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full rounded-xl overflow-hidden" style={{ height: 'calc(100vh - 160px)' }}>
      <Skeleton className="w-full h-full" />
    </div>
  ),
})

export default function MapPage() {
  return (
    <div className="animate-fade-up">
      <div className="mb-4">
        <h1 className="text-2xl font-display font-bold text-content">Map</h1>
        <p className="text-sm text-content-3 mt-0.5">Brussels communes and key landmarks.</p>
      </div>
      <BrusselsMap />
    </div>
  )
}
