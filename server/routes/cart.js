const routes = require('express').Router()

const UserController = require('../controllers/User')
const { loggedIn } = require('../middlewares/auth')
const { isNotSeller } = require('../middlewares/items')

routes.get('/', loggedIn, UserController.getCart)
routes.delete('/', loggedIn, UserController.clearCart)
routes.post('/', loggedIn, UserController.checkoutCart)
routes.put('/:item_id', loggedIn, isNotSeller, UserController.addItem)
routes.delete('/:item_id', loggedIn, UserController.removeItem)

module.exports = routes
