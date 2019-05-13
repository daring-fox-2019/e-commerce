const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: String,
    description: String,
    stock: Number,
    price: Number,
    image: String,
    tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}]
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product