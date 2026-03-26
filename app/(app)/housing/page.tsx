import { HOUSING_LINKS, USEFUL_LINKS, COMMUNES } from '@/lib/constants'
import { Badge } from '@/components/ui/Badge'
import { ExternalLink } from 'lucide-react'

export default function HousingPage() {
  return (
    <div className="animate-fade-up space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-content">Housing</h1>
        <p className="text-sm text-content-3 mt-0.5">Platforms, commune searches, and useful resources.</p>
      </div>

      <div>
        <p className="text-xs font-display font-semibold uppercase tracking-widest text-content-3 mb-3">Rental Platforms</p>
        <div className="space-y-2">
          {HOUSING_LINKS.map(link => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-surface-1 border border-border rounded-xl shadow-card hover:border-border-hover hover:shadow-card-hover hover:-translate-y-px transition-all duration-150 group"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-content">{link.name}</span>
                  {link.badge && <Badge variant="emerald">{link.badge}</Badge>}
                </div>
                <p className="text-xs text-content-3 mt-0.5">{link.desc}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-content-4 group-hover:text-content-2 transition-colors shrink-0 ml-3" />
            </a>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-display font-semibold uppercase tracking-widest text-content-3 mb-3">Search by Commune</p>
        <div className="grid grid-cols-2 gap-2">
          {COMMUNES.map(commune => (
            <a
              key={commune.id}
              href={`https://www.immoweb.be/en/search/apartment/for-rent/${commune.immoweb}?countries=BE`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-surface-1 border border-border rounded-xl hover:border-border-hover hover:-translate-y-px transition-all duration-150 group"
            >
              <div>
                <p className="text-xs font-semibold text-content">{commune.name}</p>
                <p className="text-[10px] text-amber">€{commune.rent}/mo avg</p>
              </div>
              <ExternalLink className="w-3 h-3 text-content-4 group-hover:text-content-2 transition-colors" />
            </a>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-display font-semibold uppercase tracking-widest text-content-3 mb-3">Useful Resources</p>
        <div className="space-y-2">
          {USEFUL_LINKS.map(link => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-surface-1 border border-border rounded-xl hover:border-border-hover transition-all duration-150 group"
            >
              <div>
                <p className="text-sm font-medium text-content">{link.name}</p>
                <p className="text-xs text-content-3">{link.desc}</p>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-content-4 group-hover:text-content-2 transition-colors shrink-0 ml-2" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
