const router = require('express').Router()
const TransactionController = require('../controllers/TransactionController')
const {isadmin} = require('../middlewares/isadmin')
const {authenticate} = require('../middlewares/authenticate')

router.get('/shipping',authenticate, TransactionController.getDataRajaOngkir)
router.post('/shipping',authenticate, TransactionController.calculateOngkir)
// router.get('/:id', TransactionController.findOne)
// router.post('/', authenticate, isadmin, TransactionController.create)
// router.delete('/:id', authenticate, isadmin, TransactionController.delete)
// router.patch('/:id', authenticate, isadmin, TransactionController.update)

module.exports = router