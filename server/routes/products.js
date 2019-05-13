const route = require('express').Router()
const ProductController = require('../controllers/productsController')
const authenticate = require('../middlewares/authenticate')

route.use('/', authenticate)
route.get('/', ProductController.findAll)
route.post('/', ProductController.create)

module.exports = route