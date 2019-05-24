const controller = require('../controllers/product')
const router = require('express').Router()
const { authenticate, 
        adminAuthorization } = require('../middlewares/auth.js')

router.get('/', controller.findAll)
router.get('/:id', controller.findOne)

//admin authentication authorization
router.use(authenticate)
router.patch('/:id/cart', controller.updateCartStock)


router.use(adminAuthorization)
router.post('/', controller.create)
router.patch('/:id', controller.updateOne)
router.delete('/:id', controller.deleteOne)

module.exports = router