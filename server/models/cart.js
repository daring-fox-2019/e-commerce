const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  products: Array,
  amount: Number,
  total: Number,
  transfer: String,
  status: String,
  userDetail: Object,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
});

const Carts = mongoose.model("Cart", CartSchema);
module.exports = Carts;
