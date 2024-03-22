const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true
  },
  purchaseDate: {
    type: Date,
    // required: true
  },
  products: [{
    compositionName: {
      type: String,
      // required: true
    },
    type: {
      type: String,
      // required: true
    },
    brand: {
      type: String,
      // required: true
    },
    manufacturer: {
      type: String,
      // required: true
    },
    quantity: {
      type: Number,
      // required: true
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
  }],
  invoiceNumber: {
    type: String,
    required: true
  },
  paymentstatus: {
    type: String,
    default: 'Unpaid'
  }
});

const Purchase = mongoose.model('Purchase', PurchaseSchema);

module.exports = Purchase;
