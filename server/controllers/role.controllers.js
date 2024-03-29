// role.controllers.js
const RolePermission = require('../models/roles.model');

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

module.exports = { createRole, getRoles };
