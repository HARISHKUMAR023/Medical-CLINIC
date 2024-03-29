const mongoose = require('mongoose');

// Define schema
const financialYearSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
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
const FinancialYear = mongoose.model('FinancialYear', financialYearSchema);

module.exports = FinancialYear;
