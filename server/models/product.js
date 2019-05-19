const cartModel = require('./cart')
const transactionModel = require('./transaction')

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
        min : [0, 'not valid stock']
    },
    seller_id : {
        type : Schema.Types.ObjectId, ref: 'User',
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
    weight : {
        type: Number,
        min : [1, 'not valid weight'],
        required: true
    },
    tags : Array
},{timestamps : true})

ProductSchema.post('findOneAndDelete', function(doc,next){
    console.log(doc,'===================')
    cartModel.deleteMany({ product_id: doc._id })
    .then( _=> {
        return transactionModel.deleteMany( { product_id: doc._id } )
    })
    .then( _=> {
        console.log('berhasil delete uhuy')
        next()
    })
    .catch( err => {
        console.log(err)
        next(err)
    })
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product
