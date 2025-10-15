import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { searchVideos, formatTimeAgo } from '../../services/videoService'

const SearchPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const query = searchParams.get('query') || ''
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (query) {
      handleSearch(query)
    }
  }, [query])

  const handleSearch = async (searchTerm) => {
    setLoading(true)
    const items = await searchVideos(searchTerm)
    const mapped = items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      views: item.statistics?.viewCount || 'N/A',
      time: formatTimeAgo(item.snippet.publishedAt),
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
      avatar: item.snippet.thumbnails.default?.url,
      description: item.snippet.description,
    }))
    setVideos(mapped)
    setLoading(false)
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 py-6">
        {loading && (
          <div className="text-center text-lg text-gray-500 py-20">Đang tìm kiếm video...</div>
        )}
        {!loading && videos.length === 0 && query && (
          <div className="text-center text-lg text-gray-500 py-20">Không tìm thấy video nào.</div>
        )}
        {!loading && videos.length > 0 && (
          <div className="flex flex-col gap-6">
            {videos.map(video => (
              <div
                key={video.id}
                className="flex gap-5 cursor-pointer"
                onClick={() => navigate(`/video/${video.id}`)}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-[360px] h-[202px] rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex flex-col flex-1">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 hover:text-blue-600">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-1">
                    <img src={video.avatar} alt={video.channel} className="w-7 h-7 rounded-full" />
                    <span className="text-sm text-gray-700 font-medium">{video.channel}</span>
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    {video.views} lượt xem • {video.time}
                  </div>
                  <div className="text-sm text-gray-600 line-clamp-2">
                    {video.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchPage