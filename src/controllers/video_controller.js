const trending = (req, res) => {
  res.send('this is the home page')
}

const search = (req, res) => {
  res.send('this is the search page')
}

const upload = (req, res) => {
  res.send('this is the video-upload page')
}

const view = (req, res) => {
  res.send('this is the video-view page')
}

const edit = (req, res) => {
  res.send('this is the video-edit page')
}

const remove = (req, res) => {
  res.send('this is the video-remove page')
}

export { trending, search, upload, view, edit, remove }
