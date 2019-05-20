const mongoose = require("mongoose");
const { Schema } = mongoose;
const DEFAULT_ITEM_PICTURE = "https://00e9e64bacac55dffe3c29bd59ac8d2ec5f72c2f41683786bd-apidata.googleusercontent.com/download/storage/v1/b/hacktiv8-wordtree/o/1558273330847default-item-picture.jpg?qk=AD5uMEtLq48JOCh1n2MXfBnwbLFzzQNpCN_ErGHcOY_eL-d9p_AXiOnR2jBZH_gFKZvxUgVJ_TVZ3OlTvhPL8I7MfS-juoHI4ViWjCNKnfztAOaUDz9k3idptjhqBv4ljtabD0xisZ8wqoPV6qcO1u2gncHi7CKOnBi7DNX3t3SWOnyy7_4woc9ZGLl4R8PY6CK1daKT1L-OqIDGVLerNpxkpbxIvjYMPHTQQxlJDFZK5Ui0oDim2_TT_m51g2dW4Lp9fK_LKXSuSjMYAqvfr_8-aa3oaGxGX0W9eSvQ6J3QuhLPRtIFS2b9DgDfp0QGO0ZO6Qu5tHQcEOLEyOhYe7QqAs-0ou0LjHOWv6BCqivoe-A_lYdW7v1sLfVOdvZofpNKBNhGCkadheg_UsDsUyO-C1Gq2LyhO5o3rjMfbVHRDWIo3J9Tj6OGMnWf1q3l0H88dHwZxWUAQKXDLs-OTKf_I2p-rs15ZKZ6CmLhB9ybqJzXx_lHhbWfHrT5lkQXwZkAzRDIRuHFsLf7a1OgSuf9qLnn8sp2ldkrUV5naOrPAegnQlOj2T3sQmmj5p0AYLWQ6E8423cW9dJl4R-uy-4T4PZGKOBcMeTI_OxMShGoIhXJVBcPt9qMvZJ7VxMr3UnMf9mhEv7fCo8pXg3aA3tLsXPRl7D62WirwvzFn_TCDDjNwu0QViFOe4KPFeoj1G_00UsvWyzqhWoF2PGbaZiv5PUhNx-E5B6lcf2lLCdxRTeHBYiGizSkQo3iivNDywHRsIZrRt8HugvWX1ZM0yo26iY502naY73S0AcF1KyCiwFsrr4fNq8";
const itemSchema = new Schema ({
  name: {
    type: String,
    required: [true, "Item name is required"],
  },
  image: {
    type: String,
    default: DEFAULT_ITEM_PICTURE,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  stock: {
    type: Number,
    required: [true, "Stock is required"],
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  buyerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  tags: [{
    type: String,
  }],
  ratings: [{
    type: Number,
  }],
  comments: [{
    type: String,
  }],
  isDelivered: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;