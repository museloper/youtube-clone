import mongoose from 'mongoose'

mongoose.connect('mongodb://127.0.0.1:27017/notube')

const db = mongoose.connection

db.once('open', () => console.log('🐉 Connected to DB'))
db.on('error', (err) => console.error('❎ DB Error', err))
