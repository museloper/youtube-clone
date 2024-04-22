const trending = (req, res) => {
  const videos = [
    {
      id: 1,
      title: 'First Video',
      rating: 5,
      comments: 2,
      createdAt: '2 minuate ago',
      views: 50,
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
  return res.render('home', { title: 'Home', videos })
}
const search = (req, res) => {}
const upload = (req, res) => {}
const see = (req, res) => {}
const edit = (req, res) => {}
const remove = (req, res) => {}

export { trending, search, upload, see, edit, remove }
