import mongoose from 'mongoose'

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxLength: 80 },
  description: { type: String, required: true, trim: true, minLength: 10 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  videoUrl: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  meta: {
    views: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0 },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'User' },
  comments: [
    { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'Comment' },
  ],
})

videoSchema.static('formatHashtags', (hashtags) => {
  return hashtags
    .split(',')
    .map((word) => (word.startsWith('#') ? word.trim() : `#${word.trim()}`))
})

const Video = mongoose.model('Video', videoSchema)

export default Video
