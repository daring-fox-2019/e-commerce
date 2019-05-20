const { Transaction, User, Cart } = require('../models')

class ControllerTransaction {
  static create(req, res) {
    let { total, products } = req.body
    let newTransaction = {
      user: req.user._id,
      products, total,
      createdAt: new Date()
    }
    Transaction.create(newTransaction)
      .then(Transaction => {
        return Cart.deleteMany({ user: req.user._id })
      })
      .then(cart => {
        res.status(201).json(cart)
      })
      .catch(err => res.status(500).json({ message: err.message }))
  }
  static findAll(req, res) {
    Transaction.find()
      .then(Transactions => {
        res.status(200).json(Transactions)
      })
      .catch(err => res.status(500).json({message: err.message}))
  }
  static findOne(req, res) {
    Transaction.findOne({_id: req.params.transactionId})
      .then(transaction => {
        res.status(200).json(transaction)
      })
      .catch(err => {res.status(500).json({message: err.message})})
  }
  static findMy(req, res) {
    Transaction.find({ user: req.user._id })
      .then(Transactions => {
        res.status(200).json(Transactions)
      })
      .catch(err => res.status(500).json({message: err.message}))
  }
  static update(req, res) {
    let deliveryStatus = (req.body.deliveryStatus == 'true'
                      || req.body.deliveryStatus == true) ? true : false
    Transaction.findOneAndUpdate({_id: req.params.transactionId}, { deliveryStatus }, { new: true })
    .then(transaction => {
      res.status(200).json(transaction)
    })
    .catch(err => res.status(500).json({message: err.message}))
  }
  static delete(req, res) {
    Transaction.findOneAndDelete({_id: req.params.transactionId})
      .then(transaction => {
        const response = {
          message: 'Successfully deleted transaction.',
          id: req.params.transactionId
        }
        res.status(200).json(response)
      })
      .catch(err => {res.status(500).json({message: err.message})})
  }
}

module.exports = ControllerTransaction