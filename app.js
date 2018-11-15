require ('dotenv').config()
const express =require('express')
const cors = require('cors')
const users = require('./routes/user')

const app = express()

app.use(cors())
app.use('/api/users', users)

app.listen(process.env.PORT, () => console.log(process.env.PORT))

