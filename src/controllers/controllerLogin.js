const User = require('../models/modelUser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.formLogin = async (req, res) => {
    const {email, password} = req.body

    console.log(req.body)

    if (!email) {
        return res.status(422).json({ message: "O email é obrigatório!"})
    }

    if (!password) {
        return res.status(422).json({ message: "A senha é obrigatória"})
    }


    const user = await User.findOne({ email: email })

    if (!user) {
        return res.status(422).json({ message: "Usuário não encontrado!"})
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword) {
        return res.status(422).json({ message: "Senha inválida"})
    }

    try {
        const secret = process.env.secret

        const token = jwt.sign(
            {
                id: user._id,
            },
            secret
        )

        res.status(200).json({message: "Login realizado com sucesso", token})

    } catch (error) {
        res.status(500).json({ message: error})
    }
}

