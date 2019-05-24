const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    name: String,
    stock: {
        type: Number,
        validate: [
            {
                validator(stock) {
                    if(stock <= 0) return false
                },
                message: 'stock must be greater than 0'
            }],
    },
    image: String,
    price : {
        type: Number,
        validate: {
            validator(price) {
                if(price <= 0) return false
            },
            message: 'price must be greater than 0'
        }
    }
}, 
{
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt'}
});

// productSchema.pre('findOneAndUpdate', function(next) {
//     // if(this._update) 
//     if(this._update.$inc) {

//     }
//     next()
// })

const Product = mongoose.model('Product', productSchema)
module.exports = Product