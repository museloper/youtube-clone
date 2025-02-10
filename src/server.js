import dotenv from 'dotenv'
import express from 'express'

// Load environment variables
dotenv.config()

const app = express()

const PORT = process.env.PORT

app.get('/', (req, res) => {
  res.send('this is the home page')
})

const init_server = () =>
  console.log(`✅ Server is running on http://localhost:${PORT}`)

app.listen(PORT, init_server)
