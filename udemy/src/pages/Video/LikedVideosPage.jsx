import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import { formatTimeAgo } from '../../services/videoService'
import { FaThumbsUp } from 'react-icons/fa'

const LikedVideosPage = () => {
  const { profile, likedVideos } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!profile) {
      navigate('/video')
    }
  }, [profile, navigate])

  if (!profile) return null

  return (
    <div className="bg-gray-50 min-h-screen pt-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaThumbsUp className="text-blue-600" />
            Video đã thích
          </h1>
          <p className="text-gray-600 mt-2">{likedVideos.length} video</p>
        </div>

        {likedVideos.length === 0 ? (
          <div className="text-center py-20">
            <FaThumbsUp className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Chưa có video nào được thích</p>
          </div>
        ) : (
          <div className="space-y-4">
            {likedVideos.map((video) => (
              <div
                key={video._id}
                className="flex gap-4 bg-white p-4 rounded-lg hover:bg-gray-100 cursor-pointer transition"
                onClick={() => navigate(`/video/${video.youtubeId}`)}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-60 h-36 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
                    {video.title}
                  </h3>
                  <div className="text-sm text-gray-600 mb-1">{video.channelTitle}</div>
                  <div className="text-sm text-gray-500">
                    {formatTimeAgo(video.publishedAt)}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mt-2">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default LikedVideosPage