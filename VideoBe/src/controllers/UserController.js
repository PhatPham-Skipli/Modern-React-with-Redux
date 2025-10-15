const UserService = require('../services/UserService')

exports.createUser = async (req, res) => {
  try {
    const { googleId, name, email, avatar } = req.body
    const user = await UserService.createUser({ googleId, name, email, avatar })
    res.status(201).json(user)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.getProfile = async (req, res) => {
  try {
    const user = await UserService.getProfile(req.params.googleId)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.likeVideo = async (req, res) => {
  try {
    const likedVideos = await UserService.likeVideo(req.params.googleId, req.body)
    res.json(likedVideos)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.unlikeVideo = async (req, res) => {
  try {
    const likedVideos = await UserService.unlikeVideo(req.params.googleId, req.body)
    res.json(likedVideos)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.subscribeChannel = async (req, res) => {
  try {
    const subscriptions = await UserService.subscribeChannel(req.params.googleId, req.body)
    res.json(subscriptions)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.unsubscribeChannel = async (req, res) => {
  try {
    const subscriptions = await UserService.unsubscribeChannel(req.params.googleId, req.body)
    res.json(subscriptions)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getSubscriptions = async (req, res) => {
  try {
    const user = await UserService.getProfile(req.params.googleId)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user.subscriptions || [])
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
