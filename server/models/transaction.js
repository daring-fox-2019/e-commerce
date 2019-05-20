const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    recipientName : {
        type : String,
        required : true
    },
    carts: [{
        productId : {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        amount : Number
    }],
    address: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        default: 0,
        min : [0, 'Cannot be less than 0']
    },
    status: {
        type: Boolean,
        default: false
    },
    deliverPrice : {
        type: Number,
        required : true
    }
}, {
    timestamps: true
})

let Transaction = mongoose.model('Transaction', transactionSchema)
module.exports = Transaction