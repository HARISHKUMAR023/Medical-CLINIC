const mongoose = require('mongoose');

const manufacturerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  manufacturerPic: { type: String },
  createdAt: { type: Date, default: Date.now },
  active: {
    type: Boolean,
    default: true
},
  createdBy: { type: String, required: true }
});

module.exports = mongoose.model('manufacturer', manufacturerSchema);
