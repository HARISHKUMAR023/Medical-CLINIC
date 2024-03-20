// Import Mongoose
const mongoose = require('mongoose');

// Define Supplier Schema
const supplierSchema = new mongoose.Schema({
  agencyContactName: {
    type: String,
    required: true
  },
  contactMailId: {
    type: String,
    required: true
  },
  contactPhoneNumber: {
    type: String,
    required: true
  },
  contactAddress: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  state: String,
  city: String,
  pincode: String
});

// Create and export Supplier model
module.exports = mongoose.model('Supplier', supplierSchema);
