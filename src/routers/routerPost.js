const express = require("express")
const router = express.Router()
const controllerPost = require('../controllers/controllerPost')

router  
    .post('/', controllerPost.createPost)
    .get('/', controllerPost.findManyPosts)
module.exports = router