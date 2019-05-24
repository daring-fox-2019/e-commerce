const mongoose = require('mongoose')
const Schema = mongoose.Schema

let productSchema = new Schema({
    name: String,
    image: String,
    price: Number,
    stock: Number,
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
})

let Product = mongoose.model('Product',productSchema)

module.exports = Product