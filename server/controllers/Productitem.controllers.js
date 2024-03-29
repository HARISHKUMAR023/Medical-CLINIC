const Productitem = require('../models/Productitem.model');

const createProductitem = async (req, res) => {
  const { compositionName, type, brand, manufacturer } = req.body;

  try {
    const productitem = new Productitem({
      compositionName,
      type,
      brand,
      manufacturer
    });

    await productitem.save();

    res.status(201).json({
      success: true,
      data: productitem,
      message: 'Product item created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

const fetchProductitems = async (req, res) => {
  try {
    // Fetch all product items from the database
    const productItems = await Productitem.find();

    res.status(200).json({
      success: true,
      productItems,
      message: 'Product items fetched successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

module.exports = {
  createProductitem,
  fetchProductitems
};