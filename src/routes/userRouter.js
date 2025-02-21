import express from 'express'
import { view, edit, remove } from '../controllers/userController'

const ur = express.Router()

ur.get('/:id(\\d+)', view)
ur.get('/edit', edit)
ur.get('/remove', remove)

export default ur
