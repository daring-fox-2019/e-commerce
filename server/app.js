require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const multerGoogleStorage = require('multer-google-storage')
const cors = require('cors')

const routes = require('./routes')

const app = express()
const PORT = process.env.PORT || 3000
const uploads = multer({
  storage: multerGoogleStorage.storageEngine()
})
// const uploads = process.env.NODE_ENV === 'test'
//   ? multer()
//   : multer({ dest: 'uploads/' })

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })

// app.use(express.static(__dirname))
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', uploads.single('image'), routes)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})

module.exports = app
