const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controllers');

// Route to fetch all products
router.get('/products', productController.getAllProducts);
router.post('/products', productController.product);
router.delete('/products/:id', productController.deleteProduct);
router.put('/products/:id', productController.updateProduct);
// Route to toggle the status of a product by ID
router.put('/products/:id/toggle', productController.toggleProductStatus);
module.exports = router;
