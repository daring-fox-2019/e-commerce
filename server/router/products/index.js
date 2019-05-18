const express = require('express');
const router = express.Router();

const ProductController = require('../../controllers/product');
const Authenticate = require('../../middlewares/authenticate');
const AuthorizeAdmin = require('../../middlewares/authorizeAdmin');
const upload = require('../../middlewares/upload');

router.get('/', ProductController.findAll);
router.get('/:id', ProductController.findOne);

router.use(Authenticate);
router.use(AuthorizeAdmin);
router.post('/', upload.multer.single('image'), upload.sendUploadToGCS, ProductController.create);
// router.put('/:id', upload.multer.single('image'), upload.sendUploadToGCS, ProductController.updatePut);
// router.patch('/:id', upload.multer.single('image'), upload.sendUploadToGCS, ProductController.updatePatch);
// router.delete('/:id', upload.multer.single('image'), upload.sendUploadToGCS, ProductController.delete);


module.exports = router;