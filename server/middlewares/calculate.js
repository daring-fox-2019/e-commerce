const Transaction = require('../models/transaction')

module.exports = {
    calculate(req,res,next) {
        Transaction.findOne({id: req.transaction_id})
        .populate('items')
        .populate('products')
        .then(found => {
            //.....
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
                error: 'error transaction sum calculation'
            })
        })
    }
}