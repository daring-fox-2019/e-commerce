const router = require('express').Router()
const cart = require('../controllers/cart')
const {authentication, authorization} = require('../middleware/auth')

router.use(authentication)
router.get('/', cart.findCart)
router.post('/', cart.create)

router.delete('/:id', authorization, cart.delete)
router.put('/:id', authorization, cart.update)

module.exports = router