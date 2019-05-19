const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    image_url: String,
    category: String,
    stock: Number,
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product