const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId;

const cartSchema = new Schema({
    member:{
        type: ObjectId,
        ref: 'User'
    },
    items:[{ 
        type: ObjectId,
        ref: 'Product'
    }],
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart