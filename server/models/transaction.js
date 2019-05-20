const mongoose = require('mongoose')

let transactionSchema = new mongoose.Schema({
    cart : {
        type : [String],
        required : [true, "cart can't be empty"]
    }  
},{timestamps: true})

let Transaction = mongoose.model('Transaction', transactionSchema)


module.exports = Transaction