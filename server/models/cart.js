const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
const {Schema } = mongoose;

const cartSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    buyer : { type: Schema.Types.ObjectId, ref: 'User' },
    quantity: {
        type: Number
    },
    total: {
        type: Number
    }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart