const mongoose = require('mongoose')

let productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `Product name required.`],
  },
  description: {
    type: String,
    required: [true, 'Product description required.']
  },
  featuredImg: {
    type: [String],
    default: ''
  },
  stock: {
    type: Number,
    min: 0,
    default: 0
  },
  tags: {
    type: [String],
  },
  price: {
    type: Number,
    required: [true, 'Product price required.'],
    min: 0
  },
  shortkey: {
    type: String
  },
  priceStr: {
    type: String
  }
})

let Product = mongoose.model('Product', productSchema)

module.exports = Product