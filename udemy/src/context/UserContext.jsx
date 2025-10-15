import React, { createContext, useState, useEffect } from 'react'
import { getUserProfile } from '../services/userService'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [likedVideos, setLikedVideos] = useState([])
  const [subscriptions, setSubscriptions] = useState([])

  useEffect(() => {
    const user = localStorage.getItem('user')
    const profile = localStorage.getItem('profile')
    if (user && profile) {
      setUser(JSON.parse(user))
      setProfile(JSON.parse(profile))
    }
  }, [])

  useEffect(() => {
    if (profile?.sub) {
      loadUserData(profile.sub)
    }
  }, [profile])

  const loadUserData = async (googleId) => {
    const userData = await getUserProfile(googleId)
    if (userData) {
      setLikedVideos(userData.likedVideos?.map(v => ({
        ...v,
        youtubeId: v.youtubeId || v._id
      })) || [])
      setSubscriptions(userData.subscriptions?.map(c => ({
        ...c,
        youtubeId: c.youtubeId || c._id
      })) || [])
    }
  }

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      profile,
      setProfile,
      likedVideos,
      setLikedVideos,
      subscriptions,
      setSubscriptions,
      loadUserData
    }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext