import express from 'express'
import path from 'path'
import morgan from 'morgan'
import session from 'express-session'
import flash from 'express-flash'
import MongoStore from 'connect-mongo'

import router from './routes/index'

import { localsMiddleware } from './middlewares'

const app = express()
const logger = morgan('dev')

app.locals.basedir = path.join(process.cwd(), 'src', 'views')

app.set('view engine', 'pug')
app.set('views', path.join(process.cwd(), 'src', 'views'))
app.use(logger)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
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
app.use(flash())
app.use(localsMiddleware)
app.use('/uploads', express.static('uploads'))
app.use('/assets', express.static('assets'))
app.use('/', router)

export default app
