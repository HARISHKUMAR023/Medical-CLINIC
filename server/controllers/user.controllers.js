const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const RolePermission = require('../models/roles.model');

const register = async (req, res) => {
  try {
    const { name, email, password, roles } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the default user role exists, if not, create it
    let defaultUserRole = await RolePermission.findOne({ role: 'user', permissions: 'read_only' });

    if (!defaultUserRole) {
      try {
        const newDefaultUserRole = new RolePermission({ role: 'user', permissions: 'read_only' });
        defaultUserRole = await newDefaultUserRole.save();
      } catch (error) {
        console.error('Error creating default user role:', error);
        throw new Error('Error creating default user role');
      }
    }

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      roles: roles || [defaultUserRole._id], // Assign the default user role
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
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

module.exports = { register, getuserdata };
