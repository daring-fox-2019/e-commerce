const router = require('express').Router()
const transactionController = require('../controllers/transaction-controller')
const authentication = require('../middlewares/authentication')

router.post('/', authentication, transactionController.create)
router.get('/', authentication, transactionController.showAll)
router.get('/revenue', transactionController.aggregateByMonth)
router.get('/user', authentication, transactionController.showUser)
router.patch('/:id', authentication, transactionController.confirmArrival)

module.exports = router