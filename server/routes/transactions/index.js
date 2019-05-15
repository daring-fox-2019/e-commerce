const Transaction = require('../../controllers/transaction')
const router = require('express').Router()

router.post('/', Transaction.create)

module.exports = router