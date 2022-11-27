const express = require('express')
const app = express()
const cors = require('cors')
const session = require('express-session')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth.js')
const sessionRouter = require('./routes/session.js')
const mailRouter = require('./routes/mailrouter')
require('dotenv').config()

mongoose.connect(process.env.dbconnect, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}, (error) => {
    if (error) {
        throw error
    }
    console.log('connected')
})

app.use(cors({
    credentials: true,
    origin: true
}))

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

const maxAge = 24*60*60*1000
const sessionName = 'cookie'

app.use(session({
    secret: process.env.session_secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        name: sessionName,
        secure: false,
        maxAge: maxAge
    }
}))

app.use('/auth', authRoutes)
app.use(sessionRouter)
app.use(mailRouter)

app.listen(8080)