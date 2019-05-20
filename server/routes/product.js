const route = require('express').Router()
const ProductController = require('../controllers/ProductController')
const Authentication = require('../middlewares/Authentication')
const Authorization = require('../middlewares/Authorization')
const IsAdmin = require('../middlewares/IsAdmin')
const gscKey = require('../middlewares/gcsKey')

// AUTHENTICATION
route.use(Authentication)

// READ
route.get('/', ProductController.findAll)
route.get('/:id', ProductController.findOne)

// CREATE
route.post('/', IsAdmin, gscKey.multer.single('image'), gscKey.sendUploadToGCS, ProductController.create)

// UPDATE
route.patch('/:id', IsAdmin, gscKey.multer.single('image'), gscKey.sendUploadToGCS, ProductController.update)

// DELETE
route.delete('/:id', IsAdmin, ProductController.delete)

module.exports = route