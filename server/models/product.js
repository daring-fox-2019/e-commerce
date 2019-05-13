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
    type: String,
    default: ''
  },
  stock: {
    type: Number,
    default: 0
  },
  tags: {
    type: [String],
  },
  price: {
    type: Number,
    required: [true, 'Product price required.']
  }
})

let Product = mongoose.model('Product', productSchema)

module.exports = Product