import 'dotenv/config'

import './db'

// models
import './models/Video'
import './models/User'
import './models/Comment'

import app from './server'

const PORT = process.env.PORT

app.listen(PORT, () =>
  console.log(`✅ Server is running on http://localhost:${PORT}`)
)
