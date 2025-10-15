import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const DEFAULT_POSITION = [10.776889, 106.700806]

function ChangeView({ center }) {
  const map = useMap()
  React.useEffect(() => {
    map.setView(center)
  }, [center, map])
  return null
}

const Map = ({ place }) => {
  const position = place?.geometry?.coordinates
    ? [place.geometry.coordinates[1], place.geometry.coordinates[0]]
    : DEFAULT_POSITION

  return (
    <div className="w-full h-96 rounded-2xl overflow-hidden shadow-lg border border-blue-100 mt-6">
      <MapContainer center={position} zoom={13} scrollWheelZoom={true} className="w-full h-full">
        <ChangeView center={position} />
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {place && (
          <Marker position={position}>
            <Popup>
              <div>
                <div className="font-bold text-blue-700">{place.properties.name || 'Không tên'}</div>
                <div className="text-xs text-gray-500">{place.properties.display_name}</div>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  )
}

export default Map