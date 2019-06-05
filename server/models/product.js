const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min : [0, "Price cannot be below zero!"]
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  stock: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image : {
    type: String,
    required: true,
  }
},{
  timestamps:true
});

let Product = mongoose.model("Product", productSchema);

module.exports = Product;
