const mongoose = require('mongoose')
const {Schema} = mongoose
const cartSchema = new Schema({
   idUser: {type: Schema.Types.ObjectId, ref: 'User'},
   productId: {type: Schema.Types.ObjectId, ref: 'Product'},
   quantity: Number,
   status: String
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart