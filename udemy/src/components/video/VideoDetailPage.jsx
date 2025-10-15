import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AiOutlineLike, AiOutlineDislike, AiFillLike } from 'react-icons/ai'
import { RiShareForwardLine } from 'react-icons/ri'
import { MdPlaylistAdd } from 'react-icons/md'
import { fetchVideoDetail, fetchRelatedVideos, formatViewCount, formatTimeAgo } from '../../services/videoService'
import { likeVideo, unlikeVideo, subscribeChannel, unsubscribeChannel } from '../../services/userService'
import UserContext from '../../context/UserContext'
import { toast } from 'react-toastify'

const VideoDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [video, setVideo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [recommended, setRecommended] = useState([])
  const { profile, likedVideos, setLikedVideos, subscriptions, setSubscriptions } = useContext(UserContext)

  const isLiked = likedVideos.some(v => v.youtubeId === id)
  const isSubscribed = subscriptions.some(c => c.youtubeId === video?.snippet?.channelId)

  useEffect(() => {
    const getDetail = async () => {
      setLoading(true)
      const data = await fetchVideoDetail(id)
      setVideo(data)
      setLoading(false)
    }
    getDetail()
  }, [id])

  useEffect(() => {
    const getRecommended = async () => {
      const items = await fetchRelatedVideos(id)
      setRecommended(items.slice(0, 10))
    }
    getRecommended()
  }, [id])

  const handleLike = async () => {
    if (!profile) {
      toast.warning('Vui lòng đăng nhập để thích video!')
      return
    }
    try {
      if (isLiked) {
        const updated = await unlikeVideo(profile.sub, id)
        setLikedVideos(updated.map(v => ({
          ...v,
          youtubeId: v.youtubeId || v._id
        })))
        toast.success('Đã bỏ thích video!')
      } else {
        const videoData = {
          youtubeId: id,
          title: video.snippet.title,
          thumbnail: video.snippet.thumbnails.high?.url,
          channelTitle: video.snippet.channelTitle,
          publishedAt: video.snippet.publishedAt,
          description: video.snippet.description
        }
        const updated = await likeVideo(profile.sub, videoData)
        setLikedVideos(updated.map(v => ({
          ...v,
          youtubeId: v.youtubeId || v._id
        })))
        toast.success('Đã thích video!')
      }
    } catch (err) {
      toast.error('Có lỗi xảy ra!')
    }
  }

  const handleSubscribe = async () => {
    if (!profile) {
      toast.warning('Vui lòng đăng nhập để đăng ký kênh!')
      return
    }
    try {
      if (isSubscribed) {
        const updated = await unsubscribeChannel(profile.sub, video.snippet.channelId)
        setSubscriptions(updated.map(c => ({
          ...c,
          youtubeId: c.youtubeId || c._id
        })))
        toast.success('Đã hủy đăng ký kênh!')
      } else {
        const channelData = {
          youtubeId: video.snippet.channelId,
          title: video.snippet.channelTitle,
          avatar: video.snippet.thumbnails.default?.url,
          description: ''
        }
        const updated = await subscribeChannel(profile.sub, channelData)
        setSubscriptions(updated.map(c => ({
          ...c,
          youtubeId: c.youtubeId || c._id
        })))
        toast.success('Đã đăng ký kênh!')
      }
    } catch (err) {
      toast.error('Có lỗi xảy ra!')
    }
  }

  if (loading) return <div className="text-center py-20 text-lg text-gray-500">Đang tải...</div>
  if (!video) return <div className="text-center py-20 text-lg text-gray-500">Không tìm thấy video.</div>

  const description = video.snippet.description || "Không có mô tả"
  const shortDescription = description.slice(0, 200)

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-[1800px] mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <div className="aspect-video rounded-xl overflow-hidden bg-black">
              <iframe
                title={video.snippet.title}
                src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                allow="autoplay"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            {/* Video Info */}
            <div className="mt-4">
              <h1 className="text-xl font-semibold text-gray-900 mb-3">
                {video.snippet.title}
              </h1>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={video.snippet.thumbnails.default.url}
                    alt={video.snippet.channelTitle}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{video.snippet.channelTitle}</div>
                    <div className="text-xs text-gray-600">
                      {formatViewCount(video.statistics?.viewCount)} lượt xem • {formatTimeAgo(video.snippet.publishedAt)}
                    </div>
                  </div>
                  <button
                    onClick={handleSubscribe}
                    className={`ml-4 px-4 py-2 rounded-full text-sm font-medium ${isSubscribed ? 'bg-gray-200 text-black hover:bg-gray-300' : 'bg-black text-white hover:bg-gray-800'}`}
                  >
                    {isSubscribed ? 'Đã đăng ký' : 'Đăng ký'}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-gray-100 rounded-full overflow-hidden">
                    <button
                      onClick={handleLike}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200"
                    >
                      {isLiked ? <AiFillLike className="text-xl text-blue-600" /> : <AiOutlineLike className="text-xl" />}
                      <span className="text-sm font-medium">{formatViewCount(video.statistics?.likeCount)}</span>
                    </button>
                    <div className="w-px h-6 bg-gray-300"></div>
                    <button className="px-4 py-2 hover:bg-gray-200">
                      <AiOutlineDislike className="text-xl" />
                    </button>
                  </div>
                  <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200">
                    <RiShareForwardLine className="text-xl" />
                    <span className="text-sm font-medium">Chia sẻ</span>
                  </button>
                  <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                    <MdPlaylistAdd className="text-2xl" />
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="bg-gray-100 rounded-xl p-4">
                <div className="text-sm text-gray-800 whitespace-pre-wrap">
                  {showFullDescription ? description : shortDescription}
                  {description.length > 200 && !showFullDescription && '...'}
                </div>
                {description.length > 200 && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-sm font-medium mt-2 hover:text-gray-700"
                  >
                    {showFullDescription ? 'Ẩn bớt' : 'Hiển thị thêm'}
                  </button>
                )}
              </div>

              {/* Comments Section */}
              <div className="mt-6">
                <div className="text-xl font-semibold mb-4">
                  {formatViewCount(video.statistics?.commentCount)} bình luận
                </div>
                <div className="text-gray-500 text-center py-8">
                  Phần bình luận sẽ được cập nhật sau
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Recommended Videos */}
          <div className="lg:col-span-1">
            <div className="font-semibold text-lg mb-4 text-gray-900">Video đề xuất</div>
            <div className="flex flex-col gap-4">
              {recommended.map(item => (
                <div
                  key={item.id.videoId}
                  className="flex gap-3 cursor-pointer hover:bg-gray-100 rounded-lg p-2"
                  onClick={() => navigate(`/video/${item.id.videoId}`)}
                >
                  <img
                    src={item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url}
                    alt={item.snippet.title}
                    className="w-32 h-20 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-gray-900 line-clamp-2">{item.snippet.title}</div>
                    <div className="text-xs text-gray-600 mt-1">{item.snippet.channelTitle}</div>
                    <div className="text-xs text-gray-500">{formatViewCount(item.statistics?.viewCount)} lượt xem • {formatTimeAgo(item.snippet.publishedAt)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoDetailPage