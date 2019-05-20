const route = require('express').Router()
const ControllerTransaction = require('../controllers/transaction')
const { authenticate, authorize, authorizeTransaction } = require('../middlewares/auth')

route.use(authenticate)
route.post('/', ControllerTransaction.create)
route.get('/', ControllerTransaction.findAll)
route.get('/myTransaction', ControllerTransaction.findMy)
route.use('/:transactionId', authenticate)
route.get('/:transactionId', ControllerTransaction.findOne)
route.use('/:transactionId', authorizeTransaction)
route.put('/:transactionId', ControllerTransaction.update)
route.delete('/:transactionId', ControllerTransaction.delete)

module.exports = route