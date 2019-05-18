const express = require('express');
const router = express.Router();

const ProductController = require('../../controllers/product');
// const Authenticate = require('../../middlewares/authenticate');
// const AuthorizeAuthUser = require('../../middlewares/authorizeAuthUser');
// const upload = require('../../middlewares/upload');

router.get('/', ProductController.findAll);
router.get('/:id', ProductController.findOne);

// router.use(Authenticate);
// router.post('/', ProductController.create);
// router.put('/:id', AuthorizeAuthUser, ProductController.updatePut);
// router.patch('/:id', AuthorizeAuthUser, ProductController.updatePatch);
// router.delete('/:id', AuthorizeAuthUser, ProductController.delete);


module.exports = router;