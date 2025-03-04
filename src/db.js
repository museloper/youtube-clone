import mongoose from 'mongoose'

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('error', (err) => console.error('❌ An error occurred in the DB', err))
db.once('open', () => console.log('✅ Connected to MongoDB'))
