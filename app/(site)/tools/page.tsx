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
    <div>
      <p className="text-walnut text-xs uppercase tracking-widest mb-2">Tools</p>
      <h1 className="font-display text-4xl md:text-5xl font-bold text-espresso mb-4">
        Tools for getting settled
      </h1>
      <p className="text-walnut text-lg max-w-xl mb-10">
        Practical tools for navigating Brussels life — from arrival to feeling at home.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TOOLS.map(tool => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group bg-ivory border border-sand/50 rounded-2xl p-6 hover:border-terracotta/30 transition-colors"
          >
            <h2 className="font-display text-xl font-semibold text-espresso mb-2 group-hover:text-terracotta transition-colors">
              {tool.title}
            </h2>
            <p className="text-walnut text-sm leading-relaxed">{tool.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
