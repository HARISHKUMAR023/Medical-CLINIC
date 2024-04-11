const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const RolePermission = require('../models/roles.model');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/profiles/');
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

let upload = multer({ storage, fileFilter }).single('profilePic'); // Single file upload with the field name 'profileImage'

/**
 * Register a new user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the user is created successfully.
 */
const register = async (req, res) => {
  try {
    // Handle file upload
    upload(req, res, async (err) => {
      if (err) {
        console.error('Error uploading file:', err);
        return res.status(400).json({ message: 'Error uploading file', error: err.message });
      }

      const { name, email, mobile, password, confirmPassword, roles, createdBy } = req.body;

      // Check if the role is provided
      if (!roles || roles.length === 0) {
        return res.status(400).json({ message: 'Role is required' });
      }

      // Check if passwords match
      if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
      }

      // Check if the email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Get profile image filename
      let profilePic = 'default-profile.png'; // Default profile image
      if (req.file) {
        profilePic = req.file.filename; // Use uploaded file's filename
      }

      // Create a new user with the provided data
      const newUser = new User({
        name,
        mobile,
        email,
        password: hashedPassword,
        profilePic,
        roles,
        createdBy
      });

      // Save the new user to the database
      await newUser.save();

      // Send a success response
      res.status(201).json({ message: 'User created successfully' });
    });
  } catch (err) {
    // Handle errors
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Error creating user' });
  }
};


const getuserdata = async (req, res) => {
  try {
    const response = await User.find();
    res.json(response);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const deleteUser = async (req, res) => {
  const userId = req.params.userid;
  try {
    const userDelete = await User.findByIdAndDelete(userId);
    if (!userDelete) {
      return res.status(404).json({ message: "User not found " +  userId});
      // console.log(userDelete)
      // console.log(userID)
    }
    res.status(200).json({ message: `User with id ${userId} is deleted` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

// Activate or deactivate a product


const toggleUserActiveStatus = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.active = !user.active;
    await user.save();
    res.status(200).json({ message: 'User status toggled successfully', user });
  } catch (err) {
    console.error('Error toggling user status:', err);
    res.status(500).json({ message: 'Error toggling user status', error: err.message });
  }
};

module.exports = { register, getuserdata, deleteUser,toggleUserActiveStatus };
