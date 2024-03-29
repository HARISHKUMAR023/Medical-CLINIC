const Paymenttype = require('../models/paymenttype.model');

// Controller for creating a new financial year
exports.createPaymenttype = async (req, res) => {
  try {
    const { title, createdBy } = req.body;
    const newPaymenttype = new Paymenttype({ title, createdBy });
    await newPaymenttype.save();
    res.status(201).json({ success: true, data: newPaymenttype, message: "Paymenttype created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller for getting all financial years
exports.getAllPaymenttypes = async (req, res) => {
  try {
    const Paymenttypes = await Paymenttype.find();
    res.json(Paymenttypes);
  } catch (error) {
    console.error('Error fetching financial year data', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}

// Controller for updating a financial year by ID
exports.updatePaymenttype = async (req, res) => {
  try {
    const updatedPaymenttype = await Paymenttype.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedPaymenttype) {
      return res.status(404).json({ success: false, error: 'Paymenttype not found' });
    }
    res.status(200).json({ data: updatedPaymenttype, message: "Update is done" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller for deleting a financial year by ID
exports.deletePaymenttype = async (req, res) => {
  try {
    const deletedPaymenttype = await Paymenttype.findByIdAndDelete(req.params.id);
    if (!deletedPaymenttype) {
      return res.status(404).json({ success: false, error: 'Paymenttype not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Activate or deactivate a product
exports.togglePaymenttype = async (req, res) => {
  try {
    const PaymenttypeId = req.params.id;
    const paymenttype = await Paymenttype.findById(PaymenttypeId);
    if (!paymenttype) {
      return res.status(404).json({ message: 'Paymenttype not found' });
    }
    paymenttype.active = !paymenttype.active;
    await paymenttype.save();
    res.status(200).json({ message: 'Paymenttype status toggled successfully', paymenttype });
  } catch (err) {
    console.error('Error toggling Paymenttype status:', err);
    res.status(500).json({ message: 'Error toggling Paymenttype status', error: err.message });
  }
};
