const express = require("express").Router()
const { Router } = require("express")
const User = require('../models/userModel')

Router.post('/', async (req, res) => {
    const { name, email, password } = req.body

    if (!name) {
        res.status(422).json({ error: 'O nome é obrigatório!' })
        return
    }
    if (!email) {
        res.status(422).json({ error: 'O nome é obrigatório!' })
        return
    }
    if (!password) {
        res.status(422).json({ error: 'O nome é obrigatório!' })
        return
    }

    const user = {
        name,
        email,
        senha
    }

    try {
        await User.create(user)

        res.status(201).json({ message: 'Usuário criado com sucesso' })
    } catch (error) {
        res.status(500).json({ error: error })
    }

    Router.get('/', async (req, res) => {
        try {
            const users = await User.find()

            res.status(200).json(users)
        } catch {
            res.status(500).json({ error: error })
        }
    })

    Router.get('/:id', async (req, res) => {
        const id = req.params.id

        try {
            const user = await User.findOne({ _id: id })

            if (!user) {
                res.status(422).json({ message: 'O nome é obrigatório' })
                return
            }

            res.status(200).json(user)

        } catch (error) {
            res.status(500).json({ error: error })
        }
    })

    Router.patch('/id', async (req, res) => {
        const id = req.params.id

        const { name, email, password } = req.body

        const user = {
            name,
            email,
            password
        }

        try {
            const updatedUser = await User.updateOne({ _id: id }, user)

            if (upadateUser.matchedCount == 0) {
                res.status(422).json({ message: 'Usuário não encontrado' })
                return
            }
            res.status(200).json(client)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    
    })

    Router.delete('/:id', async (req, res) => {
        const id = req.params.id
        
        const user = await User.findOne({_id: id})

        if(!client) {
            res.status(422).json({ message: 'Usuário não encontrado'})
            return
        }

        try {
            await User.deleteOne({_id: id})
            
            res.status(200).json({ message: 'Usuário removido com sucesso'})
        } catch (error) {
            res.status(500).json({ error: error})
        }
    })

})

module.exports = Router


