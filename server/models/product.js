const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required : [true, 'name of product is required']
    },
    image: {
        type: String,
        required: [true, 'image of produst is required']
    },
    price: {
        type: Number,
        required : [true, 'price of product is required']
    },
    stock: Number,
    description: String,
    createdAt: Date
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product