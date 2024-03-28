const express = require('express');
const router = express.Router();
const ProductitemController = require('../controllers/Productitem.controllers');

// Route for creating a new purchase
router.post('/productitem',  ProductitemController.createProductitem);
router.get('/productitem', ProductitemController.fetchProductitems);



module.exports = router;