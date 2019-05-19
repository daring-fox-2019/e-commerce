const mongoose = require('mongoose')

let cartSchema = new mongoose.Schema({
  productsId: [String]
})

let Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart