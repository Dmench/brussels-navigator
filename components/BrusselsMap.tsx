'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import { useProfile } from '@/lib/hooks/use-preferences'
import { COMMUNES, MAP_LANDMARKS } from '@/lib/constants'
import { PROFILES } from '@/lib/constants'
import 'leaflet/dist/leaflet.css'

export default function BrusselsMap() {
  const [profile] = useProfile()
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)

  const profileInfo = profile ? PROFILES[profile] : null

  useEffect(() => {
    setMounted(true)
    const dark = document.documentElement.classList.contains('dark')
    setIsDark(dark)
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  if (!mounted) return null

  const tileUrl = isDark
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

  return (
    <div
      style={{ height: 'calc(100vh - 200px)', minHeight: 400 }}
      className="rounded-2xl overflow-hidden border border-sand/50 dark:border-night-border"
    >
      <MapContainer
        center={[50.845, 4.375]}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url={tileUrl}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={19}
        />

        {COMMUNES.map(commune => {
          const isRecommended = profileInfo?.top_communes.includes(commune.id as never)
          const radius = 8 + commune.expat * 1.5

          return (
            <CircleMarker
              key={commune.id}
              center={[commune.lat, commune.lng]}
              radius={radius}
              pathOptions={{
                fillColor: isRecommended ? '#7A9E7E' : '#C4704B',
                fillOpacity: 0.85,
                color: isRecommended ? '#7A9E7E' : '#C4704B',
                weight: 1.5,
              }}
            >
              <Popup>
                <div style={{ fontFamily: 'Georgia, serif', minWidth: 160, padding: '4px 0' }}>
                  <strong style={{ fontSize: 14, display: 'block', marginBottom: 2 }}>{commune.name}</strong>
                  <p style={{ margin: '2px 0', fontSize: 12, fontStyle: 'italic', color: '#8B7E6A' }}>{commune.vibe}</p>
                  <p style={{ margin: '4px 0', fontSize: 13, fontWeight: 700, color: '#C4704B' }}>€{commune.rent}/mo avg</p>
                  <p style={{ margin: '4px 0', fontSize: 11, color: '#8B7E6A' }}>{commune.desc}</p>
                  <a
                    href={`https://www.immoweb.be/en/search/apartment/for-rent/${commune.immoweb}?countries=BE`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 11, color: '#C4704B', display: 'block', marginTop: 4 }}
                  >
                    Search on Immoweb
                  </a>
                </div>
              </Popup>
            </CircleMarker>
          )
        })}

        {MAP_LANDMARKS.map(landmark => (
          <CircleMarker
            key={landmark.name}
            center={[landmark.lat, landmark.lng]}
            radius={4}
            pathOptions={{
              fillColor: '#8B7E6A',
              fillOpacity: 0.6,
              color: '#8B7E6A',
              weight: 1,
            }}
          >
            <Popup>
              <strong style={{ fontFamily: 'Georgia, serif', fontSize: 12 }}>{landmark.name}</strong>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  )
}
