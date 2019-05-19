const route = require('express').Router()
const UserController = require('../controllers/UserController')
const Authentication = require('../middlewares/Authentication')

// READ
route.get('/token', Authentication, UserController.findByToken)
route.get('/', UserController.findAll)

route.get('/:id', UserController.findOne)

// CREATE
route.post('/register', UserController.register)

// LOGIN
route.post('/login', UserController.login)

module.exports = route