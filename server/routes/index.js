const router = require('express').Router()
const userRouter = require('./user')
const productRouter = require('./product')
const transactionRouter = require('./transaction')
const imageRouter = require('./image')

router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/transactions', transactionRouter)
router.use('/images', imageRouter)

router.get('/*', (req,res) => {
    console.log(req.body, '----body')
    console.log(req.headers, ' ----headers')
    res.status(404).json('not found')
})

module.exports = router