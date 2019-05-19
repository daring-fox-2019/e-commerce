const express = require('express');
const routes = express.Router();
const UserController = require('../controllers/UserController')
const ProductController = require('../controllers/ProductController')
const isAdmin = require('../middlewares/isAdmin')
const Upload = require('../middlewares/upload')

routes.post('/signup', UserController.signupAdmin)

routes.post('/products', isAdmin, Upload.multer.single('picture'), Upload.sendUploadToGCS, ProductController.create)
routes.put('/products/:id', isAdmin, Upload.multer.single('picture'), Upload.sendUploadToGCS, ProductController.update)
routes.patch('/products/:id', isAdmin, Upload.multer.single('picture'), Upload.sendUploadToGCS, ProductController.update)
routes.delete('/products/:id', isAdmin, ProductController.delete)

module.exports = routes