const express = require('express')

const app = express()

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

app.get("/", (req, res) => {

    res.json({ message: 'Oi express!'})

})

app.listen(3000, () => console.log("Server está no ar"))