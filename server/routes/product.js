const router = require('express').Router()
const product = require('../controllers/product')
const gcs = require('../helpers/gcs')
const { authentication, authorization } = require('../middleware/auth')

router.get('/', product.findAll)
router.get('/:id', product.findOne)

router.use(authentication)
router.post('/', gcs.multer.single("image"), gcs.sendUploadToGCS, product.create)
router.delete('/:id', product.delete)
router.put('/:id', gcs.multer.single("image"), gcs.sendUploadToGCS, product.update)

module.exports = router