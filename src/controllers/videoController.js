import User from '../models/User'
import Video from '../models/Video'

const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ createdAt: 'desc' })
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
    })
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
  const file = req.file

  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl: file.path,
      hashtags: Video.formatHashtags(hashtags),
      owner: _id,
    })
    const user = await User.findById(_id)
    user.videos.push(newVideo._id)
    user.save()
    return res.redirect('/')
  } catch (err) {
    console.error(err)
    return res.status(400).render('video/upload', {
      title: 'Upload Video',
      errorMessage: err._message,
    })
  }
}

const view = async (req, res) => {
  const { id } = req.params

  const video = await Video.findById(id).populate('owner')

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

  await Video.findByIdAndDelete(id)
  return res.redirect('/')
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
}
