import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import morgan from 'morgan'

import router from './routes/index'

// Load environment variables
dotenv.config()

const app = express()
const logger = morgan('dev')

const PORT = process.env.PORT

app.locals.basedir = path.join(__dirname, 'views')

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(logger)
app.use(express.urlencoded({ extended: true }))
app.use('/', router)

const init_server = () =>
  console.log(`✅ Server is running on http://localhost:${PORT}`)

app.listen(PORT, init_server)
