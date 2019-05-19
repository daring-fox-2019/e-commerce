const {Schema } = mongoose;

const transactionSchema = new Schema({
    name: { type: Schema.Types.ObjectId, ref: 'Product' },
    buyer : { type: Schema.Types.ObjectId, ref: 'User' },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required']
    },
    status: {
        type: String
    }
});

transactionSchema.pre('save', function(next, done) {
    this.status = 'Waiting for Payment'
    next()
})

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction