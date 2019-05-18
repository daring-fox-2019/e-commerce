const controller = require('../controllers/user')
const router = require('express').Router()
const { authenticate } = require('../middlewares/auth')
const { check } = require('../middlewares/stock')

    
router.post('/register', controller.register)
router.post('/login', controller.login)

router.use(authenticate)
router.patch('/cart', check, controller.updateCart)



module.exports = router