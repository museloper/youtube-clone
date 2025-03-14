import multer from 'multer'

const localsMiddleware = (req, res, next) => {
  res.locals.siteName = 'Youtube'
  res.locals.loggedIn = Boolean(req.session.loggedIn)
  res.locals.loggedInUser = req.session.user || {}
  next()
}

const loggedInOnlyMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next()
  } else {
    req.flash('error', 'Login is required')
    res.redirect('/login')
  }
}

const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    next()
  } else {
    req.flash('error', 'Not authorized')
    res.redirect('/')
  }
}

const avatarUpload = multer({
  dest: 'uploads/avatars/',
  limits: { fileSize: 3000000 },
})
const videoUpload = multer({
  dest: 'uploads/videos/',
  limits: { fileSize: 10000000 },
})

export {
  localsMiddleware,
  loggedInOnlyMiddleware,
  publicOnlyMiddleware,
  avatarUpload,
  videoUpload,
}
