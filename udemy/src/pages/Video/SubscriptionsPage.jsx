import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import { MdSubscriptions } from 'react-icons/md'
import { fetchChannelDetail } from '../../services/videoService'

const SubscriptionsPage = () => {
  const { profile, subscriptions } = useContext(UserContext)
  const navigate = useNavigate()
  const [channels, setChannels] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!profile) {
      navigate('/video')
    }
  }, [profile, navigate])

  useEffect(() => {
    const loadChannels = async () => {
      setLoading(true)
      const details = await Promise.all(
        subscriptions.map(async (ch) => {
          const info = await fetchChannelDetail(ch.youtubeId, true)
          return {
            ...ch,
            name: info?.title || ch.title,
            avatar: info?.thumbnails?.high?.url || ch.avatar,
            description: info?.description || ch.description,
            subs: info?.subs || '',
            customUrl: info?.customUrl || '',
          }
        })
      )
      setChannels(details)
      setLoading(false)
    }
    if (subscriptions.length > 0) {
      loadChannels()
    } else {
      setLoading(false)
    }
  }, [subscriptions])

  if (!profile) return null

  return (
    <div className="bg-white min-h-screen pt-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <MdSubscriptions className="text-red-600" />
          Tất cả kênh đã đăng ký
        </h1>
        {loading ? (
          <div className="text-center py-20 text-lg text-gray-400">Đang tải...</div>
        ) : channels.length === 0 ? (
          <div className="text-center py-20 text-gray-400">Chưa đăng ký kênh nào</div>
        ) : (
          <div className="flex flex-col gap-6">
            {channels.map((channel) => (
              <div
                key={channel.youtubeId}
                className="flex items-center bg-gray-100 rounded-xl px-6 py-5 hover:bg-gray-200 transition cursor-pointer"
                onClick={() => window.open(`https://www.youtube.com/channel/${channel.youtubeId}`, '_blank')}
              >
                <img
                  src={channel.avatar}
                  alt={channel.name}
                  className="w-20 h-20 rounded-full object-cover mr-6"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-semibold text-gray-900">{channel.name}</span>
                    {channel.customUrl && (
                      <span className="text-gray-500 text-sm">@{channel.customUrl}</span>
                    )}
                  </div>
                  <div className="text-gray-500 text-sm mb-2">
                    {channel.subs}
                  </div>
                  <div className="text-gray-700 text-sm line-clamp-2">{channel.description}</div>
                </div>
                <button className="ml-6 px-6 py-2 bg-white text-gray-900 rounded-full font-medium text-sm border border-gray-300 flex items-center gap-2 hover:bg-gray-100">
                  <MdSubscriptions className="text-lg text-red-500" />
                  Đã đăng ký
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SubscriptionsPage