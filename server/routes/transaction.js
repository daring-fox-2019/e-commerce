const router         = require('express').Router();
const TransactionCon = require('../controllers/transaction');

router.get('/', TransactionCon.getAll);
router.get('/:id', TransactionCon.getOne);
router.post('/', TransactionCon.create);
router.patch('/:id/:productId', TransactionCon.update);

module.exports = router;