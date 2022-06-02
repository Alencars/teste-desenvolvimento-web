const express = require('express')
const User = require('../models/modelUser')
const bcrypt = require('bcrypt')


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

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

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