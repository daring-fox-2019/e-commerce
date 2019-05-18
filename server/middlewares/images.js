'use strict'
require('dotenv').config()
const Storage = require('@google-cloud/storage')
const CLOUD_BUCKET = process.env.CLOUD_BUCKET

const storage = Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.KEYFILE_PATH
})
const bucket = storage.bucket(CLOUD_BUCKET)
console.log('masuk google cloud bucket');

const sendUploadToGCS = async (req, res, next) => {
  const bucket = storage.bucket(CLOUD_BUCKET)
  let promises = []
  if (!req.files) {
    next()
  } else {
    
      for (let i = 0; i < req.files.length; i++) {
        console.log(req.files[i], '=====', i);
    
        const gcsname = Date.now() + req.files[i].originalname
        const file = bucket.file(gcsname)
    
        console.log(file, 'apa it filllee');
    
        const newPromise = new Promise((resolve, reject) => {
          file.createWriteStream({
              metadata: {
                contentType: file.mimetype
              }
            })
            .on('finish', async response => {
              req.files[i].cloudStorageObject = gcsname
              console.log(gcsname, 'sumpah ya');
    
              await file.makePublic()
                .then(async () => {
                  req.files[i].cloudStoragePublicUrl = await getPublicUrl(gcsname)
                })
              resolve(response)
              console.log(response, 'kepana undefined tolong');
            }).on('error', err => {
              reject(err)
            }).end(req.files[i].buffer)
        })
        promises.push(newPromise)
        console.log(promises, 'URL/??!!!!!!????');
      }
    
      await Promise.all(promises).then((data) => {
          next()
        })
        .catch((err) => {
          res.status(500).json(err)
        });

  }
}


const getPublicUrl = (filename) => {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}

// const sendUploadToGCS = (filext) => {
//   if (!req.file) {      
//     return next()
//   }

//   const gcsname = Date.now() + req.file.originalname
//   const file = bucket.file(gcsname)

//   const stream = file.createWriteStream({
//     metadata: {
//       contentType: req.file.mimetype
//     }
//   })

//   stream.on('error', (err) => {      
//     req.file.cloudStorageError = err
//     next(err)
//   })

//   stream.on('finish', () => {
//     req.file.cloudStorageObject = gcsname
//     file.makePublic().then(() => {
//       req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
//       next()
//     })
//   })

//   stream.end(req.file.buffer)
// }

const Multer = require('multer'),
  multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
      fileSize: 5 * 1024 * 1024
    }
    // dest: '../images'
  })

module.exports = {
  // getPublicUrl,
  sendUploadToGCS,
  multer
}