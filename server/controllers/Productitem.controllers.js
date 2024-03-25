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

module.exports = {
  createProductitem
};