const mongoose = require('mongoose')

const Post = mongoose.model('Post', {
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    img_url: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
        timestamps: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
})

module.exports = Post