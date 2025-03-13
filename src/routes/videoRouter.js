import express from 'express'

import {
  view,
  getUpload,
  postUpload,
  getEdit,
  postEdit,
  getDelete,
} from '../controllers/videoController'

import { loggedInOnlyMiddleware, videoUpload } from '../middlewares'

const vr = express.Router()

vr.route('/upload')
  .all(loggedInOnlyMiddleware)
  .get(getUpload)
  .post(
    videoUpload.fields([
      { name: 'video', maxCount: 1 },
      { name: 'thumbnail', maxCount: 1 },
    ]),
    postUpload
  )
vr.get('/:id([0-9a-f]{24})', view)
vr.route('/:id([0-9a-f]{24})/edit')
  .all(loggedInOnlyMiddleware)
  .get(getEdit)
  .post(postEdit)
vr.route('/:id([0-9a-f]{24})/delete').all(loggedInOnlyMiddleware).get(getDelete)

export default vr
