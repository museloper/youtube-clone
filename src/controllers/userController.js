const join = (req, res) => {
  res.send('this is the join page')
}

const login = (req, res) => {
  res.send('this is the login page')
}

const logout = (req, res) => {
  res.send('this is the logout page')
}

const view = (req, res) => {
  res.send('this is the user-view page')
}

const edit = (req, res) => {
  res.send('this is the user-edit page')
}

const remove = (req, res) => {
  res.send('this is the user-remove page')
}

export { join, login, logout, view, edit, remove }
