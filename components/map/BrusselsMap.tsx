'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import { useProfile } from '@/lib/hooks/use-preferences'
import { COMMUNES, PROFILES, MAP_LANDMARKS } from '@/lib/constants'
import 'leaflet/dist/leaflet.css'

export default function BrusselsMap() {
  const [profile] = useProfile()
  const profileInfo = profile ? PROFILES[profile] : null
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div
      style={{ height: 'calc(100vh - 160px)', minHeight: 400 }}
      className="rounded-xl overflow-hidden border border-border shadow-card"
    >
      <MapContainer
        center={[50.845, 4.375]}
        zoom={12}
        style={{ height: '100%', width: '100%', background: '#09090B' }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          maxZoom={20}
        />

        {COMMUNES.map(commune => {
          const isRecommended = profileInfo?.top_communes.includes(commune.id as never)
          const radius = 8 + commune.expat * 2

          return (
            <CircleMarker
              key={commune.id}
              center={[commune.lat, commune.lng]}
              radius={radius}
              pathOptions={{
                fillColor: isRecommended ? '#34D399' : '#F59E0B',
                fillOpacity: 0.8,
                color: isRecommended ? '#34D399' : '#F59E0B',
                weight: 1.5,
              }}
            >
              <Popup>
                <div style={{ fontFamily: 'sans-serif', minWidth: 160, background: '#111113', color: '#FAFAFA', borderRadius: 8, padding: '8px 0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                    <strong style={{ fontSize: 14 }}>{commune.name}</strong>
                    {isRecommended && (
                      <span style={{ fontSize: 9, background: 'rgba(52,211,153,0.15)', color: '#34D399', padding: '1px 6px', borderRadius: 4, fontWeight: 700, textTransform: 'uppercase', marginLeft: 4 }}>
                        For you
                      </span>
                    )}
                  </div>
                  <p style={{ margin: '2px 0', fontSize: 12, color: '#A1A1AA', fontStyle: 'italic' }}>{commune.vibe}</p>
                  <p style={{ margin: '4px 0', fontSize: 13, color: '#F59E0B', fontWeight: 700 }}>€{commune.rent}/mo avg</p>
                  <p style={{ margin: '4px 0', fontSize: 11, color: '#71717A' }}>{commune.desc}</p>
                  <a
                    href={`https://www.immoweb.be/en/search/apartment/for-rent/${commune.immoweb}?countries=BE`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 11, color: '#F59E0B', textDecoration: 'none', display: 'block', marginTop: 4 }}
                  >
                    View on Immoweb ↗
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
            radius={5}
            pathOptions={{
              fillColor: '#71717A',
              fillOpacity: 0.7,
              color: '#71717A',
              weight: 1,
            }}
          >
            <Popup>
              <div style={{ fontFamily: 'sans-serif', fontSize: 12 }}>
                <strong>{landmark.name}</strong>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  )
}
