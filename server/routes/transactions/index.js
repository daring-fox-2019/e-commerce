const Transaction = require('../../controllers/transaction')
const router = require('express').Router()
const { authenticate, authorizationTransaction } = require('../../middlewares/auth')
 
router.post('/', authenticate, Transaction.create)
router.patch('/:id', authenticate , authorizationTransaction, Transaction.update)
router.delete('/:id', authenticate, authorizationTransaction, Transaction.delete)
router.get('/', authenticate, Transaction.getAll)
router.get('/sell', authenticate, Transaction.getAllSell)

module.exports = router