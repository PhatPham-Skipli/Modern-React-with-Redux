import axios from 'axios'

const API_URL = 'http://localhost:3000/api/user'

export const getUserProfile = async (googleId) => {
  try {
    const res = await axios.get(`${API_URL}/${googleId}`)
    return res.data
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return null
  }
}

export const likeVideo = async (googleId, videoData) => {
  try {
    const res = await axios.post(`${API_URL}/${googleId}/like`, videoData)
    return res.data
  } catch (error) {
    console.error('Error liking video:', error)
    throw error
  }
}

export const unlikeVideo = async (googleId, videoId) => {
  try {
    const res = await axios.post(`${API_URL}/${googleId}/unlike`, { youtubeId: videoId })
    return res.data
  } catch (error) {
    console.error('Error unliking video:', error)
    throw error
  }
}

export const subscribeChannel = async (googleId, channelData) => {
  try {
    const res = await axios.post(`${API_URL}/${googleId}/subscribe`, channelData)
    return res.data
  } catch (error) {
    console.error('Error subscribing channel:', error)
    throw error
  }
}

export const unsubscribeChannel = async (googleId, channelId) => {
  try {
    const res = await axios.post(`${API_URL}/${googleId}/unsubscribe`, { youtubeId: channelId })
    return res.data
  } catch (error) {
    console.error('Error unsubscribing channel:', error)
    throw error
  }
}

export const getUserSubscriptions = async (googleId) => {
  try {
    const res = await axios.get(`${API_URL}/${googleId}/subscriptions`)
    return res.data
  } catch (error) {
    console.error('Error fetching subscriptions:', error)
    return []
  }
}