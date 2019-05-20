const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
const {Schema } = mongoose;

const transactionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    carts:[{
        type: Schema.Types.ObjectId, 
        ref: 'Cart'
    }],
    totalPayment: { 
        type: Number,
        required: [true, 'Total amount is required']
    },
    status: { type: String }
});

transactionSchema.pre('save', function(next, done) {
    this.status = 'waiting'
    next()
})

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction