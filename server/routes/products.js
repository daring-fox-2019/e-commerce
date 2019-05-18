const route = require('express').Router()
const ProductController = require('../controllers/productsController')
const authenticate = require('../middlewares/authenticate')
const {multer, sendUploadToGCS} = require('../helpers/images')

route.use('/', authenticate)

route.get('/', ProductController.findAll)
route.get('/:id',ProductController.findOne)
route.post('/',  multer.single('image'), sendUploadToGCS,  ProductController.create)
route.put('/:id', ProductController.update)
route.patch('/:id', ProductController.update)
route.delete('/:id', ProductController.delete)

module.exports = route