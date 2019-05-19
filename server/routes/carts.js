const express = require('express');
const routes = express.Router();
const CartController = require('../controllers/CartController')
const Authentication = require('../middlewares/authentication')

routes.get('/', CartController.findAll)
routes.post('/:id', CartController.create)
// routes.put('/:id', ProductController.update)
// routes.patch('/:id', ProductController.update)
// routes.delete('/:id', ProductController.delete)

module.exports = routes