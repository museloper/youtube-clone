import mongoose from 'mongoose'

mongoose.connect('mongodb://127.0.0.1:27017/youtube', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('error', (err) => console.error('❌ An error occurred in the DB', err))
db.once('open', () => console.log('✅ Connected to MongoDB'))
