const route = require('express').Router()
const product = require('./products')
const auth = require('./auth')
const cart = require('./cart')

route.use('/products', product)
route.use('/auth', auth)
route.use('/cart', cart)

module.exports = route