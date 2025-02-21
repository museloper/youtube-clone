import express from 'express'
import path from 'path'
import morgan from 'morgan'

import router from './routes/index'

const app = express()
const logger = morgan('dev')

app.locals.basedir = path.join(__dirname, 'views')

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(logger)
app.use(express.urlencoded({ extended: true }))
app.use('/', router)

export default app
