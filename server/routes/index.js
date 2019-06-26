const routes = require('express').Router()

routes.use('/auth', require('./auth'))
routes.use('/users', require('./users'))
routes.use('/items', require('./items'))
routes.use('/cart', require('./cart'))
routes.use('/transactions', require('./transactions'))

module.exports = routes
