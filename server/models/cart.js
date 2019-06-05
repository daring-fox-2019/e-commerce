const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let cartSchema = new Schema({
  userId : {
    type : Schema.Types.ObjectId,
    ref : "User"
  },
  productId :{
    type : Schema.Types.ObjectId,
    ref : "Product"
  },
  quantity : {
    type : Number
  },
  checked : {
    type: Number,
    required: true
  }
})

let Cart = mongoose.model("Cart", cartSchema)

module.exports = Cart