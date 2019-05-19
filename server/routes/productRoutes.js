const Router = require('express').Router()
const productController = require('../controllers/productController')
const authenticate = require('../middlewares/authenticate')
const gcsMiddlewares = require('../middlewares/upload')	
const Multer = require('multer')
const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
    },
});

Router.post('/upload',authenticate, multer.single('image'), gcsMiddlewares.uploadSingle, productController.upload)
Router.get('/',authenticate, productController.gets)
Router.post('/', authenticate, productController.create)
Router.put('/:id',authenticate, productController.update)
Router.delete('/:id',authenticate, productController.delete)
Router.delete('/where/:where',authenticate, productController.deleteWhere)


module.exports = Router