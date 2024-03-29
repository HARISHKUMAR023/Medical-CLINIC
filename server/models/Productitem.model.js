// productitem.js
const mongoose = require('mongoose');

const ProductitemSchema = new mongoose.Schema({
  compositionName: {
    type: String,
    required: true,
    // unique: true
  },
  type: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  manufacturer: {
    type: String,
    required: true
  }
});

const Productitem = mongoose.model('Productitem', ProductitemSchema);

module.exports = Productitem;
