import express from 'express'

import { increaseView } from '../controllers/videoController'

const ar = express.Router()

ar.post('/videos/:id([0-9a-f]{24})/view', increaseView)

export default ar
