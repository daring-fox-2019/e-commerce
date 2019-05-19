const Router = require('express').Router()
const userController = require('../controllers/userController')

Router.get('/', userController.gets)
Router.delete('/:id', userController.delete)
Router.post('/signup', userController.signup)
Router.post('/login', userController.login)

module.exports = Router