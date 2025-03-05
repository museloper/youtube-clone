import express from 'express'

import {
  view,
  getUpload,
  postUpload,
  getEdit,
  postEdit,
  getDelete,
} from '../controllers/videoController'

import { loggedInOnlyMiddleware } from '../middlewares'

const vr = express.Router()

vr.route('/upload').all(loggedInOnlyMiddleware).get(getUpload).post(postUpload)
vr.get('/:id([0-9a-f]{24})', view)
vr.route('/:id([0-9a-f]{24})/edit')
  .all(loggedInOnlyMiddleware)
  .get(getEdit)
  .post(postEdit)
vr.route('/:id([0-9a-f]{24})/delete').all(loggedInOnlyMiddleware).get(getDelete)

export default vr
