const router = require('express').Router()
const conProducts = require('../controller/products')
const auth = require('../middlewares/auth')
const uploadImage = require('../middlewares/uploadImage')

router.use(auth.Authenticate)
router.post('/', uploadImage, conProducts.addNewProduct)
router.get('/', conProducts.showAllProducts)
router.put('/:id', auth.Authorize.updateProduct, uploadImage, conProducts.updateProduct)
router.delete('/:id', auth.Authorize.deleteProduct, conProducts.deleteProduct)
router.patch('/:id', conProducts.reduceStock)

module.exports = router