const route = require('express').Router()
const user = require('./user')
const product = require('./product')
const cart = require('./cart')

route.use('/users',user)
route.use('/products',product)
route.use('/cart',cart)

module.exports = route