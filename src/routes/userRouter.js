import express from 'express'
import {
  view,
  edit,
  redirectGithubLogin,
  handleGithubLogin,
} from '../controllers/userController'

const ur = express.Router()

ur.get('/:id(\\d+)', view)
ur.get('/edit', edit)
ur.get('/github/open', redirectGithubLogin)
ur.get('/github/callback', handleGithubLogin)

export default ur
