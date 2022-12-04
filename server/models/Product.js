const mongoose = require("mongoose");
const productModel = mongoose.Schema({
  poetId: { type: String},
  title: { type: String, required: true, unique: true },
  description: { type: String },
  img: { type: String },
  price: { type: Number, required: true },
});

const product = mongoose.model("Product", productModel);
module.exports = product;
