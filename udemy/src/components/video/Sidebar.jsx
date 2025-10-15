import React, { useEffect, useState, useContext } from 'react'
import UserContext from '../../context/UserContext'
import { fetchChannelDetail } from '../../services/videoService'
import { FaHome, FaRegClock, FaThumbsUp, FaListUl, FaDownload } from 'react-icons/fa'
import { MdSubscriptions, MdVideoLibrary, MdOutlineShortText } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const { profile, subscriptions } = useContext(UserContext)
  const [channels, setChannels] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchChannels = async () => {
      if (!profile?.sub || subscriptions.length === 0) return
      const details = await Promise.all(
        subscriptions.slice(0, 5).map(async (ch) => {
          const info = await fetchChannelDetail(ch.youtubeId)
          return {
            name: info?.title || ch.title,
            avatar: info?.thumbnails?.default?.url || ch.avatar,
            youtubeId: ch.youtubeId
          }
        })
      )
      setChannels(details)
    }
    fetchChannels()
  }, [profile, subscriptions])

  return (
    <aside className="w-64 bg-white text-black h-screen fixed top-0 left-0 z-40 flex flex-col pt-4 border-r border-gray-200 overflow-y-auto">
      <div className="px-4 mb-4">
        <div className="flex items-center gap-2 mb-6">
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png" alt="YouTube" className="h-6 w-6" />
          <span className="font-bold text-xl">YouTube</span>
          <span className="ml-1 text-xs text-gray-500 font-medium">VN</span>
        </div>
        
        <button onClick={() => navigate('/video')} className="flex items-center gap-3 w-full py-2 px-3 rounded-lg bg-gray-100 mb-2 hover:bg-gray-200">
          <FaHome className="text-lg" />
          <span>Trang chủ</span>
        </button>
        <button className="flex items-center gap-3 w-full py-2 px-3 rounded-lg bg-gray-100 mb-2 hover:bg-gray-200">
          <MdOutlineShortText className="text-lg" />
          <span>Shorts</span>
        </button>
        <button onClick={() => navigate('/video/subscriptions')} className="flex items-center gap-3 w-full py-2 px-3 rounded-lg bg-gray-100 mb-2 hover:bg-gray-200">
          <MdSubscriptions className="text-lg" />
          <span>Kênh đăng ký</span>
        </button>
        
        <hr className="my-3 border-gray-200" />
        
        <div className="text-xs text-gray-500 mb-2">Bạn</div>
        <button className="flex items-center gap-3 w-full py-2 px-3 rounded-lg mb-2 hover:bg-gray-100">
          <FaRegClock className="text-lg" />
          <span>Video đã xem</span>
        </button>
        <button className="flex items-center gap-3 w-full py-2 px-3 rounded-lg mb-2 hover:bg-gray-100">
          <FaListUl className="text-lg" />
          <span>Danh sách phát</span>
        </button>
        <button className="flex items-center gap-3 w-full py-2 px-3 rounded-lg mb-2 hover:bg-gray-100">
          <MdVideoLibrary className="text-lg" />
          <span>Video của bạn</span>
        </button>
        <button className="flex items-center gap-3 w-full py-2 px-3 rounded-lg mb-2 hover:bg-gray-100">
          <FaRegClock className="text-lg" />
          <span>Xem sau</span>
        </button>
        <button onClick={() => navigate('/video/liked')} className="flex items-center gap-3 w-full py-2 px-3 rounded-lg mb-2 hover:bg-gray-100">
          <FaThumbsUp className="text-lg" />
          <span>Video đã thích</span>
        </button>
        <button className="flex items-center gap-3 w-full py-2 px-3 rounded-lg mb-2 hover:bg-gray-100">
          <FaDownload className="text-lg" />
          <span>Nội dung tải xuống</span>
        </button>
        
        <hr className="my-3 border-gray-200" />
        
        <div className="text-xs text-gray-500 mb-2">Kênh đăng ký</div>
        {channels.length === 0 ? (
          <div className="text-xs text-gray-400 px-3 py-2">Chưa có kênh đăng ký</div>
        ) : (
          <>
            {channels.map(sub => (
              <div
                key={sub.youtubeId}
                className="flex items-center gap-3 py-2 px-3 hover:bg-gray-100 rounded-lg mb-1 cursor-pointer"
                onClick={() => window.open(`https://www.youtube.com/channel/${sub.youtubeId}`, '_blank')}
              >
                <img src={sub.avatar} alt={sub.name} className="w-6 h-6 rounded-full bg-gray-200 object-cover" />
                <span className="text-sm truncate">{sub.name}</span>
              </div>
            ))}
            {subscriptions.length > 5 && (
              <button
                onClick={() => navigate('/video/subscriptions')}
                className="text-sm text-blue-600 hover:underline px-3 py-2 w-full text-left"
              >
                Xem tất cả ({subscriptions.length})
              </button>
            )}
          </>
        )}
      </div>
    </aside>
  )
}

export default Sidebar