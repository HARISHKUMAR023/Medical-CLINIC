const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  productPic: { type: String },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: String, required: true }
});

module.exports = mongoose.model('Product', productSchema);
