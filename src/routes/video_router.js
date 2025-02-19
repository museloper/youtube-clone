import express from 'express'
import { view, get_edit, post_edit } from '../controllers/video_controller'

const vr = express.Router()

vr.get('/:id(\\d+)', view)
vr.route('/:id(\\d+)/edit').get(get_edit).post(post_edit)

export default vr
