const mongoose = require('mongoose')
const Schema = require('mongoose').Schema

let productSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    stock: { type: Number, min: [0, `stock cannot be less than 0`], default: 0 },
    price: { type: Number, min: [0, `price cannot be less than 0`], default: 0 }
}, { timestamps: true })
let Product = mongoose.model('Product', productSchema)
module.exports = Product

