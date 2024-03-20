const Manufacturer = require('../models/manufacturer.model');

const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/manufacturerfile');
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

let upload = multer({ storage, fileFilter }).single('manufacturerPic'); // Single file upload with the field name 'profileImage'

const manufacturer = async (req, res) => {
  try {
    // Handle file upload
    upload(req, res, async (err) => {
      if (err) {
        console.error('Error uploading file:', err);
        return res.status(400).json({ message: 'Error uploading file', error: err.message });
      }

      const { name, createdBy } = req.body;

  
      // Get profile image filename
      let   manufacturerPic= 'default-profile.png'; // Default profile image
      if (req.file) {
        manufacturerPic = req.file.filename; // Use uploaded file's filename
      }

      const newmanufacturer = new Manufacturer({
        name,
     
        manufacturerPic,
        
        createdBy:createdBy
      });

  
      await newmanufacturer.save();

      // Send a success response
      res.status(201).json({ message: 'manufactureris  created successfully' });
    });
  } catch (err) {
    // Handle errors
    console.error('Error creating manufacturer:', err);
    res.status(500).json({ message: 'Error creating manufacturer' });
  }
};


const getAllmanufacturer= async (req, res) => {
    try {
      // Fetch all products from the database
      const manufacturer = await Manufacturer.find();
  
      // Send the products as a response
      res.status(200).json(manufacturer);
    } catch (err) {
      console.error('Error fetching manufacturer:', err);
      res.status(500).json({ message: 'Error fetching manufacturer', error: err.message });
    }
  };



  const deletemanufacturer= async (req, res) => {
    try {
      // Extract product ID from request parameters
      const manufacturerId = req.params.id;
  
      // Find the product by ID and delete it
      const deletedProduct = await Manufacturer.findByIdAndDelete(manufacturerId);
  
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


  const updateManufacturer = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = {}; // Object to store updated data
    
      // Extract fields from the request body
      const { name, createdBy, manufacturerPic } = req.body;
      console.log('Request Body:', req.body);

      // Check if the 'name' field is provided and is a string
      if (name && typeof name === 'string') {
        updatedData.name = name;
      }
    
      // Check if the 'createdBy' field is provided and is a string
      if (createdBy && typeof createdBy === 'string') {
        updatedData.createdBy = createdBy;
      }
    
      // If 'manufacturerPic' is provided, update it
      if (manufacturerPic) {
        updatedData.manufacturerPic = manufacturerPic;
      }
    
      // Find and update the manufacturer by ID
      const manufacturer = await Manufacturer.findByIdAndUpdate(id, updatedData, {
        new: true, // Return the updated document
        runValidators: true // Run validators for schema validation
      });
    
      // Check if the manufacturer exists
      if (!manufacturer) {
        return res.status(404).json({ success: false, error: 'Manufacturer not found' });
      }
    
      // Send a success response with the updated manufacturer data
      res.status(200).json({ success: true, data: manufacturer, message: 'Manufacturer updated successfully' });
    } catch (error) {
      // Handle server errors
      console.error('Error updating manufacturer:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  };
  
  module.exports = { updateManufacturer };
  
  
// Activate or deactivate a product
const togglemanufacturer = async (req, res) => {
  try {
    const  manufacturerid = req.params.id;

    // Find the product by ID
    const  manufacturer= await Manufacturer.findById(manufacturerid);

    if (!manufacturer) {
      return res.status(404).json({ message: ' manufacturer not found' });
    }

    // Toggle the active status
    manufacturer.active = !manufacturer.active;

    // Save the updated product
    await manufacturer.save();

    res.status(200).json({ message: 'manufacturer status toggled successfully', manufacturer });
  } catch (err) {
    console.error('Error toggling manufacturer status:', err);
    res.status(500).json({ message: 'Error toggling manufacturer status', error: err.message });
  }
};
module.exports = { manufacturer , getAllmanufacturer ,deletemanufacturer,updateManufacturer,togglemanufacturer };