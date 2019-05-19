const router = require('express').Router()
const cartController = require('../controllers/cart-controller.js')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/', authentication, cartController.create)
router.get('/', authentication, cartController.showCart)
router.get('/rajaongkir/province', authentication, cartController.getProvince)
router.get('/rajaongkir/city', authentication, cartController.getCities)
router.post('/rajaongkir/cost', authentication, cartController.getCosts)
router.patch('/:id', authentication, cartController.update)
router.delete('/:id', authentication, cartController.delete)
module.exports = router