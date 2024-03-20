const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/Suppliers.controllets');

// Create a new supplier
router.post('/suppliers', supplierController.createSupplier);

// Get all suppliers
router.get('/suppliers', supplierController.getAllSuppliers);

// Update a supplier by ID
router.put('/suppliers/:id', supplierController.updateSupplier);

// Delete a supplier by ID
router.delete('/suppliers/:id', supplierController.deleteSupplier);

module.exports = router;
