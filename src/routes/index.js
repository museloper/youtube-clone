import express from 'express'

import users from './userRouter'
import videos from './videoRouter'
import api from './apiRouter'

import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
} from '../controllers/userController'
import { home, search } from '../controllers/videoController'

import { loggedInOnlyMiddleware, publicOnlyMiddleware } from '../middlewares'

const router = express.Router()

// root-router
router.get('/', home)
router.get('/search', search)
router.route('/join').all(publicOnlyMiddleware).get(getJoin).post(postJoin)
router.route('/login').all(publicOnlyMiddleware).get(getLogin).post(postLogin)
router.get('/logout', loggedInOnlyMiddleware, logout)

// sub-routers
router.use('/users', users)
router.use('/videos', videos)
router.use('/api', api)

export default router
