const route = require('express').Router()
const product = require('./products')
const auth = require('./auth')

route.use('/products', product)
route.use('/auth', auth)

module.exports = route