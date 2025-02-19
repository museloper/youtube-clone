import express from 'express'

import users from './user_router'
import videos from './video_router'

import { join, login, logout } from '../controllers/user_controller'
import { trending } from '../controllers/video_controller'

const router = express.Router()

router.get('/', trending)
router.get('/join', join)
router.get('/login', login)
router.get('/logout', logout)

router.use('/users', users)
router.use('/videos', videos)

export default router
