const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    required: true,
    enum: ["Apparel", "Footwear", "Electronics", "Leisure"],
  },
  description: String,
  modified: Date,
  img: String,
});

module.exports = mongoose.model("Product", productSchema, "product");
