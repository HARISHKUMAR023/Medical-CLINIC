// models/Patient.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const validator = require('validator'); // Import validator module

const patientSchema = new Schema({
  patientName: {
    type: String,
    required: true
  },
  contactMailId: {
    type: String,
    required: true,
    // validate: {
    //   validator: validator.isEmail,
    //   message: 'Invalid email address'
    // }
  },
  contactPhoneNumber: {
    type: String,
    required: true,
    // validate: {
    //   validator: value => validator.isMobilePhone(value, 'any', { strictMode: false }),
    //   message: 'Invalid phone number'
    // }
  },
  contactAddress: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  patientUniqueId: {
    type: String,
    required: true,
    unique: true
  }
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
