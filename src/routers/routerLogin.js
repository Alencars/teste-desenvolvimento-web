const express = require("express")
const router = express.Router()
const User = require('../models/modelUser')
const controllerLogin = require('../controllers/controllerLogin')
const checkToken = require("../middlewares/checkToken")
require('dotenv').config()

router
    .post('/', controllerLogin.formLogin)
    .get("/:id", checkToken, async (req, res) => {
        const id = req.params.id;

        const user = await User.findById(id, "-password");

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado!" });
        }

        res.status(200).json({ user });
    });


module.exports = router