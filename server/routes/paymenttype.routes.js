const express = require('express');
const router = express.Router();
const PaymenttypeControllers = require('../controllers/paymenttype.controllers');


router.post('/Paymenttype', PaymenttypeControllers.createPaymenttype);
router.get('/Paymenttype', PaymenttypeControllers.getAllPaymenttypes);
// router.get('/financial-years/:id',PaymenttypeControllers.getFinancialYearById);
router.put('/Paymenttype/:id',PaymenttypeControllers.updatePaymenttype);
router.delete('/Paymenttype/:id',PaymenttypeControllers.deletePaymenttype);
router.put('/Paymenttype/:id/toggle', PaymenttypeControllers.togglePaymenttype);
module.exports = router;