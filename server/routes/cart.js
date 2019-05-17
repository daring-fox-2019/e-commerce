const router = require('express').Router()
const CartController = require('../controllers/CartController')
const {authenticate} = require('../middlewares/authenticate')
const {authcart} = require('../middlewares/authcart')

router.post('/', authenticate, CartController.createCart)
router.get('/', authenticate, CartController.findByUser)
router.post('/checkout', authenticate, CartController.checkoutDelete)
router.delete('/:id', authenticate, authcart, CartController.deleteCart)
router.patch('/:id', authenticate, authcart, CartController.updateCartQty)



module.exports = router