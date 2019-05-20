const route = require('express').Router()
const Product = require('./product')
const User = require('./user')
const Cart = require('./cart')

route.use('/product',Product)
route.use('/user', User)
route.use('/cart', Cart)

module.exports = route