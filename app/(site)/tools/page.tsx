import Link from 'next/link'

const TOOLS = [
  {
    href: '/tools/checklist',
    title: 'Setup checklist',
    desc: 'Track the 17 steps to getting settled — from registration to collecting your eID.',
    meta: 'Registration · Bank · Mutuelle · eID',
  },
  {
    href: '/tools/calculator',
    title: 'Budget calculator',
    desc: 'Estimate your monthly Brussels cost in 60 seconds. Compare with London, Paris, Amsterdam, and more.',
    meta: 'Rent · Food · Transport · Going out',
  },
  {
    href: '/tools/templates',
    title: 'Letter templates',
    desc: 'Copy-ready emails for landlords, communes, banks, and doctors. French and English versions.',
    meta: 'French and English · Fill and copy',
  },
  {
    href: '/tools/neighborhoods',
    title: 'Neighbourhood guide',
    desc: 'Compare all 10 Brussels communes by rent, transit, green space, safety, and walkability.',
    meta: '10 communes · 5 rating factors',
  },
  {
    href: '/tools/map',
    title: 'Interactive map',
    desc: 'Map of Brussels communes and key landmarks. Get your bearings before you arrive.',
    meta: 'Communes · Landmarks · Transport',
  },
]

export default function ToolsPage() {
  return (
    <>
      {/* Full-bleed gradient header */}
      <div style={{ background: 'linear-gradient(135deg, #F7F4EE 0%, #C4CED8 50%, #A0B4C4 100%)' }} className="px-6 md:px-8 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest mb-2 text-walnut/70">Tools</p>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-espresso leading-tight">
            Tools that actually help
          </h1>
        </div>
      </div>
      {/* Fade */}
      <div style={{ height: 40, background: 'linear-gradient(to bottom, #A0B4C4, #FDFBF7)' }} />

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TOOLS.map(tool => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group bg-white border border-sand/40 rounded-2xl p-6 hover:border-terracotta/40 hover:bg-[#FFFCF9] transition-colors"
            >
              <h2 className="font-display text-xl font-semibold text-espresso mb-1.5 group-hover:text-terracotta transition-colors">
                {tool.title}
              </h2>
              <p className="text-walnut text-sm leading-relaxed mb-2">{tool.desc}</p>
              <p className="text-walnut/40 text-xs">{tool.meta}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
