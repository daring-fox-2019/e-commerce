const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Item name can\'t be empty']
  },
  imageUrl: String,
  stock: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    default: 0
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
})

const Item = mongoose.model('item', itemSchema)

module.exports = Item
