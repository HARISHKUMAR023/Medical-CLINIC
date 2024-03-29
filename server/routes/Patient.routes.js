const express = require('express');
const router = express.Router();
const patientController = require('../controllers/Patients.controllers');

// Create a new patient
router.post('/patients', patientController.createPatient);

// Get all patients
router.get('/patients', patientController.getAllPatients);

// Update a patient by ID
router.put('/patients/:id', patientController.updatePatient);

// Delete a patient by ID
router.delete('/patients/:id', patientController.deletePatient);

module.exports = router;
