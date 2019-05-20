const mongoose = require('mongoose')
const Schema = mongoose.Schema

CartSchema = new Schema({
    user_id: {
        type : Schema.Types.ObjectId, 
        ref: 'User',
        required : true
    },
    product_id : {
        type : Schema.Types.ObjectId, 
        ref: 'Product',
        required : true
    },
    qty: {
        type : Number,
        required : true,
        min : [1, 'not valid stock']
    }
},{ timestamps : true})

const Cart = mongoose.model('Cart', CartSchema)

module.exports = Cart