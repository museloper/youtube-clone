import bcrypt from 'bcrypt'

import User from '../models/User'

const getJoin = (req, res) => {
  res.render('user/join', { title: 'Join' })
}

const postJoin = async (req, res) => {
  const title = 'Join'
  const { email, username, password, password2, name, location } = req.body

  if (password !== password2) {
    return res.status(400).render('user/join', {
      title,
      errorMessage: 'Password confirmation does not match.',
    })
  }

  const exists = await User.exists({ $or: [{ email }, { username }] })
  if (exists) {
    return res.status(400).render('user/join', {
      title,
      errorMessage: 'This email/username is already taken.',
    })
  }

  try {
    await User.create({
      email,
      username,
      password,
      name,
      location,
    })
    return res.redirect('/login')
  } catch (err) {
    console.error(err)
    return res.status(400).render('user/join', {
      title: 'Join',
      errorMessage: err._message,
    })
  }
}

const getLogin = (req, res) => {
  res.render('user/login', { title: 'Login' })
}

const postLogin = async (req, res) => {
  const title = 'Login'
  const { username, password } = req.body

  const user = await User.findOne({ username })
  if (!user) {
    return res.status(400).render('user/login', {
      title,
      errorMessage: 'An account with this username does not exists.',
    })
  }

  const ok = await bcrypt.compare(password, user.password)
  if (!ok) {
    return res.status(400).render('user/login', {
      title,
      errorMessage: 'Wrong password.',
    })
  }

  req.session.loggedIn = true
  req.session.user = user

  res.redirect('/')
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

export { getJoin, postJoin, getLogin, postLogin, logout, view, edit, remove }
