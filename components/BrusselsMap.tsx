'use client'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { COMMUNES, LANDMARKS } from '@/lib/constants'

export default function BrusselsMap() {
  return (
    <MapContainer
      center={[50.840, 4.370]}
      zoom={12}
      style={{ height: '500px', width: '100%' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Commune markers */}
      {COMMUNES.map(commune => (
        <CircleMarker
          key={commune.id}
          center={[commune.lat, commune.lng]}
          radius={8}
          pathOptions={{
            color: '#9E5535',
            fillColor: '#C4704B',
            fillOpacity: 0.8,
            weight: 1.5,
          }}
        >
          <Popup>
            <div style={{ fontFamily: 'system-ui, sans-serif', minWidth: '160px' }}>
              <strong style={{ fontSize: '14px' }}>{commune.name}</strong>
              <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#8B7E6A' }}>
                Avg 1BR: €{commune.rent}/month
              </p>
              <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#8B7E6A' }}>
                {commune.vibe}
              </p>
              <a
                href={`https://www.immoweb.be/en/search/apartment/for-rent?countries=BE&localities=${commune.immoweb}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-block', marginTop: '6px', fontSize: '12px', color: '#C4704B' }}
              >
                Search on Immoweb
              </a>
            </div>
          </Popup>
        </CircleMarker>
      ))}

      {/* Landmark markers */}
      {LANDMARKS.map(lm => (
        <CircleMarker
          key={lm.name}
          center={[lm.lat, lm.lng]}
          radius={5}
          pathOptions={{
            color: '#3D3529',
            fillColor: '#8B7E6A',
            fillOpacity: 0.8,
            weight: 1.5,
          }}
        >
          <Popup>
            <div style={{ fontFamily: 'system-ui, sans-serif' }}>
              <strong style={{ fontSize: '13px' }}>{lm.name}</strong>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  )
}
