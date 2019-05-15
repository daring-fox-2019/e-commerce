const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'required']
  },
  description: String,
  price: {
    type: Number,
    min: [0, 'minimum 0']
  },
  stock: {
    type: Number,
    min: [0, 'minimum 0']
  },
  imageURL: String,
  created: Date,
  updated: Date,
})

let Product = mongoose.model('Product', productSchema);


module.exports = Product; 