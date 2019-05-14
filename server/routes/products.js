const route = require('express').Router()
const ProductController = require('../controllers/productsController')
const authenticate = require('../middlewares/authenticate')

route.use('/', authenticate)

route.get('/', ProductController.findAll)
route.get('/:id', ProductController.findOne)
route.post('/', ProductController.create)
route.put('/:id', ProductController.update)
route.patch('/:id', ProductController.update)
route.delete('/:id', ProductController.delete)

module.exports = route