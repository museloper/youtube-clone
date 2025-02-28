import './db'

// models
import './models/Video'
import './models/User'

import app from './server'

import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const PORT = process.env.PORT

app.listen(PORT, () =>
  console.log(`✅ Server is running on http://localhost:${PORT}`)
)
