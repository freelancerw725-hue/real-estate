const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  otp: {
    type: String
  },
  otpExpire: {
    type: Date
  }
});

module.exports = mongoose.model('Admin', adminSchema);
