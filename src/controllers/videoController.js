import Video from '../models/Video'

const home = async (req, res) => {
  const videos = await Video.find({})
  return res.render('home', { title: 'Home', videos })
}

const search = (req, res) => {}

const getUpload = (req, res) => {
  return res.render('upload', { title: 'Upload Video' })
}

const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body
  try {
    await Video.create({
      title,
      description,
      hashtags: hashtags.split(',').map((word) => `#${word}`),
    })
    return res.redirect('/')
  } catch (err) {
    return res.render('upload', {
      title: 'Upload Video',
      errMessage: err._message,
    })
  }
}

const watch = async (req, res) => {
  const { id } = req.params
  const video = await Video.findById(id)
  return res.render('watch', { title: `Watch`, video })
}

const getEdit = (req, res) => {
  const { id } = req.params
  return res.render('edit', { title: `Editing` })
}

const postEdit = (req, res) => {
  const { id } = req.params
  const { title } = req.body
  return res.redirect(`/videos/${id}`)
}

const remove = (req, res) => {}

export { home, search, getUpload, postUpload, watch, getEdit, postEdit, remove }
