import { COMMUNITIES } from '@/lib/constants'
import { Badge } from '@/components/ui/Badge'
import { ExternalLink } from 'lucide-react'
import type { BadgeVariant } from '@/lib/types'

const PLATFORM_VARIANT: Record<string, BadgeVariant> = {
  Facebook: 'sky',
  Reddit: 'rose',
  InterNations: 'emerald',
  Website: 'neutral',
  Meetup: 'amber',
  Official: 'emerald',
  Association: 'neutral',
}

export default function CommunityPage() {
  return (
    <div className="animate-fade-up space-y-4">
      <div>
        <h1 className="text-2xl font-display font-bold text-content">Community</h1>
        <p className="text-sm text-content-3 mt-0.5">Connect with Brussels expats.</p>
      </div>

      <div className="space-y-2">
        {COMMUNITIES.map(community => (
          <a
            key={community.id}
            href={community.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start justify-between p-4 bg-surface-1 border border-border rounded-xl shadow-card hover:border-border-hover hover:shadow-card-hover hover:-translate-y-px transition-all duration-150 group"
          >
            <div className="flex-1 pr-4">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-sm font-semibold text-content">{community.name}</span>
                <Badge variant={PLATFORM_VARIANT[community.platform] ?? 'neutral'}>{community.platform}</Badge>
                <span className="text-[10px] text-content-4">{community.members}</span>
              </div>
              <p className="text-xs text-content-3 leading-relaxed">{community.desc}</p>
            </div>
            <ExternalLink className="w-4 h-4 text-content-4 group-hover:text-content-2 transition-colors shrink-0 mt-0.5" />
          </a>
        ))}
      </div>

      <div className="bg-surface-1 border border-border rounded-xl p-4 shadow-card">
        <p className="text-xs font-display font-semibold uppercase tracking-widest text-content-3 mb-2">Note</p>
        <p className="text-xs text-content-3 leading-relaxed">
          These communities are external platforms not affiliated with Brussels Navigator.
          Always exercise caution when sharing personal information online.
        </p>
      </div>
    </div>
  )
}
