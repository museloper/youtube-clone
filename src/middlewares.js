const localsMiddleware = (req, res, next) => {
  res.locals.siteName = 'Youtube'
  res.locals.loggedIn = Boolean(req.session.loggedIn)
  res.locals.loggedInUser = req.session.user || {}
  next()
}

const loggedInOnlyMiddleware = (req, res, next) => {
  req.session.loggedIn ? next() : res.redirect('/login')
}

const publicOnlyMiddleware = (req, res, next) => {
  !req.session.loggedIn ? next() : res.redirect('/')
}

export { localsMiddleware, loggedInOnlyMiddleware, publicOnlyMiddleware }
