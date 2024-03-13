const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RolePermission = require('./roles.model')

const userSchema = new mongoose.Schema({
  name:{type:String, required:true},
  email:{type:String, required:true , unique:true},
  password:{type:String, required:true},
 // roles:[{types:mongoose.Schema.Types.ObjectId,ref:'RolePermission'}],
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RolePermission' }],
  createdAt: { type: Date, default: Date.now },
})


module.exports = mongoose.model('User', userSchema);
