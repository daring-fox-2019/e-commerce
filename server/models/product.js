const mongoose = require('mongoose')
const Schema = mongoose.Schema

let productSchema = new Schema({
  name: {
    type: String,
    required: true
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
  created_at: {
    type: Date,
    default: new Date()
  },
  updated_at: {
    type: Date,
    default: new Date()
  },
  // image_url: String
})

let Product = mongoose.model('Products', productSchema)

module.exports = Product