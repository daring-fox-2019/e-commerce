const router = require('express').Router()
const Cart = require('../../controllers/cart')
const { authenticate, authorizationCart } = require('../../middlewares/auth')

router.post('/',  authenticate,Cart.create)
router.get('/user', authenticate, Cart.getAll )
router.get('/', Cart.getAll )
router.get('/:id', authenticate, Cart.getOne)
router.patch('/:id', authenticate, authorizationCart, Cart.update)
router.delete('/:id', authenticate, authorizationCart, Cart.delete)


module.exports = router