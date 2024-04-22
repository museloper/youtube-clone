let videos = [
  {
    id: 1,
    title: 'First Video',
    rating: 5,
    comments: 2,
    createdAt: '2 minuate ago',
    views: 1,
  },
  {
    id: 2,
    title: 'Second Video',
    rating: 5,
    comments: 2,
    createdAt: '2 minuate ago',
    views: 50,
  },
  {
    id: 3,
    title: 'Third Video',
    rating: 5,
    comments: 2,
    createdAt: '2 minuate ago',
    views: 50,
  },
]

const trending = (req, res) => {
  return res.render('home', { title: 'Home', videos })
}

const search = (req, res) => {}

const getUpload = (req, res) => {
  return res.render('upload', { title: 'Upload Video' })
}

const postUpload = (req, res) => {
  const { title } = req.body

  const video = {
    id: videos.length + 1,
    title,
    rating: 0,
    comments: 0,
    createdAt: 'just now',
    views: 0,
  }

  videos.push(video)

  return res.redirect('/')
}

const watch = (req, res) => {
  const { id } = req.params
  const video = videos[id - 1]
  return res.render('watch', { title: `Watch ${video.title}`, video })
}

const getEdit = (req, res) => {
  const { id } = req.params
  const video = videos[id - 1]
  return res.render('edit', { title: `Editing ${video.title}`, video })
}

const postEdit = (req, res) => {
  const { id } = req.params
  const { title } = req.body
  videos[id - 1].title = title
  return res.redirect(`/videos/${id}`)
}

const remove = (req, res) => {}

export {
  trending,
  search,
  getUpload,
  postUpload,
  watch,
  getEdit,
  postEdit,
  remove,
}
