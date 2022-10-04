const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const app = express()

app.use(session({
    name: process.env.SESSION_NAME || 'app_name.sid',
    secret: "*iot1234!",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.STORE_DB_URI,
    }),
    cookie: {
        httpOnly: true,  // dont let browser javascript access cookie ever
        secure: true, // only use cookie over https
        ephemeral: false, // delete this cookie while browser close
        // sameSite : false,
        sameSite : 'none', //prod
        maxAge: 24 * 60 * 60000 // 1 day
    }
}))

module.exports = app