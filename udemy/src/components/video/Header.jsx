import React, { useContext, useState } from 'react'
import { FiMenu, FiSearch, FiMic } from 'react-icons/fi'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { MdVideoCall } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useGoogleLogin, googleLogout } from '@react-oauth/google'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaRegUserCircle } from 'react-icons/fa'
import axios from 'axios'
import UserContext from '../../context/UserContext'

const Header = () => {
  const [term, setTerm] = useState('')
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()
  const {
    user,
    setUser,
    profile,
    setProfile,
    loadUserData
  } = useContext(UserContext)

  const handleLogoClick = () => {
    navigate("/video")
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (term.trim()) {
      navigate(`/video/search?query=${encodeURIComponent(term)}`)
    }
  }

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setUser(tokenResponse)
      toast.success('Đăng nhập Google thành công!', {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
        style: { fontWeight: 'bold', fontSize: '16px' }
      })
      const res = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
      )
      setProfile(res.data)
      localStorage.setItem('profile', JSON.stringify(res.data)) 

      try {
        await axios.post('http://localhost:3000/api/user/create', {
          googleId: res.data.sub,
          name: res.data.name,
          email: res.data.email,
          avatar: res.data.picture
        })
      } catch (err) {
        console.log('User already exists or error:', err)
      }
      
      loadUserData(res.data.sub)
    },
    onError: () => {
      toast.error('Đăng nhập Google thất bại!', {
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
        style: { fontWeight: 'bold', fontSize: '16px' }
      })
    }
  })

  const handleLogout = () => {
    googleLogout()
    setUser(null)
    setProfile(null)
    setShowMenu(false)
    toast.info('Đã đăng xuất Google!', {
      position: "top-right",
      autoClose: 1800,
      theme: "colored",
      style: { fontWeight: 'bold', fontSize: '16px' }
    })
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 h-14">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <FiMenu className="text-xl" />
          </button>
          <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png"
              alt="YouTube"
              className="h-5 w-5 mr-1"
            />
            <span className="font-bold text-xl">YouTube</span>
            <span className="ml-0.5 text-[10px] text-gray-500 font-medium">VN</span>
          </div>
        </div>

        {/* Center Section - Search */}
        <form className="flex-1 flex items-center justify-center max-w-2xl mx-4" onSubmit={handleSubmit}>
          <div className="flex items-center w-full">
            <div className="flex items-center flex-1 border border-gray-300 rounded-l-full h-10 px-4">
              <input
                type="text"
                placeholder="Tìm kiếm"
                className="bg-transparent outline-none flex-1 text-base"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="h-10 px-6 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200"
            >
              <FiSearch className="text-xl" />
            </button>
          </div>
          <button
            type="button"
            className="ml-3 p-2 bg-gray-100 rounded-full hover:bg-gray-200"
          >
            <FiMic className="text-xl" />
          </button>
        </form>

        {/* Right Section */}
        <div className="flex items-center gap-2 relative">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <MdVideoCall className="text-2xl" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <IoMdNotificationsOutline className="text-2xl" />
          </button>
          <div className="ml-2">
            {!profile ? (
              <button
                onClick={() => login()}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-300 bg-white hover:bg-gray-100 transition text-blue-600 font-medium"
                style={{ boxShadow: '0 1px 4px rgba(60,64,67,.08)' }}
              >
                <FaRegUserCircle className="text-xl" />
                <span>Đăng nhập</span>
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium"
                  style={{ overflow: 'hidden' }}
                >
                  {profile.picture ? (
                    <img src={profile.picture} alt={profile.name} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    profile.name?.charAt(0)
                  )}
                </button>
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                    <div className="flex flex-col items-center py-4 border-b border-gray-100">
                      <img src={profile.picture} alt={profile.name} className="w-12 h-12 rounded-full mb-2" />
                      <div className="font-semibold text-base">{profile.name}</div>
                      <div className="text-sm text-gray-600">{profile.email}</div>
                      <button 
                        onClick={() => navigate('/video/profile')}
                        className="mt-2 text-blue-600 text-sm font-medium hover:underline"
                      >
                        Xem kênh của bạn
                      </button>
                    </div>
                    <div className="py-2">
                      <button 
                        onClick={() => navigate('/video/liked')}
                        className="flex items-center gap-3 w-full px-5 py-3 text-gray-800 hover:bg-gray-100 text-sm"
                      >
                        <FaRegUserCircle className="text-lg" />
                        Video đã thích
                      </button>
                      <button 
                        onClick={() => navigate('/video/subscriptions')}
                        className="flex items-center gap-3 w-full px-5 py-3 text-gray-800 hover:bg-gray-100 text-sm"
                      >
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M7 7h10M7 12h10M7 17h6" stroke="#333" strokeWidth="2" strokeLinecap="round" /></svg>
                        Kênh đăng ký
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-5 py-3 text-red-600 hover:bg-gray-100 text-sm"
                      >
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 12H3m0 0l4-4m-4 4l4 4m8-8v12" stroke="#e53e3e" strokeWidth="2" strokeLinecap="round" /></svg>
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header