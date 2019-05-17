const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    recipientName : {
        type : String
    },
    carts: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    address: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        default: null
    },
    status: {
        type: Boolean,
        default: false
    },
    deliverPrice : {
        type: Number,
    }
}, {
    timestamps: true
})

let Transaction = mongoose.model('Transaction', transactionSchema)
module.exports = Transaction