const router = require("express").Router()
const controllerUser = require('../controllers/controllerUser')

router
    .post('/user', controllerUser.createUser)
    .get('/user', controllerUser.findManyUser)
    .get('/user/:id', controllerUser.findOneUser)
    .patch('/user/:id', controllerUser.updateUser)
    .delete('/user/:id', controllerUser.deleteUser)
module.exports = router


