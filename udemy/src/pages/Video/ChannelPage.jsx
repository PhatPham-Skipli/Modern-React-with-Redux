import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchChannelDetail } from '../../services/videoService'
import { MdNotifications } from 'react-icons/md'
import { IoChevronDown } from 'react-icons/io5'
import UserContext from '../../context/UserContext'
import { subscribeChannel, unsubscribeChannel } from '../../services/userService'
import { toast } from 'react-toastify'
import axios from 'axios'

const ChannelPage = () => {
    const { channelId } = useParams()
    const navigate = useNavigate()
    const { profile, subscriptions, setSubscriptions } = useContext(UserContext)
    const [channel, setChannel] = useState(null)
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('home')

    const isSubscribed = subscriptions.some(c => c.youtubeId === channelId)

    useEffect(() => {
        loadChannelData()
    }, [channelId])

    const loadChannelData = async () => {
        setLoading(true)
        try {
            const channelInfo = await fetchChannelDetail(channelId, true)
            setChannel(channelInfo)

            // Fetch channel videos
            const response = await axios.get(
                `https://www.googleapis.com/youtube/v3/search?key=${import.meta.env.VITE_YOUTUBE_API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=20&type=video`
            )
            setVideos(response.data.items || [])
        } catch (error) {
            console.error('Error loading channel:', error)
        }
        setLoading(false)
    }

    const handleSubscribe = async () => {
        if (!profile) {
            toast.warning('Vui lòng đăng nhập!')
            return
        }
        try {
            if (isSubscribed) {
                await unsubscribeChannel(profile.sub, channelId)
                setSubscriptions(subscriptions.filter(c => c.youtubeId !== channelId))
                toast.success('Đã hủy đăng ký kênh!')
            } else {
                const channelData = {
                    youtubeId: channelId,
                    title: channel?.title,
                    avatar: channel?.thumbnails?.high?.url,
                    description: channel?.description
                }
                await subscribeChannel(profile.sub, channelData)
                setSubscriptions([...subscriptions, channelData])
                toast.success('Đã đăng ký kênh!')
            }
        } catch (err) {
            toast.error('Có lỗi xảy ra!')
        }
    }

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Đang tải...</div>
    }

    if (!channel) {
        return <div className="flex items-center justify-center min-h-screen">Không tìm thấy kênh</div>
    }

    return (
        <div className="bg-white min-h-screen text-gray-900">
            <div className="relative w-full h-48 bg-gradient-to-r from-purple-900 via-pink-800 to-orange-700">
                {channel.bannerExternalUrl && (
                    <img
                        src={channel.bannerExternalUrl}
                        alt="Banner"
                        className="w-full h-full object-cover"
                    />
                )}
            </div>

            {/* Channel Info */}
            <div className="max-w-[1800px] mx-auto px-16 py-6">
                <div className="flex items-start gap-6">
                    <img
                        src={channel.thumbnails?.high?.url}
                        alt={channel.title}
                        className="w-40 h-40 rounded-full object-cover border-4 border-red-600"
                    />
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-4xl font-bold">{channel.title}</h1>
                            {channel.isVerified && (
                                <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                            )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                            <span>@{channel.customUrl || channelId}</span>
                            <span>•</span>
                            <span>{channel.subs}</span>
                            <span>•</span>
                            <span>{channel.videoCount} video</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-4 max-w-3xl">
                            {channel.description?.split('\n')[0]}
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={handleSubscribe}
                                className={`px-6 py-2.5 rounded-full font-medium flex items-center gap-2 ${isSubscribed
                                        ? 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                                        : 'bg-black text-white hover:bg-gray-800'
                                    }`}
                            >
                                {isSubscribed ? (
                                    <>
                                        <MdNotifications className="text-xl" />
                                        <span>Đã đăng ký</span>
                                        <IoChevronDown />
                                    </>
                                ) : (
                                    <span>Đăng ký</span>
                                )}
                            </button>
                            <button className="px-6 py-2.5 bg-gray-200 rounded-full font-medium hover:bg-gray-300 text-gray-900">
                                Tham gia
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-8 mt-8 border-b border-gray-200">
                    {['Trang chủ', 'Video', 'Shorts', 'Video phát trực tiếp', 'Podcast', 'Danh sách phát', 'Bài đăng'].map((tab, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveTab(tab.toLowerCase())}
                            className={`pb-3 font-medium ${idx === 0 ? 'border-b-2 border-black' : 'text-gray-500 hover:text-black'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Videos Grid */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {videos.map((video) => (
                        <div
                            key={video.id.videoId}
                            className="cursor-pointer"
                            onClick={() => navigate(`/video/${video.id.videoId}`)}
                        >
                            <div className="relative mb-2">
                                <img
                                    src={video.snippet.thumbnails.high.url}
                                    alt={video.snippet.title}
                                    className="w-full rounded-xl"
                                />
                            </div>
                            <h3 className="font-medium text-sm line-clamp-2 mb-1">
                                {video.snippet.title}
                            </h3>
                            <p className="text-xs text-gray-500">
                                {new Date(video.snippet.publishedAt).toLocaleDateString('vi-VN')}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ChannelPage