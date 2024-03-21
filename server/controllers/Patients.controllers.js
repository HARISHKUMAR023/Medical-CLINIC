const Patient = require('../models/Patient.model');
const { validationResult } = require('express-validator');

// Controller for creating a new patient
exports.createPatient = async (req, res) => {
  // Check for validation errors
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ success: false, errors: errors.array() });
  // }

  try {
    const { patientName, contactMailId, contactPhoneNumber, contactAddress, country, state, city, pincode } = req.body;

    // Create new patient
    const newPatient = new Patient({ 
      patientName, 
      contactMailId, 
      contactPhoneNumber, 
      contactAddress, 
      country, 
      state, 
      city, 
      pincode,
      registrationDate: Date.now(),
      patientUniqueId: generateUniqueID()
    });

    await newPatient.save();
    res.status(201).json({ newPatient, message: "Patient created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller for getting all patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    console.error('Error fetching patients data', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

// Controller for updating a patient by ID
exports.updatePatient = async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedPatient) {
      return res.status(404).json({ success: false, error: 'Patient not found' });
    }
    res.status(200).json({ data: updatedPatient, message: "Patient updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller for deleting a patient by ID
exports.deletePatient = async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
    if (!deletedPatient) {
      return res.status(404).json({ success: false, error: 'Patient not found' });
    }
    res.status(200).json({ success: true, data: {}, message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Function to generate a unique patient ID
function generateUniqueID() {
  // Your logic to generate a unique ID goes here
  return Math.random().toString(36).substring(2, 10); // Just a placeholder, replace with your actual logic
}