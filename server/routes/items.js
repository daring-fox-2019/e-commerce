const routes = require('express').Router()

const ItemController = require('../controllers/Item')
const { loggedIn } = require('../middlewares/auth')
const { isSeller } = require('../middlewares/items')

routes.get('/', ItemController.findAll)
routes.post('/', loggedIn, ItemController.create)

routes.get('/:item_id', ItemController.findById)
routes.put('/:item_id', loggedIn, isSeller, ItemController.update)
routes.delete('/:item_id', loggedIn, isSeller, ItemController.delete)

module.exports = routes
