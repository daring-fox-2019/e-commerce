const express = require('express');
const router = express.Router();

const ProductController = require('../../controllers/product');


router.get('/', ProductController.findAll);
router.get('/:id', ProductController.findOne);


module.exports = router;