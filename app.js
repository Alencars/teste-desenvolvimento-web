const express = require("express")
const cors = require("cors")
const router = express.Router()
const mongoose = require("mongoose")
const routerUser = require('./src/routers/routerUser')
const routerPost = require('./src/routers/routerPost')
const routerLogin = require('./src/routers/routerLogin')
const checkToken = require("./src/middlewares/checkToken")
const app = express()

require("dotenv").config()

app.use(
    express.urlencoded({
        extended: false,
    }),
)

app.use(express.json())
app.use(cors())
app.use('/user', routerUser)
app.use('/post', checkToken, routerPost)
app.use('/login', routerLogin)


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

