const route = require('express').Router()
const ControllerCart = require('../controllers/cart')
const { authenticate, authorize } = require('../middlewares/auth')

route.use(authenticate)
route.post('/', ControllerCart.create)
route.get('/', ControllerCart.findAll)
route.get('/myCart', ControllerCart.findMy)
route.use('/:cartId', authenticate)
route.get('/:cartId', ControllerCart.findOne)
route.use('/:cartId', authorize)
route.put('/:cartId', ControllerCart.update)
route.delete('/:cartId', ControllerCart.delete)

module.exports = route