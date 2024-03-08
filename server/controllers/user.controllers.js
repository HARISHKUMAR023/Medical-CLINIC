const User = require('../models/User.model');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  try {
    const { name, email, password, roles } = req.body; // Fix typo here (changed 'usernames' to 'username')
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email, // Fix typo here (changed 'usernames' to 'username')
      password: hashedPassword,
      roles: roles || ['user'],
    });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating user' });
  }
};

module.exports = { register };
