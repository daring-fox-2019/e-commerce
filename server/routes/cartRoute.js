const Router = require('express').Router()
const cartController = require('../controllers/cartController')

Router.post('/', cartController.createCart)
Router.get('/', cartController.getCart)
Router.get('/:id', cartController.findMemberCart)
Router.delete('/:id', cartController.deleteCart)

module.exports = Router