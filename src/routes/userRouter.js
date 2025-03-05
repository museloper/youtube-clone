import express from 'express'

import {
  getEdit,
  postEdit,
  getChangePassword,
  postChangePassword,
  redirectGithubLogin,
  handleGithubLogin,
} from '../controllers/userController'

import { loggedInOnlyMiddleware, publicOnlyMiddleware } from '../middlewares'

const ur = express.Router()

ur.route('/edit').all(loggedInOnlyMiddleware).get(getEdit).post(postEdit)
ur.route('/change-password')
  .all(loggedInOnlyMiddleware)
  .get(getChangePassword)
  .post(postChangePassword)
ur.get('/github/open', publicOnlyMiddleware, redirectGithubLogin)
ur.get('/github/callback', publicOnlyMiddleware, handleGithubLogin)

export default ur
