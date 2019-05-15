const router = require('express').Router()
const User = require('./users')
const Product = require('./products')
const Cart = require('./carts')
const Upload = require('./upload')
const Ongkir = require('./rajaongkir')
const Transaction = require('./transactions')

router.use('/users', User)
router.use('/products', Product)
router.use('/carts', Cart)
router.use('/upload', Upload)
router.use('/shipping', Ongkir)
router.use('/transactions', Transaction)


module.exports = router