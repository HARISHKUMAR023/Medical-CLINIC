const express = require('express');
const router = express.Router();
const PurchaseController = require('../controllers/Purchase.controllers');

// Route for creating a new purchase
router.post('/purchases', PurchaseController.createPurchase);

// Route for getting all purchases
router.get('/purchases', PurchaseController.getAllPurchases);

// Route for getting a single purchase by ID
router.get('/purchases/:id', PurchaseController.getPurchaseById);

// Route for updating a purchase by ID
router.put('/purchases/:id', PurchaseController.updatePurchaseById);

// Route for deleting a purchase by ID
router.delete('/purchases/:id', PurchaseController.deletePurchaseById);

// Route for getting total purchases by supplier
router.get('/purchases/total/:supplierId', PurchaseController.getPurchasesBySupplier);

module.exports = router;