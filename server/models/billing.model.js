// models/Billing.js
const mongoose = require('mongoose');

const BillingSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Productitem',
      },
      quantity: Number,
      sellingPrice: Number,
    },
  ],
  total: Number,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Billing', BillingSchema);