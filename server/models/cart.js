const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    productId : {
        type : Schema.Types.ObjectId,
        ref : 'Product'
    },
    amount : {
        type : Number,
        required : [true, 'Amount is required'],
        min : [1, 'Invalid input']
    }
})

let Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart
