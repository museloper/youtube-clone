import express from 'express'
import ip from 'ip'
import morgan from 'morgan'

const PORT = 4000
const IP = ip.address()

const app = express()
const logger = morgan('dev') // 개발자 레벨 로그

// S: 미들웨어
app.use(logger)
// E: 미들웨어

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
