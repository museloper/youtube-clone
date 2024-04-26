import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: Date,
  hashtags: [{ type: String }],
  meta: {
    views: Number,
    rating: Number,
  },
})

const Video = mongoose.model('Video', schema)

export default Video
