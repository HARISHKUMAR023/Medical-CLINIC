const Product = require('../models/product.model');

const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/productfile');
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
  },
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Check file type
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type'), false); // Reject the file
  }
};

let upload = multer({ storage, fileFilter }).single('productPic'); // Single file upload with the field name 'profileImage'

const product = async (req, res) => {
  try {
    // Handle file upload
    upload(req, res, async (err) => {
      if (err) {
        console.error('Error uploading file:', err);
        return res.status(400).json({ message: 'Error uploading file', error: err.message });
      }

      const { name, createdBy } = req.body;

  
      // Get profile image filename
      let   productPic= 'default-profile.png'; // Default profile image
      if (req.file) {
        productPic = req.file.filename; // Use uploaded file's filename
      }

      const newProduct = new Product({
        name,
     
        productPic,
        
        createdBy:createdBy
      });

  
      await newProduct.save();

      // Send a success response
      res.status(201).json({ message: 'Product is  created successfully' });
    });
  } catch (err) {
    // Handle errors
    console.error('Error creating Product:', err);
    res.status(500).json({ message: 'Error creating Product' });
  }
};


const getAllProducts = async (req, res) => {
    try {
      // Fetch all products from the database
      const products = await Product.find();
  
      // Send the products as a response
      res.status(200).json(products);
    } catch (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ message: 'Error fetching products', error: err.message });
    }
  };



  const deleteProduct = async (req, res) => {
    try {
      // Extract product ID from request parameters
      const productId = req.params.id;
  
      // Find the product by ID and delete it
      const deletedProduct = await Product.findByIdAndDelete(productId);
  
      if (!deletedProduct) {
        // If product with the given ID is not found, send a 404 Not Found response
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Send a success response
      res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
    } catch (err) {
      // Handle errors
      console.error('Error deleting product:', err);
      res.status(500).json({ message: 'Error deleting product', error: err.message });
    }
  };  


// Activate or deactivate a product
const toggleProductStatus = async (req, res) => {
  try {
    const productId = req.params.id;

    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Toggle the active status
    product.active = !product.active;

    // Save the updated product
    await product.save();

    res.status(200).json({ message: 'Product status toggled successfully', product });
  } catch (err) {
    console.error('Error toggling product status:', err);
    res.status(500).json({ message: 'Error toggling product status', error: err.message });
  }
};
const updateProduct = async (req, res) => {
  try {
    // Extract product ID from request parameters
    const productId = req.params.id;

    // Check if the product exists
    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update product fields if they exist in the request body
    if (req.body.name) {
      existingProduct.name = req.body.name;
    }
    // You can similarly update other fields here

    // Handle file upload if a new product image is provided
    if (req.file) {
      existingProduct.productPic = req.file.filename;
    }

    // Save the updated product
    await existingProduct.save();

    // Send a success response
    res.status(200).json({ message: 'Product updated successfully', updatedProduct: existingProduct });
  } catch (err) {
    // Handle errors
    console.error('Error updating product:', err);
    res.status(500).json({ message: 'Error updating product', error: err.message });
  }
};
module.exports = { product , getAllProducts ,deleteProduct , toggleProductStatus,updateProduct };