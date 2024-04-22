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

const upload = (req, res) => {}

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

export { trending, search, upload, watch, getEdit, postEdit, remove }
