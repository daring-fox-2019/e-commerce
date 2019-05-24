const router = require('express').Router()
const cart = require('../controllers/cart')
const {authentication, authorizationCart} = require('../middleware/auth')

router.use(authentication)
router.get('/', cart.findCart)
router.post('/', cart.create)

router.use('/:id', authorizationCart)
router.delete('/:id', cart.delete)
router.put('/:id', cart.update)

module.exports = router