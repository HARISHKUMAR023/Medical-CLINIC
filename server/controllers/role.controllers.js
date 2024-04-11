// role.controllers.js
const RolePermission = require('../models/roles.model');
const  User = require('../models/User.model');
const createRole = async (req, res) => {
  try {
    const { role, permissions,createdBy } = req.body;
    const newRolePermission = new RolePermission({ role, permissions,createdBy });
    const savedRolePermission = await newRolePermission.save();
    res.status(201).json({savedRolePermission , message:"Roles Created sucessfully"});
  } catch (error) {
    console.error('Error creating role:', error);
    res.status(500).json({ message: 'Error creating role' });
  }
};

const getRoles = async (req, res) => {
  try {
    const roles = await RolePermission.find();
    res.json(roles);
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const deleteUserRole = async (req, res) => {
  try {
    const { roleId } = req.params;
    const defaultRole = await RolePermission.findOne({ role: 'default' });
    
    if (!defaultRole) {
      return res.status(400).json({ message: 'Default role not found' });
    }

    const usersWithRole = await User.find({ role: roleId });

    for (let user of usersWithRole) {
      user.role = defaultRole._id;
      await user.save();
    }

    await RolePermission.deleteOne({ _id: roleId });

    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    console.error('Error deleting role:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createRole, getRoles, deleteUserRole };

module.exports = { createRole, getRoles };
