import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'

import router from './routes/index'

// Load environment variables
dotenv.config()

const app = express()
const logger = morgan('dev')

const PORT = process.env.PORT

app.use(logger)
app.use('/', router)

const init_server = () =>
  console.log(`✅ Server is running on http://localhost:${PORT}`)

app.listen(PORT, init_server)
