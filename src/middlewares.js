import multer from 'multer'
import { S3Client } from '@aws-sdk/client-s3'
import multerS3 from 'multer-s3'

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
})

const s3AvatarStorage = multerS3({
  s3: s3Client,
  bucket: 'youtube-clone-museloper',
  acl: 'public-read',
  key: (req, file, cb) => {
    cb(null, `avatars/${req.session.user._id}/${Date.now().toString()}`)
  },
})

const s3VideoStorage = multerS3({
  s3: s3Client,
  bucket: 'youtube-clone-museloper',
  acl: 'public-read',
  key: (req, file, cb) => {
    cb(null, `video/${req.session.user._id}/${Date.now().toString()}`)
  },
})

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
  limits: { fileSize: 3000000 },
  storage: s3AvatarStorage,
})

const videoUpload = multer({
  limits: { fileSize: 10000000 },
  storage: s3VideoStorage,
})

export {
  localsMiddleware,
  loggedInOnlyMiddleware,
  publicOnlyMiddleware,
  avatarUpload,
  videoUpload,
}
