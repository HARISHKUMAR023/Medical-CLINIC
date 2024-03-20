const Supplier = require('../models/Suppliers.model');

// Controller for creating a new supplier
exports.createSupplier = async (req, res) => {
  try {
    const { agencyContactName, contactMailId, contactPhoneNumber, contactAddress, country, state, city, pincode } = req.body;
    const newSupplier = new Supplier({ agencyContactName, contactMailId, contactPhoneNumber, contactAddress, country, state, city, pincode });
    await newSupplier.save();
    res.status(201).json({  newSupplier, message: "Supplier created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller for getting all suppliers
exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (error) {
    console.error('Error fetching suppliers data', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}

// Controller for updating a supplier by ID
exports.updateSupplier = async (req, res) => {
  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedSupplier) {
      return res.status(404).json({ success: false, error: 'Supplier not found' });
    }
    res.status(200).json({ data: updatedSupplier, message: "Supplier updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller for deleting a supplier by ID
exports.deleteSupplier = async (req, res) => {
  try {
    const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!deletedSupplier) {
      return res.status(404).json({ success: false, error: 'Supplier not found' });
    }
    res.status(200).json({ success: true, data: {}, message: "Supplier deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
