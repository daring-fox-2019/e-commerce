const router = require('express').Router();
const productRouter = require('./product')
const userRouter = require('./user')
const cartRouter = require('./cart')
const authRouter = require('./auth')
const product = require('../controller/product')
const {authorize} = require('../middlewares')

router.use('/auth',authRouter)
router.get('/product-home',product.GetProductHome)

router.use(authorize)
router.use('/product',productRouter)
router.use('/cart',cartRouter)
router.use('/user',userRouter)

module.exports = router