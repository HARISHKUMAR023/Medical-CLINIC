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

const register = async (req, res) => {
  try {
    // Handle file upload
    upload(req, res, async (err) => {
      if (err) {
        console.error('Error uploading file:', err);
        return res.status(400).json({ message: 'Error uploading file', error: err.message });
      }

      const { name, email, mobile, password, confirmPassword, roles ,createdBy } = req.body;

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

      // Check if the default user role exists, if not, create it
      let defaultUserRole = await RolePermission.findOne({ role: 'user', permissions: 'read_only' });

      if (!defaultUserRole) {
        try {
          const newDefaultUserRole = new RolePermission({ role: 'user', permissions: 'read_only' });
          defaultUserRole = await newDefaultUserRole.save();
        } catch (error) {
          console.error('Error creating default user role:', error);
          return res.status(400).json({ message: 'Error creating default user role' });
          // throw new Error('Error creating default user role');
        }
      }

      // Get profile image filename
      let profilePic= 'default-profile.png'; // Default profile image
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
        roles: roles || [defaultUserRole._id], // Assign the default user role
        createdBy:createdBy
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

module.exports = { register, getuserdata, deleteUser };
