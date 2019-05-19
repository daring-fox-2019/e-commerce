const router = require('express').Router()
const productController = require('../controllers/product-controller.js')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const multer = require('../middlewares/multer')
const gcsMiddlewares = require('../middlewares/googleCloudStorage')

router.use(authentication)
router.post('/',multer.single('image'), gcsMiddlewares.sendUploadToGCS, productController.create)
router.get('/', productController.showAll)
router.get('/categories/:id', productController.showByCategory)
router.get('/:id', productController.showOne)
router.delete('/:id', authorization, productController.delete)
router.patch('/:id', authorization, multer.single('image'),gcsMiddlewares.sendUploadToGCS, productController.update)

module.exports = router