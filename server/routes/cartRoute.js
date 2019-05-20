const router = require('express').Router()
const authentication = require('../middlewares/authentication')
const cartController = require('../controllers/cartController')

router.get('/',cartController.getAll)
router.post('/',cartController.create)
router.post('/:productid/:userid',cartController.addToCart)
router.get('/:userid',cartController.getUserCart)
router.patch('/:cartid',cartController.resetCart)
router.patch('/:cartid/:productid',cartController.removeItem)
module.exports = router