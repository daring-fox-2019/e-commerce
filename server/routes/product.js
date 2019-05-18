const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const {isadmin} = require('../middlewares/isadmin')
const {authenticate} = require('../middlewares/authenticate')
const images = require('../middlewares/images')


router.get('/', ProductController.findAll)
router.get('/:id', ProductController.findOne)
router.post('/', authenticate, isadmin, images.multer.array('image'), images.sendUploadToGCS, ProductController.create)
router.delete('/:id', authenticate, isadmin, ProductController.delete)
router.patch('/:id', authenticate, isadmin,  images.multer.array('image'), images.sendUploadToGCS, ProductController.update)

module.exports = router