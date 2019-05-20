const mongoose = require('mongoose')
const Schema = require('mongoose').Schema
const CartItem = require('./cartItem')

let cartSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    items: [{ type: Schema.Types.ObjectId, ref:'CartItem'}]
}, { timestamps: true })

let Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart

