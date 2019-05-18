const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: String,
  image: String,
  price: Number,
  stock: Number
});

const Products = mongoose.model("Product", ProductSchema);
module.exports = Products;
