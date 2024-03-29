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
  cgst: Number,
  sgst: Number,
  totalPrice: Number,
  payableAmount: Number,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Billing', BillingSchema);