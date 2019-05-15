const router = require('express').Router()
const Product = require('../../controllers/product')
const { authenticate, authorization } = require('../../middlewares/auth')

router.post('/',  authenticate,Product.create)
router.patch('/:id', authenticate, authorization, Product.update)
router.delete('/:id', authenticate, authorization, Product.delete)
router.get('/', Product.getAll )
router.get('/:id', Product.getOne)
router.get('/user', authenticate, Product.getAll)

module.exports = router