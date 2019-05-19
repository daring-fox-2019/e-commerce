const express = require('express');
const routes = express.Router();
const ProductController = require('../controllers/ProductController')
const Authentication = require('../middlewares/authentication')

routes.get('/', ProductController.findAll)
routes.get('/category', ProductController.findByCategory)
routes.get('/:id', ProductController.findOne)
routes.post('/', ProductController.create)
routes.put('/:id', ProductController.update)
routes.patch('/:id', ProductController.update)
routes.delete('/:id', ProductController.delete)

module.exports = routes