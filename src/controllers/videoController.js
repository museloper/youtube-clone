import User from '../models/User'
import Video from '../models/Video'
import Comment from '../models/Comment'

import { deleteObject } from '../middlewares'

const home = async (req, res) => {
  try {
    const videos = await Video.find({})
      .sort({ createdAt: 'desc' })
      .populate('owner')
    return res.render('home', { title: 'Home', videos })
  } catch (err) {
    console.error(err)
    return res.status(500).render('error/500', { title: 'Server Error', err })
  }
}

const search = async (req, res) => {
  const { keyword } = req.query
  let videos = []
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, 'i'),
      },
    }).populate('owner')
  }
  return res.render('video/search', { title: 'Search', videos })
}

const getUpload = (req, res) => {
  return res.render('video/upload', { title: 'Upload Video' })
}

const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session
  const { title, description, hashtags } = req.body
  const { video, thumbnail } = req.files

  try {
    const newVideo = await Video.create({
      title,
      description,
      videoUrl: video[0].location,
      thumbnailUrl: thumbnail[0].location,
      hashtags: Video.formatHashtags(hashtags),
      owner: _id,
    })
    const user = await User.findById(_id)
    user.videos.push(newVideo._id)
    user.save()
    return res.redirect('/')
  } catch (err) {
    console.error(err)
    req.flash('error', err._message)
    return res.status(400).render('video/upload', {
      title: 'Upload Video',
    })
  }
}

const view = async (req, res) => {
  const { id } = req.params

  const video = await Video.findById(id)
    .populate('owner')
    .populate({
      path: 'comments',
      options: { sort: { createdAt: -1 } },
    })

  if (!video) {
    return res.status(404).render('error/404', { title: 'Video not found' })
  }

  return res.render('video/view', { title: video.title, video })
}

const getEdit = async (req, res) => {
  const {
    user: { _id },
  } = req.session
  const { id } = req.params

  const video = await Video.findById(id)

  if (!video) {
    return res.status(404).render('error/404', { title: 'Video not found' })
  }

  if (String(video.owner) !== String(_id)) {
    return res.status(403).render('error/403', { title: 'Permission Denied' })
  }

  return res.render('video/edit', { title: `Editing ${video.title}`, video })
}

const postEdit = async (req, res) => {
  const {
    user: { _id },
  } = req.session
  const { id } = req.params
  const { title, description, hashtags } = req.body

  const video = await Video.exists({ _id: id })

  if (!video) {
    return res.status(404).render('error/404', { title: 'Video not found' })
  }

  if (String(video.owner) !== String(_id)) {
    return res.status(403).render('error/403', { title: 'Permission Denied' })
  }

  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  })

  return res.redirect(`/videos/${id}`)
}

const getDelete = async (req, res) => {
  const {
    user: { _id },
  } = req.session
  const { id } = req.params

  const video = await Video.findById(id)

  if (!video) {
    return res.status(404).render('error/404', { title: 'Video not found' })
  }

  if (String(video.owner) !== String(_id)) {
    return res.status(403).render('error/403', { title: 'Permission Denied' })
  }

  try {
    await Video.findByIdAndDelete(id)
    await deleteObject(video.videoUrl)
  } catch {
    return res.status(403).render('error/500', { title: '' })
  }

  return res.redirect('/')
}

const increaseView = async (req, res) => {
  const { id } = req.params

  const video = await Video.findById(id)

  if (!video) {
    return res.sendStatus(404)
  }

  video.meta.views += 1
  await video.save()

  return res.sendStatus(200)
}

const createComment = async (req, res) => {
  const {
    params: { id },
    body: { text },
    session: { user },
  } = req

  const video = await Video.findById(id)

  if (!video) {
    return res.sendStatus(404)
  }

  const comment = await Comment.create({
    text,
    video: id,
    owner: user._id,
  })

  video.comments.push(comment._id)
  video.save()

  return res.status(201).json({ newCommentId: comment._id })
}

const deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id)
    return res.sendStatus(200)
  } catch {
    return res.sendStatus(500)
  }
}

export {
  home,
  search,
  getUpload,
  postUpload,
  view,
  getEdit,
  postEdit,
  getDelete,
  increaseView,
  createComment,
  deleteComment,
}
