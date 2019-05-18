const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name : {
        type : String,
        required : [true, 'Product name must be filled']
    },
    stock : {
        type : Number,
        required : [true, 'Stock must be filled'],
        min : [0, 'Minimum stock is 0']
    },
    image : [{
        type : String,
        required : [true, 'Image cannot be empty']
    }],
    description : {
        type : String,
        required : [true, 'Description cannot be empty']
    }, 
    price : {
        type : Number,
        required : [true, 'Price cannot be empty'],
        min : [0, 'Minimum price is 0']
    },
    category : {
        type: Schema.Types.ObjectId,
        required : [true, 'Category cannot be empty'],
        ref: 'Category'
    },
    sold : {
        type : Number,
        default : 0
    }

})

productSchema.pre('findByIdAndUpdate', function(next) {
    this.options.runValidators = true;
    next();
  });

let Product = mongoose.model('Product', productSchema)
module.exports = Product
