import multer from 'multer'
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3'
import multerS3 from 'multer-s3'

const BUCKET_NAME = 'youtube-clone-museloper'

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
})

const deleteObject = async (url) => {
  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: decodeURIComponent(url.split('.amazonaws.com/').pop().toString()),
    })
  )
}

const s3AvatarStorage = multerS3({
  s3: s3Client,
  bucket: BUCKET_NAME,
  acl: 'public-read',
  key: (req, file, cb) => {
    cb(null, `avatars/${req.session.user._id}/${Date.now().toString()}`)
  },
})

const s3VideoStorage = multerS3({
  s3: s3Client,
  bucket: BUCKET_NAME,
  acl: 'public-read',
  key: (req, file, cb) => {
    cb(null, `video/${req.session.user._id}/${Date.now().toString()}`)
  },
})

const localsMiddleware = (req, res, next) => {
  const MAX_LENGTH = 32
  const truncateText = (text) => {
    return text.length > MAX_LENGTH ? text.slice(0, MAX_LENGTH) + '...' : text
  }

  const formatTimeAgo = (date) => {
    const now = new Date()
    const past = new Date(date)

    const seconds = Math.floor((now - past) / 1000)

    const units = [
      { name: '년', value: 60 * 60 * 24 * 365 },
      { name: '개월', value: 60 * 60 * 24 * 30 },
      { name: '일', value: 60 * 60 * 24 },
      { name: '시간', value: 60 * 60 },
      { name: '분', value: 60 },
      { name: '초', value: 1 },
    ]

    for (const unit of units) {
      const diff = Math.floor(seconds / unit.value)
      if (diff >= 1) {
        return `${diff}${unit.name} 전`
      }
    }

    return '방금 전'
  }

  res.locals.siteName = 'YouTube'
  res.locals.loggedIn = Boolean(req.session.loggedIn)
  res.locals.loggedInUser = req.session.user || {}
  res.locals.truncateText = truncateText
  res.locals.formatTimeAgo = formatTimeAgo
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
  deleteObject,
  avatarUpload,
  videoUpload,
}
