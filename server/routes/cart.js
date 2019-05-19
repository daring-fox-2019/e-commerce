const router = require('express').Router()
const cart = require('../controllers/cart')
const {authentication, authorizationCard} = require('../middleware/auth')

router.use(authentication)
router.get('/', cart.findCart)
router.post('/', cart.create)

router.use('/:id', authorizationCard)
router.delete('/:id', cart.delete)
router.put('/:id', cart.update)

module.exports = router