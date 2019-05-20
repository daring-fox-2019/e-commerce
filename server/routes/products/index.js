const router = require('express').Router()
const Product = require('../../controllers/product')
const { authenticate, authorization } = require('../../middlewares/auth')

router.post('/',  authenticate, Product.create)
router.patch('/:id', authenticate, Product.update)
router.delete('/:id', authenticate, authorization, Product.delete)
router.get('/user', authenticate, Product.getAll)
router.get('/', Product.getAll )
router.get('/:id', Product.getOne)


module.exports = router