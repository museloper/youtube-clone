import Video from '../models/Video'

const home = async (req, res) => {
  return res.render('home', { title: 'Home' })
}

const search = (req, res) => {}

const getUpload = (req, res) => {
  return res.render('upload', { title: 'Upload Video' })
}

const postUpload = (req, res) => {
  const { title } = req.body
  return res.redirect('/')
}

const watch = (req, res) => {
  const { id } = req.params
  return res.render('watch', { title: `Watch` })
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
