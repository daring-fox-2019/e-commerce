const router = require('express').Router()
const UserController = require('../controllers/userController')
const ProductController = require('../controllers/productController')
const CartController = require('../controllers/cartController')
const images = require('../helpers/images')
const isAuthenticate = require('../middleware/Authentication')
const isAdminAuthorize = require('../middleware/AdminAuth')
const isUserAuthorize = require('../middleware/Authorization')
router.post('/upload',
  images.multer.single('image'), 
  images.sendUploadToGCS,
  (req, res) => {
    res.send({
      status: 200,
      message: 'Your file is successfully uploaded',
      link: req.file.cloudStoragePublicUrl
    })
  })

router.get('/', ProductController.readAll)
router.post('/cart',isAuthenticate, CartController.create)
router.get('/cart/:id',isAuthenticate, CartController.readAll)
router.patch('/cart/:id', isAuthenticate, CartController.updateStatus)
router.delete('/cart/:id', isAuthenticate, CartController.deleteEach)
router.get('/decode', isAuthenticate, UserController.getDecode)
router.post('/signup', UserController.signUp)
router.post('/login', UserController.login)
router.post('/admin/signup', UserController.signUpAdmin)
router.post('/admin', isAuthenticate, isAdminAuthorize, ProductController.create)
router.get('/admin/:id', isAuthenticate, isAdminAuthorize, ProductController.readOne)
router.put('/admin/:id', isAuthenticate, isAdminAuthorize, ProductController.update)
router.delete('/admin/:id', isAuthenticate, isAdminAuthorize, ProductController.delete)
module.exports = router