const mongoose = require('mongoose')
const Schema = new Schema

const cartItemSchema = new Schema({
    product:{
        type: Schema.type.ObjectId,
        ref: 'Product'
    },
})

const cartItems = mongoose.model('CartItem', cartItemsSchema)

module.exports = cartItems