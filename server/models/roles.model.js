
const mongoose = require('mongoose');

const rolePermissionSchema = new mongoose.Schema({
    role: { type: String, required: true, unique: true },
    permissions: { type: [String], required: true },
});

const RolePermission = mongoose.model('RolePermission', rolePermissionSchema);

module.exports = RolePermission;
