const mongoose = require('mongoose')
const Schema = mongoose.Schema

productSchema = new Schema({

    productName : {
        type : String,
        required : [true, 'Product must have a name']
    },
    description : {
        type : String,
    },
    price : {
        type : Number,
        required : [true, 'Price should greater than equal 0'],
        min : [0, 'Price should greater than equal 0']
    },
    stock : {
        type : Number,
        required : [true, 'Stock should greater than equal 0'],
        min : [0, 'Stock should greater than equal 0']
    },
    image : {
        type : String
    },
    category : {
        type : Schema.Types.ObjectId,
        ref : 'Category'
    }
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}
})

productSchema.pre('findByIdAndUpdate', function(next) {
    this.options.runValidators = true;
    next()
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product