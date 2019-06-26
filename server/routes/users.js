const routes = require('express').Router()

const UserController = require('../controllers/User')

routes.get('/:user_id', UserController.findById)

module.exports = routes
