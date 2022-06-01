const express = require("express")
const router = express.Router()
const controllerPost = require('../controllers/controllerPost')

router  
    .post('/', controllerPost.createPost)

module.exports = router