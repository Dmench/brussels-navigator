'use client'
import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/Skeleton'

const BrusselsMap = dynamic(() => import('@/components/BrusselsMap'), {
  ssr: false,
  loading: () => <Skeleton className="h-[500px] w-full rounded-2xl" />,
})

export default function MapPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-16">
      <p className="text-walnut text-xs uppercase tracking-widest mb-2">Tools</p>
      <h1 className="font-display text-4xl md:text-5xl font-bold text-espresso mb-4">
        Interactive map
      </h1>
      <p className="text-walnut text-base max-w-xl mb-8">
        Brussels communes and key landmarks. Click a marker for rent estimates and Immoweb links.
      </p>

      <div className="rounded-2xl overflow-hidden border border-sand/50">
        <BrusselsMap />
      </div>

      <div className="mt-4 flex gap-6">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-terracotta inline-block" />
          <span className="text-xs text-walnut">Commune centres</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-walnut inline-block" />
          <span className="text-xs text-walnut">Key landmarks</span>
        </div>
      </div>
    </div>
  )
}
