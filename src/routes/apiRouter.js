import express from 'express'

import {
  increaseView,
  createComment,
  deleteComment,
} from '../controllers/videoController'

const ar = express.Router()

ar.post('/videos/:id([0-9a-f]{24})/view', increaseView)
ar.post('/videos/:id([0-9a-f]{24})/comment', createComment)
ar.delete('/comments/:id', deleteComment)

export default ar
