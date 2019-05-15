const mongoose = require('mongoose')
const Schema = mongoose.Schema

TransactionSchema = new Schema({
    buyer_id: {
        type : Schema.Types.ObjectId, ref: 'User',
        required : true
    },
    product_id: {
        type : Schema.Types.ObjectId, ref: 'Item',
        required : true
    },
    status: {
        type : String,
        required : true
    },
    qty: {
        type: Number,
        required: true
    },
    shipping_cost : {
        type : String
    },
    resi : {
        type: String
    }
},{ timestamps : true })

const Transaction = mongoose.model('Transaction', TransactionSchema)

module.exports = Transaction