const videos = [
  {
    title: 'video #1',
    rating: 5,
    comments: 2,
    createdAt: '10 sec ago',
    views: 1,
    id: 1,
  },
  {
    title: 'video #2',
    rating: 5,
    comments: 2,
    createdAt: '10 sec ago',
    views: 100,
    id: 2,
  },
  {
    title: 'video #3',
    rating: 5,
    comments: 2,
    createdAt: '10 sec ago',
    views: 100,
    id: 3,
  },
]

const trending = (req, res) => {
  res.render('home', { title: 'Home', videos })
}

const view = (req, res) => {
  const { id } = req.params
  const video = videos.find((video) => video.id == id)
  res.render('video/view', { title: `Watching ${video.title}`, video })
}

const get_edit = (req, res) => {
  const { id } = req.params
  const video = videos.find((video) => video.id == id)
  res.render('video/edit', { title: `Editing ${video.title}`, video })
}

const post_edit = (req, res) => {
  const { id } = req.params
  const { title } = req.body
  const video = videos.find((video) => video.id == id)
  video.title = title
  res.redirect(`/videos/${id}`)
}

export { trending, view, get_edit, post_edit }
