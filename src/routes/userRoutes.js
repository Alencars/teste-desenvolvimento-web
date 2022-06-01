const express = require("express").Router()
const { Router } = require("express")
const User = require('../models/userModel')

Router.post('/', async (req, res) => {
    const {name, email, password} = req.body

    if(!name) {
        res.status(422).json({error: 'O nome é obrigatório!'})
        return
    }
    if(!email) {
        res.status(422).json({error: 'O nome é obrigatório!'})
        return
    }
    if(!password) {
        res.status(422).json({error: 'O nome é obrigatório!'})
        return
    }

    const user = {
        name,
        email,
        senha
    }

    try{
        await User.create(user)

        res.status(201).json({ message: 'Usuário criado com sucesso'})
    } catch (error) {
        res.status(500).json({error: error})
    }

    
})


