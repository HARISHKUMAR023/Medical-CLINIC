const express = require('express');
const router = express.Router();
const FinancialYearControllers = require('../controllers/FinancialYear.controllers');


router.post('/financial-years', FinancialYearControllers.createFinancialYear);
router.get('/financial-years', FinancialYearControllers.getAllFinancialYears);
router.get('/financial-years/:id',FinancialYearControllers.getFinancialYearById);
router.put('/financial-years/:id',FinancialYearControllers.updateFinancialYear);
router.delete('/financial-years/:id',FinancialYearControllers.deleteFinancialYear);

module.exports = router;