const express = require("express")
const router = express.Router()
const controllerUser = require('../controllers/controllerUser')

router
    .post('/', controllerUser.createUser)
    .post('/forgot_password', controllerUser.forgotPassword)
    .get('/', controllerUser.findManyUser)
    .get('/:id', controllerUser.findOneUser)
    .patch('/:id', controllerUser.updateUser)
    .delete('/:id', controllerUser.deleteUser)

module.exports = router


