import React from 'react'

const ImageShow = ({ image }) => {
  return (
    <div className="overflow-hidden rounded-xl shadow hover:scale-105 hover:shadow-xl transition-all duration-200">
      <img
        src={image.urls.regular}
        alt={image.alt_description}
        className="w-full h-48 object-cover"
      />
    </div>
  )
}

export default ImageShow