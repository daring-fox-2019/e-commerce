const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    stock : {
        type : Number,
        required : true,
        min : [1, 'not valid stock']
    },
    userId : {
        type : Schema.Types.ObjectId, 
        ref: 'User',
    },
    description : {
        type: String
    },
    price : {
        type : Number,
        required : true,
        min : [1, 'not valid price']
    },
    image : {
        type : String
    },
    tags : Array
},{timestamps : true})


const Product = mongoose.model('Product', ProductSchema)

module.exports = Product
