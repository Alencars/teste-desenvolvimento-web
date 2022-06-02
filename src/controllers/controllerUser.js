const express = require('express')
const User = require('../models/modelUser')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const crypto = require('crypto')

exports.createUser = async (req, res) => {
    const { name, email, password } = req.body

    if (!name) {
        res.status(422).json({ error: 'O nome é obrigatório!' })
        return
    }
    if (!email) {
        res.status(422).json({ error: 'O email é obrigatório!' })
        return
    }
    if (!password) {
        res.status(422).json({ error: 'A senha é obrigatória!' })
        return
    }

    const userExists = await User.findOne({ email: email})

    if (userExists) {
        return res.status(422).json({ message: "Email já cadastrado"})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = {
        name,
        email,
        password: hashedPassword,
    }

    try {
        await User.create(user)

        res.status(201).json({ message: 'Usuário criado com sucesso' })
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

exports.findManyUser = async (req, res) => {
    try {
        const users = await User.find()

        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

exports.findOneUser = async (req, res) => {
    const id = req.params.id

    try {
        const user = await User.findOne({ _id: id })

        if (!user) {
            res.status(422).json({ message: 'O nome não encontrado' })
            return
        }

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({ error: error })
    }
}

exports.updateUser =  async (req, res) => {
    const id = req.params.id

    const { name, email, password } = req.body

    const user = {
        name,
        email,
        password
    }

    try {
        const updatedUser = await User.updateOne({ _id: id }, user)

        if (updatedUser.matchedCount == 0) {
            res.status(422).json({ message: 'Usuário não encontrado' })
            return
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: error })
    }

}

exports.deleteUser = async (req, res) => {
    const id = req.params.id
    
    const user = await User.findOne({_id: id})

    if(!user) {
        res.status(422).json({ message: 'Usuário não encontrado'})
        return
    }

    try {
        await User.deleteOne({_id: id})
        
        res.status(200).json({ message: 'Usuário removido com sucesso'})
    } catch (error) {
        res.status(500).json({ error: error})
    }
}

exports.forgotPassword = async (req, res) => {
    const { email } = request.body

    try {
        
        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(422).json({ message: "Usuário não encontrado!"})
        }
        
        const newPassword = crypto.randomBytes(4).toString('HEX')

        const now = new Date()
        now.setHours(now.getHours() + 1)

        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: Token,
                passwordResetExpires: now,
            }
        })

        const transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: env.process.AUTH_USER,
                pass: env.process.AUTH_PASSWORD
            }
        })


        transporter.sendMail({
            from: 'Administrador <4bad6630a7-512170+1@inbox.mailtrap.io>',
            to: email,
            subject: 'Recuperação de senha!',
            html: `<p>Olá, sua nova senha para acessar o sistema é: ${newPassword}</p><br/><a href="http://localhost:3000/login">Sistema</a>`
        })

    } catch (error) {
        return res.status(404).json({ message: "Usuário não encontrado"})
    }
}