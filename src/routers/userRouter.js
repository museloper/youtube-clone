import express from 'express'
import { logout, edit, remove, see } from '../controllers/userController'

const userRouter = express.Router()

userRouter.get('/logout', logout)
userRouter.get('/:id(\\d+)', see)
userRouter.get('/edit', edit)
userRouter.get('/remove', remove)

export default userRouter
