import bcrypt from 'bcrypt'
import fetch from 'node-fetch'

import User from '../models/User'
import Video from '../models/Video'

const getJoin = (req, res) => {
  return res.render('user/join', { title: 'Join' })
}

const postJoin = async (req, res) => {
  const title = 'Join'
  const { email, username, password, password2, name, location } = req.body

  if (password !== password2) {
    req.flash('error', 'Password confirmation does not match.')
    return res.status(400).render('user/join', {
      title,
    })
  }

  const exists = await User.exists({ $or: [{ email }, { username }] })
  if (exists) {
    req.flash('error', 'This email/username is already taken.')
    return res.status(400).render('user/join', {
      title,
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
    req.flash('error', err._message)
    return res.status(400).render('user/join', {
      title: 'Join',
    })
  }
}

const getLogin = (req, res) => {
  return res.render('user/login', { title: 'Login' })
}

const postLogin = async (req, res) => {
  const title = 'Login'
  const { username, password } = req.body

  const user = await User.findOne({ username, socialOnly: false })
  if (!user) {
    req.flash('error', 'An account with this username does not exists.')
    return res.status(400).render('user/login', {
      title,
    })
  }

  const ok = await bcrypt.compare(password, user.password)
  if (!ok) {
    req.flash('error', 'Wrong password.')
    return res.status(400).render('user/login', {
      title,
    })
  }

  req.session.loggedIn = true
  req.session.user = user

  return res.redirect('/')
}

const logout = (req, res) => {
  req.session.destroy()
  return res.redirect('/')
}

const getEdit = (req, res) => {
  return res.render('user/edit-profile', { title: 'Edit Profile' })
}

const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl },
    },
    body: { email, username, name, location },
    file,
  } = req

  const user = await User.findById(_id)

  if (user.email !== email) {
    const exists = await User.exists({ email })
    if (exists) {
      req.flash('error', 'An account with this email already exists.')
      return res.status(400).render('user/edit-profile', {
        title: 'Edit Profile',
      })
    }
  }

  if (user.username !== username) {
    const exists = await User.exists({ username })
    if (exists) {
      req.flash('error', 'An account with this username already exists.')
      return res.status(400).render('user/edit-profile', {
        title: 'Edit Profile',
      })
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? file.location : avatarUrl,
      email,
      username,
      name,
      location,
    },
    { new: true }
  )
  req.session.user = updatedUser
  return res.redirect('/users/edit')
}

const getChangePassword = (req, res) => {
  return res.render('user/change-password', { title: 'Change Password' })
}

const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { oldPassword, newPassword, newPassword2 },
  } = req

  const user = await User.findById(_id)

  if (newPassword !== newPassword2) {
    req.flash('error', 'Password confirmation does not match.')
    return res.status(400).render('user/change-password', {
      title: 'Change Password',
    })
  }

  const ok = await bcrypt.compare(oldPassword, user.password)
  if (!ok) {
    req.flash('error', 'The current password is incorrect.')
    return res.status(400).render('user/change-password', {
      title: 'Change Password',
    })
  }

  user.password = newPassword
  await user.save()

  return res.redirect('/')
}

const view = async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id).populate({
    path: 'videos',
    populate: {
      path: 'owner',
      model: 'User',
    },
  })

  if (!user) {
    return res.status('404').render('404', { title: 'User not found.' })
  }

  return res.render('user/profile', { title: user.name, user })
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
  getEdit,
  postEdit,
  getChangePassword,
  postChangePassword,
  view,
  redirectGithubLogin,
  handleGithubLogin,
}
