const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const productSchema = new Schema({
    'owner'      : {type: Schema.Types.ObjectId, required:true, ref: "User"},
    'item'       : {type:String,required:true},
    'price'      : {type:Number,required:true},
    'stock'      : {type:Number,required:true},
    'img'        : {type:String},
    'description': {type:String,required:true},
    'cart'       : {type: Schema.Types.ObjectId, ref: "Cart", default:null}
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
//     addNewProduct: (item,price,stock,img,description,owner) => {
//         console.log(owner,'kolkol')
//         return Product.create({item,price,stock,img,description,owner})
//     },
//     showAllProducts: (owner) => {
//         return Product.find({})//tiap user bisa liat semua item walau bukan punya dia
//     },
//     updateProduct: (id,item,price,stock,img,description,owner) => {
//         return Product.updateOne({_id:id},{item,price,stock,img,description,owner})
//     },
//     deleteProduct: (id) => {
//         return Product.deleteOne({_id:id})
//     },
//     reduceStock: (id,stock) => {
//         return Product.updateOne({_id:id}, {stock})
//     }
// }