const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const transactionSchema = new Schema({
    // products: [{
    //     product: {type: Schema.Types.ObjectId, ref: 'Product'},
    //     quantity: {
    //         type: Number,
    //         validate: {
    //             validator(quantity) {
    //                 if(quantity <= 0) return false
    //             },
    //             message: 'Quantity must be greater than 0'
    //         }
    //     },
    //     price: Number,
    // }],
    items: [{type: Schema.Types.ObjectId, ref: 'Cart'}],
    status: {
        type: String,
        default: 'waiting for payment'
    },
    paidAt: Date,
    total: Number,
    user: {type: Schema.Types.ObjectId, ref: 'User'}
},{
    timestamps: {
        createdAt: 'created_at',
        closedAt: 'updated_at',
    }
});
const Transaction = mongoose.model('Transaction', transactionSchema)
module.exports = Transaction