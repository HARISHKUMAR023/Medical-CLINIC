// controllers/BillingController.js
const Billing = require('../models/billing.model');
const Stock = require('../models/Stock.models');
// exports.createBill = async (req, res) => {
//   try {
//     const bill = new Billing(req.body);
//     await bill.save();
//     res.status(201).json({ message: 'Bill created successfully', bill });
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating bill', error });
//   }
// };

// controllers/BillingController.js
// controllers/BillingController.js
// controllers/BillingController.js
exports.createBill = async (req, res) => {
  try {
    const bill = new Billing(req.body);
    await bill.save();

    // Reduce stock
    for (let item of bill.products) {
      const stock = await Stock.findOne({ productitem: item.product });

      if (!stock || stock.quantity < item.quantity) {
        throw new Error(`Not enough stock for product ${item.product}`);
      }

      stock.quantity -= item.quantity;
      await stock.save();
    }

    res.status(201).json({ message: 'Bill created successfully', bill });
  } catch (error) {
    console.error(error); // Log the entire error object to the console
    res.status(500).json({ message: 'Error creating bill', error });
  }
};
exports.getBills = async (req, res) => {
  try {
    const bills = await Billing.find().populate('products.product');
    res.status(200).json({ bills });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bills', error });
  }
};