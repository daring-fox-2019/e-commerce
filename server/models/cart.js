const mongoose = require('mongoose')

let cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }
})

let Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart