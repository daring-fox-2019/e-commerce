const mongoose = require('mongoose')
const Schema = mongoose.Schema

let productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: 'Ini produk TOP lho'
  },
  image_url: {
    type: String,
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  }
  // image_url: String
},{timestamps: true})

let Product = mongoose.model('Products', productSchema)

module.exports = Product