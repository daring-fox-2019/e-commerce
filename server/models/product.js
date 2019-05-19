const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    description: String,
    stock: {
        type: Number,
        default: 0,
    },
    price: { 
        type: Number,
        default: 0,
    },
    image: String,
    // tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product