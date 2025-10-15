import React, { useState, useRef } from 'react'
import { fetchLocations } from '../../services/mapService'
import Button from '../Button'

const typeMap = {
    administrative: "Hành chính",
    town: "Thị trấn",
    city: "Thành phố",
    village: "Làng",
    suburb: "Ngoại ô",
}

const LocationSearch = ({ onPlaceSelect }) => {
    const [places, setPlaces] = useState([])
    const [term, setTerm] = useState('')
    const debounceRef = useRef(null)

    const handleChange = (e) => {
        const value = e.target.value
        setTerm(value)
        if (debounceRef.current) clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(async () => {
            if (value.trim()) {
                try {
                    const response = await fetchLocations(value)
                    setPlaces(response.features)
                } catch (error) {
                    console.error("Error fetching locations:", error)
                }
            } else {
                setPlaces([])
            }
        }, 500)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (debounceRef.current) clearTimeout(debounceRef.current)
        if (term.trim()) {
            try {
                const response = await fetchLocations(term)
                setPlaces(response.features)
            } catch (error) {
                console.error("Error fetching locations:", error)
            }
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-4 border border-blue-100">
            <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={term}
                    onChange={handleChange}
                    placeholder="Tìm kiếm địa điểm, ví dụ: Hà Nội..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                />
                <Button
                    type="submit"
                    className="bg-blue-600 text-white hover:bg-blue-700"
                >
                    Tìm kiếm
                </Button>
            </form>
            <ul>
                {places.map((place) => (
                    <li
                        key={place.properties.place_id}
                        className="flex flex-col gap-1 md:flex-row md:items-center justify-between py-2 border-b border-gray-100 hover:bg-blue-50 transition"
                    >
                        <div className="flex-1">
                            <div className="font-semibold text-base text-blue-700">
                                {place.properties.name || 'Không tên'}
                            </div>
                            <div className="text-sm text-gray-500">
                                {place.properties.display_name}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                                <span>
                                    Loại: {typeMap[place.properties.type] || place.properties.type}
                                </span>
                                {place.geometry?.coordinates &&
                                    <span> | Tọa độ: {place.geometry.coordinates[1]}, {place.geometry.coordinates[0]}</span>
                                }
                                {place.properties.country &&
                                    <span> | Quốc gia: {place.properties.country}</span>
                                }
                                {place.properties.state &&
                                    <span> | Tỉnh/Thành: {place.properties.state}</span>
                                }
                                {place.properties.city &&
                                    <span> | Thành phố: {place.properties.city}</span>
                                }
                                {place.properties.town &&
                                    <span> | Thị trấn: {place.properties.town}</span>
                                }
                            </div>
                        </div>
                        <Button
                            onClick={() => onPlaceSelect(place)}
                            className="bg-green-500 text-white hover:bg-green-600 px-3 py-1 mt-2 md:mt-0"
                        >
                            Chọn
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default LocationSearch