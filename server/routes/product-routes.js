const router = require('express').Router()
const productController = require('../controllers/product-controller.js')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/', authentication, productController.create)
router.get('/', authentication, productController.showAll)
router.get('/:id', authentication, productController.showOne)
router.delete('/:id', authentication, authorization, productController.delete)
router.patch('/:id', authentication, authorization, productController.update)

module.exports = router