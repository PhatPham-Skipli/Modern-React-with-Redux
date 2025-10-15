import React from 'react'
import { useNavigate } from 'react-router-dom'
import { formatViewCount, formatTimeAgo } from '../../services/videoService'

const VideoCard = ({ video }) => {
  const navigate = useNavigate()
  
  return (
    <div
      className="cursor-pointer group"
      onClick={() => navigate(`/video/${video.id}`)}
    >
      <div className="relative rounded-xl overflow-hidden mb-3">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-200"
        />
        {video.duration && (
          <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded">
            {video.duration}
          </span>
        )}
      </div>
      <div className="flex gap-3">
        <img
          src={video.avatar}
          alt={video.channel}
          className="w-9 h-9 rounded-full flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm text-gray-900 line-clamp-2 mb-1 group-hover:text-gray-700">
            {video.title}
          </h3>
          <div className="text-xs text-gray-600">{video.channel}</div>
          <div className="text-xs text-gray-600">
            {formatViewCount(video.views)} lượt xem • {video.time}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCard