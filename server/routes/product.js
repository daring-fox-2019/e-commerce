const route = require('express').Router()
const ControllerProduct = require('../controllers/product')
const images = require('../middlewares/images')

route.post('/', /* images.multer.any('image', 4), images.sendUploadToGCS, */ ControllerProduct.create)
route.get('/', ControllerProduct.findAll)
route.get('/:productId', ControllerProduct.findOne)
route.put('/:productId', ControllerProduct.update)
route.delete('/:productId', ControllerProduct.delete)

module.exports = route