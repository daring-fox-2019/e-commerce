const router = require('express').Router()
const userRoute = require('./userRoute')
const productRoute = require('./productRoute')
const UserController=require('../controllers/userController')
const CartRoute = require('../routes/cartRoute')

router.use('/users',userRoute)
router.use('/products',productRoute)
router.use('/carts',CartRoute)
router.post('/login',UserController.login)
router.post('/register',UserController.register)

module.exports = router