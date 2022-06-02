const express = require("express")
const router = express.Router()
const controllerLogin = require('../controllers/controllerLogin')

router
    .post('/', controllerLogin.formLogin)
module.exports = router