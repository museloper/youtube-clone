import express from 'express'
import ip from 'ip'

const PORT = 4000
const IP = ip.address()

const app = express()

app.get('/', () => console.log('Somebody is trying to go root.'))

app.listen(PORT, () =>
  console.log(`
  Server running at:
  - local:   http://localhost:${PORT}/
  - Network: http://${IP}:${PORT}/
  `)
)
