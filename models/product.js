const mongoose = require('mongoose')
const Schema = mongoose.Schema

let productSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: new Date()
  },
  // image_url: String
})

let Product = mongoose.model('Products', productSchema)

module.exports = Product