import Link from 'next/link'

const TOOLS = [
  {
    href: '/tools/calculator',
    title: 'Cost calculator',
    desc: 'Monthly budget breakdown and city comparison. See how Brussels compares to where you came from.',
  },
  {
    href: '/tools/templates',
    title: 'Letter templates',
    desc: 'Professional letter templates for landlords, communes, banks, and doctors. Fill in and copy.',
  },
  {
    href: '/tools/checklist',
    title: 'Setup checklist',
    desc: 'The step-by-step checklist for getting set up in Brussels. Tracks your progress locally.',
  },
  {
    href: '/tools/neighborhoods',
    title: 'Neighbourhood guide',
    desc: 'Compare all 10 Brussels communes on rent, transit, safety, green space, and more.',
  },
  {
    href: '/tools/map',
    title: 'Interactive map',
    desc: 'Map of Brussels communes and key landmarks. Useful for getting oriented when you arrive.',
  },
]

export default function ToolsPage() {
  return (
    <>
      {/* Full-bleed gradient header */}
      <div style={{ background: 'linear-gradient(135deg, #F7F4EE 0%, #C4CED8 50%, #A0B4C4 100%)' }} className="px-6 md:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest mb-2 text-walnut/70">Tools</p>
          <h1 className="font-display text-4xl md:text-6xl font-extrabold text-espresso leading-tight">
            Tools for getting settled
          </h1>
          <p className="text-walnut text-lg max-w-xl mt-4">
            Practical tools for navigating Brussels life — from arrival to feeling at home.
          </p>
        </div>
      </div>
      {/* Fade */}
      <div style={{ height: 60, background: 'linear-gradient(to bottom, #A0B4C4, #FDFBF7)' }} />

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TOOLS.map(tool => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group bg-white border border-sand/40 rounded-2xl p-6 hover:border-terracotta/40 hover:bg-[#FFFCF9] transition-colors"
            >
              <h2 className="font-display text-xl font-semibold text-espresso mb-2 group-hover:text-terracotta transition-colors">
                {tool.title}
              </h2>
              <p className="text-walnut text-sm leading-relaxed">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
