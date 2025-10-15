import React, { useEffect, useState } from 'react'
import VideoList from '../../components/video/VideoList'
import { fetchTrendingVideos, formatTimeAgo } from '../../services/videoService'

const VideoPage = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getVideos = async () => {
      setLoading(true)
      const items = await fetchTrendingVideos()
      const mapped = items.map(item => ({
        id: item.id,
        title: item.snippet.title,
        channel: item.snippet.channelTitle,
        views: item.statistics.viewCount,
        time: formatTimeAgo(item.snippet.publishedAt),
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
        avatar: item.snippet.thumbnails.default?.url,
      }))
      setVideos(mapped)
      setLoading(false)
    }
    getVideos()
  }, [])

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="max-w-[1800px] mx-auto px-6 py-6">
        {loading ? (
          <div className="text-center text-lg text-gray-500 py-20">Đang tải video...</div>
        ) : (
          <VideoList videos={videos} />
        )}
      </main>
    </div>
  )
}

export default VideoPage