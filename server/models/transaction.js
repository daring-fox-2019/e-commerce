const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const transactionSchema = new Schema({
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