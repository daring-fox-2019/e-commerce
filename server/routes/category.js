const router = require('express').Router()
const CategoryController = require('../controllers/CategoryController')
const {isadmin} = require('../middlewares/isadmin')
const {authenticate} = require('../middlewares/authenticate')

router.get('/', CategoryController.findAll)
router.get('/:id', CategoryController.findOne)
router.post('/', authenticate, isadmin, CategoryController.create)
router.delete('/:id', authenticate, isadmin, CategoryController.delete)
router.patch('/:id', authenticate, isadmin, CategoryController.update)

module.exports = router