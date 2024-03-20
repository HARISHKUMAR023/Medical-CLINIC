const express = require('express');
const router = express.Router();
const manufacturerController = require('../controllers/manufacturer.controllers');

// Route to fetch all products
router.get('/manufacturer', manufacturerController.getAllmanufacturer);
router.post('/manufacturer', manufacturerController.manufacturer);
router.delete('/manufacturer/:id', manufacturerController.deletemanufacturer);
router.put('/manufacturer/:id', manufacturerController.updateManufacturer);
router.put('/manufacturer/:id/toggle', manufacturerController.togglemanufacturer);
module.exports = router;
