const express = require("express")
const mongoose = require("mongoose")
const routesUser = require('./src/routes/routesUser')
const app = express()

require("dotenv").config()

app.use(
    express.urlencoded({
        extended: false,
    }),
)

app.use(express.json())
app.use('/user', routesUser)

app.get("/", (req, res) => {
    res.json({ message: 'Oi express!'})
})


const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const PORT = process.env.PORT;

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.1a57gaq.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() =>{
        console.log('Conectamos ao MongoDB!')
        app.listen(3000)
    })
    .catch((err) => console.log(err))