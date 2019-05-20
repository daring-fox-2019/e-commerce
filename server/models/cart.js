const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    itemId : {
        type: String,
        required : [true, 'idItem required']
    },
    userId : {
        type: String,
        required: [true, 'please login to access this endpoint']
    },
    title : {
        type: String,
        required : [true, 'title required']
    },
    description : {
        type: String,
        required : [true, 'description required']
    },
    kategori : {
        type: String,
        required : [true, 'kategori required']
    },
    price : {
        type: Number,
        min: [1, 'price minimal : 1'],
        required : [true, 'price required']
    },
    image : {
        type: String,
    },
    mainPage : {
        type: Boolean
    },
    stock : {
        type : Number,
        min: [1, 'stock minimal : 1'],
        required : [true, 'stock required']
    },
    quantity : {
        type: Number,
        min: [1, 'quantity minimal : 1'],
        default : 1,
        required: [true, "quantity can't be empty"]
    }
})


const Cart = mongoose.model('Cart',cartSchema)

module.exports = Cart