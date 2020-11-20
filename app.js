const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const cors = require('cors')
const numbers = require("./routes/numbers");

app.use(cors())
app.use(bodyParser.json())

app.use('/', numbers)

module.exports = app