const mongoose = require('mongoose')
const Schema = mongoose.Schema

let cartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' }, 
    productId: { type: Schema.Types.ObjectId, ref: 'Products' },
    quantity: Number,
    totalPrice: Number,
    status: Boolean
})

let Cart = mongoose.model('Cart',cartSchema)

module.exports = Cart