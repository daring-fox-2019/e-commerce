const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cartSchema = new Schema({
    product: {type: Schema.Types.ObjectId, ref: 'Product'},
    quantity: {
        type: Number,
        min: [1, 'quantity must be greater than 0']
    }
});
const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart