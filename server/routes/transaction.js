const controller = require('../controllers/transaction')
const router = require('express').Router()
const { authenticate, 
        authorizeTransaction } = require('../middlewares/auth.js')

router.use(authenticate)
router.get('/', controller.findAll)
router.post('/', controller.create)

//authorization
//router.use('/:id', authorize)
router.use('/:id', authorizeTransaction)
router.get('/:id', controller.findOne)
router.patch('/:id', controller.updateOne)
router.delete('/:id', controller.deleteOne)

module.exports = router