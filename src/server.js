import express from 'express'
import ip from 'ip'

const app = express()

const PORT = 4000
const IP = ip.address()

app.listen(PORT, () =>
  console.log(`
  Server running at:
  - local:   http://localhost:${PORT}/
  - Network: http://${IP}:${PORT}/
  `)
)
