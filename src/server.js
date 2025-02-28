import express from 'express'
import path from 'path'
import morgan from 'morgan'
import session from 'express-session'

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
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
)
app.use(localsMiddleware)
app.use('/', router)

export default app
