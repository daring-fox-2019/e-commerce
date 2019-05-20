const router = require('express').Router()
const user = require('./user')
const product = require('./product')
const category = require('./category')
const cart = require('./cart')
const transaction = require('./transaction')

router.get('/', (req, res) => {
    res.status(200).json({msg : 'connected!'})
})

router.use('/users', user)
router.use('/products', product)
router.use('/categories', category)
router.use('/carts', cart)
router.use('/transactions', transaction)

module.exports = router