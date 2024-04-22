import express from 'express'
import ip from 'ip'
import morgan from 'morgan'
import globalRouter from './routers/globalRouter'
import videoRouter from './routers/videoRouter'
import userRouter from './routers/userRouter'

const PORT = 4000
const IP = ip.address()

const app = express()
const logger = morgan('dev') // 개발자 레벨 로그

// S: view settings
app.set('views', process.cwd() + '/src/views')
app.set('view engine', 'pug')
// E: view settings

// S: 미들웨어
app.use(logger)
app.use(express.urlencoded({ extended: true })) // available form ⭐
// E: 미들웨어

// S: 라우터
app.use('/', globalRouter)
app.use('/videos', videoRouter)
app.use('/users', userRouter)
// E: 라우터

app.listen(PORT, () =>
  console.log(`
  Server running at:
  - local:   http://localhost:${PORT}/
  - Network: http://${IP}:${PORT}/
  `)
)
