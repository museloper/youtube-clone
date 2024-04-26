import './db'
import './models/Video'

import ip from 'ip'

import app from './server'

const PORT = 4000
const IP = ip.address()

app.listen(PORT, () =>
  console.log(`

🐉 Server running at:

    - local:   http://localhost:${PORT}/
    - Network: http://${IP}:${PORT}/
  `)
)
