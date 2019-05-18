const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  products: Array,
  amount: Number,
  status: String
});

const Carts = mongoose.model("Cart", CartSchema);
module.exports = Carts;
