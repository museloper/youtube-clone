import bcrypt from 'bcrypt'
import fetch from 'node-fetch'

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

  const user = await User.findOne({ username, socialOnly: false })
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
  req.session.destroy()
  res.redirect('/')
}

const view = (req, res) => {
  res.send('this is the user-view page')
}

const edit = (req, res) => {
  res.send('this is the user-edit page')
}

const redirectGithubLogin = (req, res) => {
  const config = {
    client_id: process.env.GITHUB_CLIENT_ID,
    allow_signup: false,
    scope: 'read:user user:email',
  }

  const params = new URLSearchParams(config).toString()

  const url = `https://github.com/login/oauth/authorize?${params}`

  return res.redirect(url)
}

const handleGithubLogin = async (req, res) => {
  const config = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code: req.query.code,
  }

  const params = new URLSearchParams(config).toString()

  const url = `https://github.com/login/oauth/access_token?${params}`

  const accessToken = await (
    await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    })
  ).json()

  if ('access_token' in accessToken) {
    const { access_token } = accessToken

    const apiUrl = 'https://api.github.com'

    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json()

    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json()

    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    )

    if (!emailObj) {
      return res.redirect('/login')
    }

    let user = await User.findOne({ email: emailObj.email })

    if (!user) {
      user = await User.create({
        email: emailObj.email,
        avatarUrl: userData.avatar_url,
        username: userData.login,
        password: '',
        name: userData.name,
        location: userData.location,
        socialOnly: true,
      })
    }

    req.session.loggedIn = true
    req.session.user = user
    return res.redirect('/')
  } else {
    return res.redirect('/login')
  }
}

export {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
  view,
  edit,
  redirectGithubLogin,
  handleGithubLogin,
}
