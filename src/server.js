import express from 'express'
import ip from 'ip'

const PORT = 4000
const IP = ip.address()

const app = express()

// S: 미들웨어
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
}
// E: 미들웨어

app.use(logger)

app.get('/', (req, res) => {
  return res.send('Hello, world!')
})

app.listen(PORT, () =>
  console.log(`
  Server running at:
  - local:   http://localhost:${PORT}/
  - Network: http://${IP}:${PORT}/
  `)
)
