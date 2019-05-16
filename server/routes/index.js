const route = require('express').Router()
const routeUser = require('./user')
const routeProduct = require('./product')
const routeCart = require('./cart')

route.get('/', (req, res) => {res.status(200).json({page: 'Home', project: 'E-Commerce'})})

route.use('/users', routeUser)
route.use('/products', routeProduct)
route.use('/cart', routeCart)

route.use('/*', (req, res) => res.status(404).json({message: 'Not Found :('}))

module.exports = route