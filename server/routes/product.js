const route = require('express').Router()
const ControllerProduct = require('../controllers/product')

route.post('/', ControllerProduct.create)
route.get('/', ControllerProduct.findAll)
route.get('/:productId', ControllerProduct.findOne)
route.put('/:productId', ControllerProduct.update)
route.delete('/:productId', ControllerProduct.delete)

module.exports = route