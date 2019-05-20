const controller = require('../controllers/transaction')
const router = require('express').Router()
const { authenticate, 
        adminAuthorization,
        authorizeTransaction } = require('../middlewares/auth.js')

router.use(authenticate)
router.get('/', controller.findAll)
router.post('/', controller.create)
router.patch('/:id/delivery', authenticate, controller.updateDeliveryStatus)

//authorization
//router.use('/:id', authorize)
router.get('/all', adminAuthorization, controller.getAllTransactions)
router.patch('/:id/admin', adminAuthorization, controller.updateConfirmPayment)
router.use('/:id', authorizeTransaction)
router.get('/:id', controller.findOne)
router.patch('/:id', controller.updateOne)

// router.delete('/:id', controller.deleteOne)

module.exports = router