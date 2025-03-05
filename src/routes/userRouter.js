import express from 'express'

import {
  getEdit,
  postEdit,
  getChangePassword,
  postChangePassword,
  redirectGithubLogin,
  handleGithubLogin,
  view,
} from '../controllers/userController'

import {
  loggedInOnlyMiddleware,
  publicOnlyMiddleware,
  avatarUpload,
} from '../middlewares'

const ur = express.Router()

ur.route('/edit')
  .all(loggedInOnlyMiddleware)
  .get(getEdit)
  .post(avatarUpload.single('avatar'), postEdit)
ur.route('/change-password')
  .all(loggedInOnlyMiddleware)
  .get(getChangePassword)
  .post(postChangePassword)
ur.get('/github/open', publicOnlyMiddleware, redirectGithubLogin)
ur.get('/github/callback', publicOnlyMiddleware, handleGithubLogin)
ur.get('/:id', view)

export default ur
