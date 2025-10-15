const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema(
    {
        youtubeId: { type: String, required: true, unique: true },
        title: String,
        avatar: String,
        description: String
    },
    { timestamps: true }
);

module.exports = mongoose.model('Channel', channelSchema);
