const router = require('express').Router()
const conCarts = require('../controller/carts')
const auth = require('../middlewares/auth')

router.use(auth.Authenticate)
router.get('/admin', auth.Authorize.admin, conCarts.showAllCarts)
router.post('/add', conCarts.addNewCart)
router.get('/', conCarts.showCarts)
router.delete('/delete/:id', auth.Authorize.deleteCart, conCarts.deleteCart)
router.put('/update/:id', auth.Authorize.updateCart, conCarts.updateCart)
router.patch('/update/:id', auth.Authorize.updateCart, conCarts.checkoutCart)
router.get('/delivery', conCarts.getDeliveryStatus)
router.patch('/delivery/:id', conCarts.deliveredCart)

module.exports = router