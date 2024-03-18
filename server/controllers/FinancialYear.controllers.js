const FinancialYear = require('../models/FinancialYear.model');

// Controller for creating a new financial year
exports.createFinancialYear = async (req, res) => {
  try {
    const { title, startDate, endDate, createdBy } = req.body;
    const financialYear = new FinancialYear({ title, startDate, endDate, createdBy });
    await financialYear.save();
    res.status(201).json({ success: true, data: financialYear });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller for getting all financial years
exports.getAllFinancialYears = async (req, res) => {
  try {
      // Logic to fetch all financial years from the database
      const financialYears = await FinancialYear.find();
      
      // Send the array of financial years as response
      res.json( financialYears );
  } catch (error) {
      console.error('Error fetching financial year data', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}


// Controller for getting a single financial year by ID
exports.getFinancialYearById = async (req, res) => {
  try {
    const financialYear = await FinancialYear.findById(req.params.id);
    if (!financialYear) {
      return res.status(404).json({ success: false, error: 'Financial year not found' });
    }
    res.status(200).json({ success: true, data: financialYear });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller for updating a financial year by ID
exports.updateFinancialYear = async (req, res) => {
  try {
    const financialYear = await FinancialYear.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!financialYear) {
      return res.status(404).json({ success: false, error: 'Financial year not found' });
    }
    res.status(200).json({ success: true, data: financialYear });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller for deleting a financial year by ID
exports.deleteFinancialYear = async (req, res) => {
  try {
    const financialYear = await FinancialYear.findByIdAndDelete(req.params.id);
    if (!financialYear) {
      return res.status(404).json({ success: false, error: 'Financial year not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
