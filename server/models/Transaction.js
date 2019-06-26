const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  cart: [{
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'item'
    },
    count: {
      type: String,
      default: 1
    },
    status: {
      type: String,
      default: 'waiting_payment'
    }
  }],
  paid: {
    type: Number,
    default: 0
  }
})

const Transaction = mongoose.model('transaction', transactionSchema)

module.exports = Transaction
