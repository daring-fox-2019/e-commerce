const router = require('express').Router()
const userRouter = require('./user')
const productRouter = require('./product')
const transactionRouter = require('./transaction')

router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/transactions', transactionRouter)

module.exports = router