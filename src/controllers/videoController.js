const user = {
  username: 'museloper',
  loggedIn: true,
}

const trending = (req, res) => res.render('home', { title: 'Home', user })
const search = (req, res) => {}
const upload = (req, res) => {}
const see = (req, res) => {}
const edit = (req, res) => {}
const remove = (req, res) => {}

export { trending, search, upload, see, edit, remove }
