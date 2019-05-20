const mongoose = require('mongoose')
const Schema = mongoose.Schema

let cartSchema = new Schema({
    products : [{ type: Schema.Types.ObjectId, ref: 'product' }],
    userId : String
})

let Cart = mongoose.model('cart',cartSchema)

module.exports = Cart