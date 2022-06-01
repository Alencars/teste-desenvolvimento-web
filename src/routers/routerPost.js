const express = require("express")
const router = express.Router()
const controllerPost = require('../controllers/controllerPost')

router  
    .post('/', controllerPost.createPost)
    .get('/', controllerPost.findManyPosts)
    .get('/:id', controllerPost.findOnePost)
    .patch('/:id', controllerPost.updatedPost)
    .delete('/:id', controllerPost.deletePost)
module.exports = router