const router = require('express').Router();
const product = require('../controller/product')
const { multer, sendUploadToGCS, fromBase64toFile } = require('../helpers/image-utility')
const {authorizeOnProductParam} = require('../middlewares')

router.get('/', product.Get)
router.get('/:id', product.GetOne)
router.post('/',
    fromBase64toFile,
    sendUploadToGCS,
    product.Post)

router.use(authorizeOnProductParam)
router.patch('/:id',
    fromBase64toFile,
    sendUploadToGCS,
    product.Patch)
router.delete('/:id', product.Delete)


module.exports = router