import React from 'react'
import VideoCard from './VideoCard'

const VideoList = ({ videos }) => {
  if (!videos || videos.length === 0) {
    return (
      <div className="text-center text-lg text-gray-500 py-20">
        Không có video nào.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map(video => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  )
}

export default VideoList