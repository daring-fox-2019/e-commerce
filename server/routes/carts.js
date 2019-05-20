const express = require('express');
const routes = express.Router();
const CartController = require('../controllers/CartController')
const Authentication = require('../middlewares/authentication')

routes.get('/', Authentication, CartController.findAll)
routes.post('/:id', Authentication, CartController.create)
// routes.put('/:id', Authentication, ProductController.update)
// routes.patch('/:id', Authentication, ProductController.update)
routes.delete('/:id', Authentication, CartController.delete)
routes.delete('/user/:id', Authentication, CartController.deleteByUser)

module.exports = routes