const route = require('express').Router()
const routeUser = require('./user')
const routeProduct = require('./product')

route.get('/', (req, res) => {res.status(200).json({page: 'Home', project: 'E-Commerce'})})

route.use('/users', routeUser)
route.use('/products', routeProduct)

route.use('/*', (req, res) => res.status(404).json({message: 'Not Found :('}))

module.exports = route