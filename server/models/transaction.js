const mongoose = require('mongoose')
const Schema = mongoose.Schema

let transactionSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' }, 
    cart: [{ type: Schema.Types.ObjectId, ref: 'Cart' }],
    totalPrice: Number,
    status: String,
})

let Transaction = mongoose.model('Transaction',transactionSchema)

module.exports = Transaction