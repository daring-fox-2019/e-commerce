const route = require('express').Router()
const routeUser = require('./user')
const routeProduct = require('./product')
const routeCart = require('./cart')
const routeTransaction = require('./transaction')
const images = require('../middlewares/images')

route.get('/', (req, res) => {res.status(200).json({page: 'Home', project: 'E-Commerce'})})

route.use('/users', routeUser)
route.use('/products', routeProduct)
route.use('/carts', routeCart)
route.use('/transactions', routeTransaction)
route.post('/testUpload', images.multer.any('image', 4), images.sendUploadToGCS, (req, res) => {
    console.log(req.cloudStoragePublicUrl)
    res.send({
      status: 200,
      message: 'Your file is successfully uploaded',
      link: req.cloudStoragePublicUrl
    })
  })

route.use('/*', (req, res) => res.status(404).json({message: 'Not Found :('}))

module.exports = route