const express = require('express');
const routes = express.Router();
const ProductController = require('../controllers/ProductController')
const Authentication = require('../middlewares/authentication')

routes.get('/', ProductController.findAll)
routes.get('/category', ProductController.findByCategory)
routes.get('/:id', ProductController.findOne)

module.exports = routes