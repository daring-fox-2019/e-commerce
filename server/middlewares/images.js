'use strict'
require('dotenv').config()

const Storage = require('@google-cloud/storage')

const CLOUD_BUCKET = process.env.CLOUD_BUCKET

const storage = Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.KEYFILE_PATH
})
const bucket = storage.bucket(CLOUD_BUCKET)

const getPublicUrl = (filename) => {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}

const sendUploadToGCS = (req, res, next) => {
  // console.log({body: req.files})
  if (req.files.length < 1) {
    // return next()
  }
  req.cloudStoragePublicUrl = [];
  let files = req.files;
  for (let i in req.files) {
    const gcsname = Date.now() + files[i].originalname
    const file = bucket.file(gcsname)

    const stream = file.createWriteStream({
      metadata: {
        contentType: files[i].mimetype
      }
    })

    stream.on('error', (err) => {
      files[i].cloudStorageError = err
      next(err)
    })

    stream.on('finish', () => {
      files[i].cloudStorageObject = gcsname
      file.makePublic().then(() => {
        req.cloudStoragePublicUrl.push(getPublicUrl(gcsname));
        if (req.cloudStoragePublicUrl.length == req.files.length) {
          next()
        }
      })
    })
    stream.end(files[i].buffer)
  }
}

const Multer = require('multer'),
  multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
      fileSize: 5 * 1024 * 1024
    }
    // dest: '../images'
  })

module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  multer
}