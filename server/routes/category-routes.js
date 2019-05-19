const router = require('express').Router()
const categoryController = require('../controllers/category-controller.js')
const authentication = require('../middlewares/authentication')

router.get('/', categoryController.showAll)
router.get('/:id', authentication, categoryController.showLimit)

module.exports = router