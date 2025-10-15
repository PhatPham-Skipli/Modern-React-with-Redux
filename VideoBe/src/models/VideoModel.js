const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
    {
        youtubeId: { type: String, required: true, unique: true },
        title: String,
        thumbnail: String,
        channelTitle: String,
        publishedAt: Date,
        description: String
    },
    { timestamps: true }
);

module.exports = mongoose.model('Video', videoSchema);
