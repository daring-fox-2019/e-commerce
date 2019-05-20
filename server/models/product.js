const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    image: String,
    location: String,
    stock: Number
})

const Product = mongoose.model('product', productSchema)

module.exports = Product