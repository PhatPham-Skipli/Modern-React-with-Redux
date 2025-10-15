const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        googleId: { type: String, required: true, unique: true },
        name: String,
        email: String,
        avatar: String,
        likedVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
        subscriptions: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
