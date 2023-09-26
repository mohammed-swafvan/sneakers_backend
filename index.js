const express = require('express')
const app = express()
const dotenv = require('dotenv');
const port = 3000

dotenv.config()

app.get('/', (req, res) => res.send('Hello Brototype!'))
app.listen(process.env.PORT||port, () => console.log(`Example app listening on port ${process.env.PORT}!`))