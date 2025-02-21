import express from 'express'
import {
  view,
  getUpload,
  postUpload,
  getEdit,
  postEdit,
  getDelete,
} from '../controllers/videoController'

const vr = express.Router()

vr.route('/upload').get(getUpload).post(postUpload)
vr.get('/:id([0-9a-f]{24})', view)
vr.route('/:id([0-9a-f]{24})/edit').get(getEdit).post(postEdit)
vr.route('/:id([0-9a-f]{24})/delete').get(getDelete)

export default vr
