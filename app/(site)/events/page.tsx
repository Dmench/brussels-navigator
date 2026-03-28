'use client'
import { useState } from 'react'
import { EVENTS_2026, RECURRING_EVENTS } from '@/lib/constants'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

const FILTER_TABS = [
  { key: 'all', label: 'All' },
  { key: 'week', label: 'This week' },
  { key: 'month', label: 'This month' },
  { key: 'markets', label: 'Markets' },
  { key: 'networking', label: 'Networking' },
  { key: 'sports', label: 'Sports' },
  { key: 'workshops', label: 'Workshops' },
  { key: 'holidays', label: 'Holidays' },
]

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long' })
}

function isThisWeek(dateStr: string) {
  const now = new Date()
  const d = new Date(dateStr + 'T00:00:00')
  const weekEnd = new Date(now)
  weekEnd.setDate(weekEnd.getDate() + 7)
  return d >= now && d <= weekEnd
}

function isThisMonth(dateStr: string) {
  const now = new Date()
  const d = new Date(dateStr + 'T00:00:00')
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d >= now
}

export default function EventsPage() {
  const [filter, setFilter] = useState('all')
  const today = new Date().toISOString().split('T')[0]

  const upcomingCalendar = [...EVENTS_2026]
    .filter(e => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))

  const filteredCalendar = upcomingCalendar.filter(e => {
    if (filter === 'all') return true
    if (filter === 'week') return isThisWeek(e.date)
    if (filter === 'month') return isThisMonth(e.date)
    if (filter === 'holidays') return e.type === 'holiday'
    return false
  })

  const filteredRecurring = RECURRING_EVENTS.filter(e => {
    if (filter === 'all' || filter === 'week' || filter === 'month') return true
    return e.category === filter
  })

  const publicHolidays = [...EVENTS_2026]
    .filter(e => e.type === 'holiday')
    .sort((a, b) => a.date.localeCompare(b.date))

  return (
    <>
      {/* Full-bleed gradient header */}
      <div style={{ background: 'linear-gradient(135deg, #F7F4EE 0%, #D4C4B0 50%, #C4A882 100%)' }} className="px-6 md:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-widest mb-2 text-walnut/70">Calendar</p>
          <h1 className="font-display text-4xl md:text-6xl font-extrabold text-espresso leading-tight">
            What is on in Brussels
          </h1>
        </div>
      </div>
      {/* Fade */}
      <div style={{ height: 60, background: 'linear-gradient(to bottom, #C4A882, #FDFBF7)' }} />

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-10 md:py-16">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTER_TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-medium transition-colors',
                filter === tab.key
                  ? 'bg-terracotta text-cream'
                  : 'border border-sand text-walnut hover:text-espresso'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Calendar events */}
            {(filter === 'all' || filter === 'week' || filter === 'month' || filter === 'holidays') && (
              <section>
                <h2 className="font-display text-2xl font-semibold text-espresso mb-4">
                  {filter === 'week' ? 'This week' : filter === 'month' ? 'This month' : filter === 'holidays' ? 'Public holidays' : 'Upcoming events'}
                </h2>
                {filteredCalendar.length === 0 ? (
                  <p className="text-walnut text-sm">No events match this filter.</p>
                ) : (
                  <div className="border border-sand/30 rounded-2xl overflow-hidden divide-y divide-sand/30">
                    {filteredCalendar.map(event => (
                      <div key={event.date + event.title} className="flex gap-4 px-5 py-4">
                        <div className="w-28 shrink-0">
                          <p className="text-xs text-walnut leading-relaxed">{formatDate(event.date)}</p>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center flex-wrap gap-2 mb-1">
                            <p className="text-sm font-medium text-espresso">{event.title}</p>
                            <Badge variant={event.type === 'holiday' ? 'holidays' : 'events'}>
                              {event.type}
                            </Badge>
                          </div>
                          <p className="text-xs text-walnut">{event.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Recurring events */}
            {filteredRecurring.length > 0 && (
              <section>
                <h2 className="font-display text-2xl font-semibold text-espresso mb-4">
                  Regular events
                </h2>
                <div className="space-y-3">
                  {filteredRecurring.map(event => (
                    <div
                      key={event.title}
                      className="bg-white border border-sand/40 rounded-2xl px-5 py-4 hover:border-terracotta/40 hover:bg-[#FFFCF9] transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center flex-wrap gap-2 mb-1">
                            <p className="text-sm font-medium text-espresso">{event.title}</p>
                            <Badge>{event.day}</Badge>
                            <Badge variant={
                              event.category === 'markets' ? 'markets'
                              : event.category === 'networking' ? 'networking'
                              : event.category === 'workshops' ? 'workshops'
                              : event.category === 'sports' ? 'sports'
                              : 'default'
                            }>
                              {event.category}
                            </Badge>
                          </div>
                          <p className="text-xs text-walnut mb-1">{event.time} · {event.location}</p>
                          <p className="text-xs text-walnut mb-2">{event.desc}</p>
                          {event.link && (
                            <a
                              href={event.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-terracotta text-xs hover:text-terracotta-dark transition-colors link-hover"
                            >
                              See details
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar: public holidays */}
          <div>
            <div className="bg-white border border-sand/40 rounded-2xl p-5">
              <p className="text-walnut text-xs uppercase tracking-widest mb-4">2026 Public holidays</p>
              <div className="space-y-2">
                {publicHolidays.map(h => (
                  <div key={h.date} className="flex items-start gap-3">
                    <span className="text-xs text-walnut w-20 shrink-0 pt-0.5">
                      {new Date(h.date + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </span>
                    <span className="text-xs text-espresso">{h.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
