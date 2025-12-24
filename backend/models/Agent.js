const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  image: {
  type: String,
  required: true,
  match: /\.(jpg|jpeg|png|webp)$/i
  },
  experience: {
    type: Number,
    required: true,
    min: 0
  },
  bio: {
    type: String,
    trim: true
  },
  specialties: [{
    type: String,
    trim: true
  }],
  active: {
    type: Boolean,
    default: true
  },
  facebook: {
    type: String,
    default: ''
  },
  instagram: {
    type: String,
    default: ''
  },
  twitter: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Agent', agentSchema);
