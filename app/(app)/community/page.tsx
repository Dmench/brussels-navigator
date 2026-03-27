import { COMMUNITIES } from '@/lib/constants'
import { ExternalLink } from 'lucide-react'

const GROUPS = [
  { heading: 'Online communities', filter: ['Reddit', 'Facebook'] },
  { heading: 'Events and networking', filter: ['InterNations', 'Meetup'] },
  { heading: 'English-language media', filter: ['Website', 'Newsletter', 'Official'] },
]

export default function CommunityPage() {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-body font-medium uppercase tracking-[0.2em] text-walnut dark:text-night-muted mb-3">Connect</p>
      <h1 className="text-3xl md:text-4xl font-display font-semibold text-ink dark:text-night-text mb-4">Brussels expat communities</h1>
      <p className="text-base font-body font-light text-walnut dark:text-night-muted leading-relaxed mb-12 max-w-xl">
        The best way to meet people, get practical advice, and stay informed. These are real communities with active members.
      </p>

      <div className="space-y-10">
        {GROUPS.map(group => {
          const items = COMMUNITIES.filter(c => group.filter.includes(c.platform))
          return (
            <section key={group.heading}>
              <h2 className="text-lg font-display font-medium text-ink dark:text-night-text mb-5">{group.heading}</h2>
              <div className="border border-sand/50 dark:border-night-border rounded-xl overflow-hidden divide-y divide-sand/50 dark:divide-night-border">
                {items.map(community => (
                  <div key={community.name} className="flex items-start justify-between gap-4 px-5 py-5 bg-ivory dark:bg-night-1">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <a
                          href={community.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-base font-body font-medium text-espresso dark:text-night-text hover:text-terracotta transition-colors"
                        >
                          {community.name} <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <span className="text-[10px] font-body uppercase tracking-[0.1em] text-walnut dark:text-night-muted px-2 py-0.5 rounded-full border border-sand dark:border-night-border">
                          {community.platform}
                        </span>
                        {community.members && (
                          <span className="text-xs font-body text-walnut dark:text-night-muted">{community.members} members</span>
                        )}
                      </div>
                      <p className="text-sm font-body font-light text-walnut dark:text-night-muted leading-relaxed">{community.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        })}
      </div>

      <p className="text-xs font-body text-walnut dark:text-night-muted leading-relaxed mt-10">
        Member counts are approximate and sourced from public platform data. Brussels Navigator is not affiliated with any of these communities.
      </p>
    </div>
  )
}
