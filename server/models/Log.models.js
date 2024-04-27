const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  level: String,
  message: String,
  timestamp: Date,
  ip: String,
});

const Log = mongoose.model('Log', logSchema);
module.exports = Log;