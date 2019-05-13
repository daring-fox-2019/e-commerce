const mongoose = require("mongoose");
const Schema = mongoose.Schema;

cartSchema = new Schema(
  {
    UserId: {
      type: Schema.Types.ObjectId,
      required: [true, "UserId is required"],
      ref: "User"
    },
    ProductId: [
      {
        type: Schema.Types.ObjectId,
        required: [true, "ProductId is required"],
        ref: "Product"
      }
    ],
    amount: Number,
    total: {
      type: Number,
      required: [true, "Stock must be filled"],
      min: [1, "Stock cannot be zero"]
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
