const mongoose = require('mongoose')
const Schema = mongoose.Schema

transactionSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    carts: [{
        productId : {
            type : Schema.Types.ObjectId,
            ref : 'Product'
        },
        amount : {
            type : Number,
        }
    }],
    address : {
        type : String,
        required : true
    },
    total : {
        type : Number,
        default : null
    },
    status: {
        type : Boolean,
        default : false
    },
    deliverPrice : {
        type : Number
    }
},{
    timestamps: true
})

const Transaction = mongoose.model('Transaction', transactionSchema)
module.exports = Transaction