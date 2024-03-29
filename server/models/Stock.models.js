const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
  productitem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Productitem',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  metric: {
    type: String,
    required: true
  },
  MRP: {
    type: Number,
    required: true
  },
  costPrice: {
    type: Number,
    required: true
  },
  sellPrice: {
    type: Number,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  }
});

const Stock = mongoose.model('Stock', StockSchema);

module.exports = Stock;
