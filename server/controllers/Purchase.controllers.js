const Purchase = require('../models/Purchase.model');
const mongoose = require('mongoose');
const Supplier = require('../models/Suppliers.model'); // adjust the path according to your project structure
const Productitem = require('../models/Productitem.model');
// Controller for creating a new purchase
// Controller for creating a new purchase
// exports.createPurchase = async (req, res) => {
//     try {
//         const supplier = await Supplier.findById(req.body.supplier);
//         if (!supplier) {
//           return res.status(400).json({ message: 'Supplier not found' });
//         }
//       const newPurchase = new Purchase(req.body);
//     //   console.log(req.body)
//       const savedPurchase = await newPurchase.save();
//       res.status(201).json({ purchase: savedPurchase, message: "purchase created successfully" });
//     } catch (err) {
//       res.status(500).json({ error: err, message: err.message });
//     }
//   };
exports.createPurchase  = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { supplier, purchaseDate, products, invoiceNumber, paymentstatus } = req.body;
    const productItemIds = [];

    for (const productData of products) {
      const { compositionName, type, brand, manufacturer } = productData;
      const productItem = new Productitem({
        compositionName,
        type,
        brand,
        manufacturer
      });

      const savedProductItem = await productItem.save({ session });
      productItemIds.push(savedProductItem._id);
    }

    const purchase = new Purchase({
      supplier,
      purchaseDate,
      products: productItemIds.map(productId => ({
        productitem: productId,
        quantity: products[productItemIds.indexOf(productId)].quantity,
        metric: products[productItemIds.indexOf(productId)].metric,
        MRP: products[productItemIds.indexOf(productId)].MRP,
        costPrice: products[productItemIds.indexOf(productId)].costPrice,
        sellPrice: products[productItemIds.indexOf(productId)].sellPrice,
        expiryDate: products[productItemIds.indexOf(productId)].expiryDate
      })),
      invoiceNumber,
      paymentstatus
    });

    await purchase.save({ session });

    await session.commitTransaction();

    res.status(201).json({ message: 'Purchase and Product created successfully', data: { purchase, productItemIds } });
  } catch (error) {
    await session.abortTransaction();
    console.error('Error creating purchase and product:', error);
    res.status(500).json({ message: error.message });
  } finally {
    session.endSession();
  }
};

// Controller for getting all purchases
exports.getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find().populate('supplier products.productitem');
    res.status(200).json(purchases);
  } catch (err) {
    res.status(500).json({err , message:err.message});
  }
};

// Controller for getting a single purchase by ID
exports.getPurchaseById = async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id).populate('supplier products');
    res.status(200).json(purchase);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Controller for updating a purchase by ID
exports.updatePurchaseById = async (req, res) => {
  try {
    const updatedPurchase = await Purchase.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedPurchase);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Controller for deleting a purchase by ID
exports.deletePurchaseById = async (req, res) => {
  try {
    await Purchase.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Purchase deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getPurchasesBySupplier = async (req, res) => {
    try {
      const purchases = await Purchase.find({ supplier: req.params.supplierId }).populate('supplier products.productitem');
      if (purchases.length === 0) {
        return res.status(404).json({ message: 'No purchases found for this supplier' });
      }
      res.status(200).json({purchases});
    } catch (err) {
      res.status(500).json({err , message:err.message});
    }
  };