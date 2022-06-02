const mongoose = require('mongoose')

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
    },
})

module.exports = User