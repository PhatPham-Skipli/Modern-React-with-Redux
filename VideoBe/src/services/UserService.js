const User = require('../models/UserModel')
const Video = require('../models/VideoModel')
const Channel = require('../models/ChannelModel')

exports.createUser = async ({ googleId, name, email, avatar }) => {
  let user = await User.findOne({ googleId })
  if (user) return user
  user = await User.create({ googleId, name, email, avatar })
  return user
}

exports.getProfile = async (googleId) => {
  return await User.findOne({ googleId })
    .populate('likedVideos')
    .populate('subscriptions')
}

exports.likeVideo = async (googleId, videoData) => {
  const { youtubeId, title, thumbnail, channelTitle, publishedAt, description } = videoData
  let video = await Video.findOne({ youtubeId })
  if (!video) {
    video = await Video.create({ youtubeId, title, thumbnail, channelTitle, publishedAt, description })
  }
  const user = await User.findOneAndUpdate(
    { googleId },
    { $addToSet: { likedVideos: video._id } },
    { new: true }
  ).populate('likedVideos')
  return user.likedVideos
}

exports.unlikeVideo = async (googleId, videoData) => {
  const { youtubeId } = videoData
  const video = await Video.findOne({ youtubeId })
  if (!video) throw new Error('Video not found')
  const user = await User.findOneAndUpdate(
    { googleId },
    { $pull: { likedVideos: video._id } },
    { new: true }
  ).populate('likedVideos')
  return user.likedVideos
}

exports.subscribeChannel = async (googleId, channelData) => {
  const { youtubeId, title, avatar, description } = channelData
  let channel = await Channel.findOne({ youtubeId })
  if (!channel) {
    channel = await Channel.create({ youtubeId, title, avatar, description })
  }
  const user = await User.findOneAndUpdate(
    { googleId },
    { $addToSet: { subscriptions: channel._id } },
    { new: true }
  ).populate('subscriptions')
  return user.subscriptions
}

exports.unsubscribeChannel = async (googleId, channelData) => {
  const { youtubeId } = channelData
  const channel = await Channel.findOne({ youtubeId })
  if (!channel) throw new Error('Channel not found')
  const user = await User.findOneAndUpdate(
    { googleId },
    { $pull: { subscriptions: channel._id } },
    { new: true }
  ).populate('subscriptions')
  return user.subscriptions
}