const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    description : {
        type : String,
    },
    name: {
        type: String
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

categorySchema.pre('findByIdAndUpdate', function(next) {
    this.options.runValidators = true;
    next();
  });


const Category = mongoose.model('Category', categorySchema)

module.exports = Category