const mongoose = require('mongoose')

let productSchema = new mongoose.Schema({
  name: String,
  images: [String],
  description : String,
  price : Number,
  seller : String
})

let Product = mongoose.model('Product', productSchema)

module.exports = Product