import express from 'express'

import users from './userRouter'
import videos from './videoRouter'

import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
} from '../controllers/userController'
import { home, search } from '../controllers/videoController'

const router = express.Router()

// root-router
router.get('/', home)
router.get('/search', search)
router.route('/join').get(getJoin).post(postJoin)
router.route('/login').get(getLogin).post(postLogin)
router.get('/logout', logout)

// sub-routers
router.use('/users', users)
router.use('/videos', videos)

export default router
