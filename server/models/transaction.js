const mongoose = require('mongoose')

let transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  total: {
    type: Number,
    min: [0, "Invalid total input"]
  },
  products: {
    type: Array
  },
  deliveryStatus: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
  }
})

let Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction