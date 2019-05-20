const mongoose = require('mongoose')
const Schema = mongoose.Schema


let ProductSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  image: String,
  price: {
    type: Number,
    required: true
  },

},
  { timestamps: { createdAt: 'created_at' } })

let Product =  mongoose.model('Product',ProductSchema)

module.exports = Product