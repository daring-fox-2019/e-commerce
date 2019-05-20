const router = require('express').Router()
const ProductController = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const upload = require('../helpers/images')

router.get('/',ProductController.getAll)
router.get('/:id',ProductController.getOne)

router.use(authentication)
router.post('/',upload.multer.single('image'),upload.sendUploadToGCS,ProductController.create)
router.patch('/:id',ProductController.update)
router.delete('/:id',ProductController.delete)

module.exports = router