const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./src/routes/routesUser')

require("dotenv").config()

const app = express()

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())
app.use('/user', userRoutes)

app.get("/", (req, res) => {

    res.json({ message: 'Oi express!'})

})

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.1a57gaq.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() =>{
        console.log('Conectamos ao MongoDB!')
        app.listen(process.env.PORT || 3000)
    })
    .catch((err) => console.log(err))