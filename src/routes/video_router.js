import express from 'express'
import { upload, view, edit, remove } from '../controllers/video_controller'

const vr = express.Router()

vr.get('/:id(\\d+)', view)
vr.get('/:id(\\d+)/edit', edit)
vr.get('/:id(\\d+)/remove', remove)
vr.get('/upload', upload)

export default vr
