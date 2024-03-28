const mongoose = require('mongoose');

// Define schema for the doctor
const doctorSchema = new mongoose.Schema({
  doctor_id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String
  },
  education: [{
    degree: String,
    university: String,
    year: String
  }],
  experience: [{
    hospital_name: String,
    position: String,
    start_date: Date,
    end_date: Date
  }],
  certifications: [{
    name: String,
    organization: String,
    year: String
  }]
});

// Create Doctor model
const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
