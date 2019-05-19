const router = require('express').Router()
const cart = require('../controllers/cart')
const {authentication, authorizationCard} = require('../middleware/auth')

router.use(authentication)
router.get('/', cart.findCart)
router.post('/', cart.create)

router.delete('/:id', authorizationCard, cart.delete)
router.put('/:id', authorizationCard, cart.update)

module.exports = router