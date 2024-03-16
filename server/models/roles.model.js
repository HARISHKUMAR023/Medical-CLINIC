
const mongoose = require('mongoose');

const rolePermissionSchema = new mongoose.Schema({
    role: { type: String, required: true, unique: true },
    permissions: { type: [String], required: true },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type:String, required:true },
    // createdBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User', // Reference to the User model
    //     required: true,
    //   },
});

const RolePermission = mongoose.model('RolePermission', rolePermissionSchema);

module.exports = RolePermission;
