const route = require('express').Router()
const ControllerUser = require('../controllers/user')
route.post('/register', ControllerUser.create)
route.post('/login', ControllerUser.login)

route.get('/', ControllerUser.findAll)
route.put('/cart/:productId', ControllerUser.cart)
route.get('/:userId', ControllerUser.findOne)
route.put('/:userId', ControllerUser.update)
route.delete('/:userId', ControllerUser.delete)

module.exports = route