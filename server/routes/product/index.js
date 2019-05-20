const route = require('express').Router()
const productController = require('../../controllers/productController')
const authenticate = require('../../middlewares/authenticate')
const authorize = require('../../middlewares/authorize')
const Multer = require('multer');
const gcsMiddlewares = require('../../middlewares/google-cloud-storage')
const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
    },
});

route.use(authenticate)
route.get('/', productController.findAll)
route.use(authorize)
route.post('/', multer.single('image'), gcsMiddlewares.sendUploadToGCS, productController.create)
route.patch('/:ProductId', multer.single('image'), gcsMiddlewares.sendUploadToGCS, productController.update)
route.delete('/:ProductId', productController.delete)

// route.get('/',(req,res) => {
//     res.send('masuk di route product')
// })

module.exports = route