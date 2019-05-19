const route = require('express').Router()
const CartController = require('../controllers/CartController')
const Authentication = require('../middlewares/Authentication')
const Authorization = require('../middlewares/Authorization')

// AUTHENTICATION
route.use(Authentication)

// CREATE
route.post('/', CartController.create)

// READ
route.get('/:id', CartController.findOne)
route.get('/', CartController.findAll)

// UPDATE
route.patch('/:id', Authorization, CartController.update)

// DELETE
route.delete('/:id', Authorization, CartController.delete)

module.exports = route