const Purchase = require('../models/Purchase.model');
const mongoose = require('mongoose');
const Supplier = require('../models/Suppliers.model'); // adjust the path according to your project structure
const Productitem = require('../models/Productitem.model');
const Stock = require('../models/Stock.models');
exports.createPurchase = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { supplier, purchaseDate, products, invoiceNumber, paymentstatus } = req.body;
    const productItemIds = [];

    for (const productData of products) {
      const { compositionName, type, brand, manufacturer } = productData;
    
      // Check if a Productitem with matching compositionName and manufacturer exists
      let productItem = await Productitem.findOne({ compositionName, manufacturer });
    
      if (!productItem) {
        // If no matching Productitem exists, create a new one
        productItem = new Productitem({
          compositionName,
          type,
          brand,
          manufacturer
        });
    
        await productItem.save({ session });
      }
    
     // Check if a Stock with matching productitem exists
// Check if a Stock with matching productitem and expiryDate exists
let existingStock = await Stock.findOne({ productitem: productItem._id, expiryDate: productData.expiryDate });

if (existingStock) {
  // Update existing stock quantity, MRP, costPrice, sellPrice, and expiryDate
  existingStock.quantity = Number(existingStock.quantity) + Number(productData.quantity);
  existingStock.MRP = productData.MRP;
  existingStock.costPrice = productData.costPrice;
  existingStock.sellPrice = productData.sellPrice;
  existingStock.expiryDate = productData.expiryDate;

  await existingStock.save({ session });
} else {
  // If no matching Stock exists, create a new one
  const stock = new Stock({
    productitem: productItem._id,
    quantity: productData.quantity,
    metric: productData.metric,
    MRP: productData.MRP,
    costPrice: productData.costPrice,
    sellPrice: productData.sellPrice,
    expiryDate: productData.expiryDate
  });

  await stock.save({ session });
}
      // Push the productItem's _id to productItemIds
      productItemIds.push(productItem._id);
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


exports.getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find().populate('productitem');
    res.status(200).json({ message: 'Stocks fetched successfully',stocks });
  } catch (error) {
    console.error('Error fetching stocks:', error);
    res.status(500).json({ message: error.message });
  }
};
// exports.createPurchase  = async (req, res) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const { supplier, purchaseDate, products, invoiceNumber, paymentstatus } = req.body;
//     const productItemIds = [];

//     for (const productData of products) {
//       const { compositionName, type, brand, manufacturer } = productData;
//       const productItem = new Productitem({
//         compositionName,
//         type,
//         brand,
//         manufacturer
//       });

//       const savedProductItem = await productItem.save({ session });
//       productItemIds.push(savedProductItem._id);
//     }

//     const purchase = new Purchase({
//       supplier,
//       purchaseDate,
//       products: productItemIds.map(productId => ({
//         productitem: productId,
//         quantity: products[productItemIds.indexOf(productId)].quantity,
//         metric: products[productItemIds.indexOf(productId)].metric,
//         MRP: products[productItemIds.indexOf(productId)].MRP,
//         costPrice: products[productItemIds.indexOf(productId)].costPrice,
//         sellPrice: products[productItemIds.indexOf(productId)].sellPrice,
//         expiryDate: products[productItemIds.indexOf(productId)].expiryDate
//       })),
//       invoiceNumber,
//       paymentstatus
//     });

//     await purchase.save({ session });

//     await session.commitTransaction();

//     res.status(201).json({ message: 'Purchase and Product created successfully', data: { purchase, productItemIds } });
//   } catch (error) {
//     await session.abortTransaction();
//     console.error('Error creating purchase and product:', error);
//     res.status(500).json({ message: error.message });
//   } finally {
//     session.endSession();
//   }
// };



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