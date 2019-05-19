const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const cartSchema = new Schema({
    'name'       : {type:String, default: `MyCart-${(new Date).toLocaleDateString()+" "+(new Date).toLocaleTimeString()}`},
    'owner'      : {type: Schema.Types.ObjectId, required:true, ref: "User"},
    'products'   : [{type: Schema.Types.ObjectId, ref: "Product"}],
    'checkout'   : {type:Boolean, default: false},
    'delivered'  : {type:Boolean, default: false}
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
