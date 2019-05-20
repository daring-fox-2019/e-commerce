const route = require('express').Router()
const UserController = require('../controllers/UserController')
const Authentication = require('../middlewares/Authentication')

// CREATE
route.post('/register', UserController.register)

// LOGIN
route.post('/login', UserController.login)
// READ
route.get('/token', Authentication, UserController.findByToken)
route.get('/', UserController.findAll)

route.get('/:id', UserController.findOne)


module.exports = route