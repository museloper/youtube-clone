import express from 'express'
import path from 'path'
import morgan from 'morgan'
import session from 'express-session'
import MongoStore from 'connect-mongo'

import router from './routes/index'

import { localsMiddleware } from './middlewares'

const app = express()
const logger = morgan('dev')

app.locals.basedir = path.join(__dirname, 'views')

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(logger)
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 60 * 1000,
    },
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
)
app.use(localsMiddleware)
app.use('/uploads', express.static('uploads'))
app.use('/assets', express.static('assets'))
app.use('/', router)

export default app
