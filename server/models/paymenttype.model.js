const mongoose = require('mongoose');

// Define schema
const paymenttype = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
 
  createdBy: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
},
  createdDate: {
    type: Date,
    default: Date.now
  }
});

// Create model
const Paymenttype = mongoose.model('Paymenttype', paymenttype);

module.exports = Paymenttype ;
