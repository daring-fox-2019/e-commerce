const route = require('express').Router()
const ControllerUser = require('../controllers/user')
const { authenticate, authorize } = require('../middlewares/auth')

route.post('/register', ControllerUser.create)
route.post('/login', ControllerUser.login)

route.get('/', ControllerUser.findAll)

route.use('/:userId', authenticate)
route.get('/:userId', ControllerUser.findOne)
route.put('/:userId', ControllerUser.update)
route.delete('/:userId', ControllerUser.delete)

module.exports = route