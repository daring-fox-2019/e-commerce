const express = require('express')
const router = express.Router()
const productController = require('../controller/product')
const {isUser, isAuthorize} = require('../middlewares/index')

const images = require('../helper/images')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })


router.use(isUser)
router.get('/',productController.getList)
router.post('/',isAuthorize,images.multer.single('image'),images.sendUploadToGCS,productController.create)
router.get('/cartProduct',productController.getCart)
router.get('/:id',productController.getOne)
router.put('/:id',isAuthorize,images.multer.single('image'),images.sendUploadToGCS,productController.update)
router.patch('/cart/:id',productController.removeFromCart)
router.delete('/:id',isAuthorize,productController.delete)
router.put('/:id/addCart',productController.addToCart)


// router.post('/upload',
//   images.multer.single('image'), 
//   images.sendUploadToGCS,
//   (req, res) => {
//     console.log(req.body);
//     console.log(req.file);
    // res.send({
    //   status: 200,
    //   message: 'Your file is successfully uploaded',
    //   link: req.file.cloudStoragePublicUrl
    // })
// })


module.exports = router