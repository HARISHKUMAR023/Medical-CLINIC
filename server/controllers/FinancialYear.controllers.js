const FinancialYear = require('../models/FinancialYear.model');

// Controller for creating a new financial year
exports.createFinancialYear = async (req, res) => {
  try {
    const { title, startDate, endDate, createdBy } = req.body;
    const financialYear = new FinancialYear({ title, startDate, endDate, createdBy });
    await financialYear.save();
    res.status(201).json({ success: true, data: financialYear , message:"FinancialYear created succeses"});
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
    res.status(200).json({ success: true, data: financialYear,message:"update is done" });
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

// Activate or deactivate a product
exports.toggleFinancialYear= async (req, res) => {
  try {
    const FinancialYearid= req.params.id;

    // Find the product by ID
    const financialYear = await  FinancialYear.findById(FinancialYearid);

    if (!financialYear ) {
      return res.status(404).json({ message: 'FinancialYear  not found' });
    }

    // Toggle the active status
    financialYear .active = !financialYear .active;

    // Save the updated product
    await financialYear.save();

    res.status(200).json({ message: 'FinancialYear status toggled successfully',FinancialYear  });
  } catch (err) {
    console.error('Error toggling product status:', err);
    res.status(500).json({ message: 'Error toggling FinancialYear  status', error: err.message });
  }
};