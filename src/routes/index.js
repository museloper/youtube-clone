import express from 'express'

import users from './userRouter'
import videos from './videoRouter'

import { join, login, logout } from '../controllers/userController'
import { home, search } from '../controllers/videoController'

const router = express.Router()

router.get('/', home)
router.get('/search', search)
router.get('/join', join)
router.get('/login', login)
router.get('/logout', logout)

router.use('/users', users)
router.use('/videos', videos)

export default router
