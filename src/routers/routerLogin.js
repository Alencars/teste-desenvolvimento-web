const express = require("express")
const router = express.Router()
const User = require('../models/modelUser')
const controllerLogin = require('../controllers/controllerLogin')
const jwt = require('jsonwebtoken')
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

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Acesso negado!" });

    try {
        const secret = process.env.SECRET;

        jwt.verify(token, secret);

        next();
    } catch (err) {
        res.status(400).json({ message: "O Token é inválido!" });
    }
}
module.exports = router