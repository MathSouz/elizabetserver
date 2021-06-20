const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const cors = require('cors')
require('dotenv/config')
require('./database')

app.use(cookieParser())
app.use(cors({origin: process.env.CROSS_ORIGIN, credentials: true}))
app.use(express.json())

require('./routes/user')(app)
require('./routes/championship')(app)
require('./routes/teams')(app)

const port = process.env.PORT;

app.listen(port, () => {
    console.log("Servidor aberto na porta " + port)
})