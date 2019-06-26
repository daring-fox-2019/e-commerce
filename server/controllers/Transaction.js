const TransactionModel = require('../models/Transaction')

class Transaction {
  static findAll (req, res) {
    TransactionModel
      .find({ owner: req.user._id })
      .populate('owner')
      .populate({
        path: 'cart.item',
        poplatu: {
          path: 'seller'
        }
      })
      .then(transactions => res.status(200).json({ transactions }))
      .catch(() => res.status(500).json({ message: 'Internal Server Error' }))
  }
}

module.exports = Transaction
