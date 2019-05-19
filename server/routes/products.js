const route = require('express').Router()
const ProductController = require('../controllers/productsController')
const authenticate = require('../middlewares/authenticate')
const authorizeProduct = require('../middlewares/authorizeProduct')
const {multer, sendUploadToGCS} = require('../helpers/images')

route.get('/', ProductController.findAll)
route.get('/search/:key', ProductController.search)
route.get('/:id', ProductController.findOne)

route.use('/', authenticate)

route.post('/',  multer.single('image'), sendUploadToGCS,  ProductController.create)
route.put('/:id', authorizeProduct, ProductController.update)
route.patch('/:id', authorizeProduct, ProductController.update)
route.put('/:id/pic', authorizeProduct, multer.single('image'), sendUploadToGCS, ProductController.update)
route.patch('/:id/pic', authorizeProduct, multer.single('image'), sendUploadToGCS, ProductController.update)
route.delete('/:id', authorizeProduct, ProductController.delete)

module.exports = route