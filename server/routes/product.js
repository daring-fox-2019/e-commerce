const router = require('express').Router();
const ProductController = require('../controllers/product');
const { multer, sendUploadToGCS } = require('../helpers');
const { 
    authentication,
    productAuthorization
} = require('../middlewares/auth');

router.get('/', ProductController.listProduct);

router.use(authentication, productAuthorization);

router.post('/', multer.single('image'), sendUploadToGCS, ProductController.addProduct);
router.patch('/:id', multer.single('image'), sendUploadToGCS, ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;