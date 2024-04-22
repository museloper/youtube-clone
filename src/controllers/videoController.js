const trending = (req, res) => {
  const videos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return res.render('home', { title: 'Home', videos })
}
const search = (req, res) => {}
const upload = (req, res) => {}
const see = (req, res) => {}
const edit = (req, res) => {}
const remove = (req, res) => {}

export { trending, search, upload, see, edit, remove }
