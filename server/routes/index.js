const router = require('express').Router()
const user = require('./user')
const product = require('./product')
const cart = require('./cart')
const transaction = require('./transaction')
const rajaongkir = require('./rajaongkir')

router.use('/user', user)
router.use('/products', product)
router.use('/cart', cart)
router.use('/transaction', transaction)
router.use('/rajaongkir', rajaongkir)

module.exports = router
