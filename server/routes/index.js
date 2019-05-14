const router = require('express').Router()
const user = require('./user')
const product = require('./product')
const cart = require('./cart')

router.use('/user', user)
router.use('/products', product)
router.use('/cart', cart)

module.exports = router
