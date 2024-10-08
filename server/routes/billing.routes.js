// routes/billing.js
const express = require('express');
const router = express.Router();
const BillingController = require('../controllers/billing.controller');

router.post('/billing', BillingController.createBill);
router.get('/billingdata', BillingController.getBills);

module.exports = router;