const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

let cartItemSchema = new Schema({    
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    amount: { type: Number, min: [1, `item amount  cannot be less than 1`], default: 1 },
    price: { type: Number, min: [0, `price cannot be less than 1`], default: 0 }
}, { timestamps: true })

let CartItem = mongoose.model('CartItem', cartItemSchema)
module.exports = CartItem

