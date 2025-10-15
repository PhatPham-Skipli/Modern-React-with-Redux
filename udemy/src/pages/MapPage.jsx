import React, { useState } from 'react'
import Map from '../components/map/Map'
import LocationSearch from '../components/map/LocationSearch'

const MapPage = () => {
  const [place, setPlace] = useState(null);
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-full max-w-md flex flex-col justify-start items-center py-12 px-4">
        <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center drop-shadow">Bản đồ địa điểm</h1>
        <LocationSearch onPlaceSelect={setPlace} /> 
      </div>

      <div className="flex-1 flex items-center justify-center py-12 pr-8">
        <div className="w-full h-[600px] max-w-3xl">
          <Map place={place} />
        </div>
      </div>
    </div>
  )
}

export default MapPage