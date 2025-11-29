const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  bedrooms: {
    type: Number,
    required: true
  },
  bathrooms: {
    type: Number,
    required: true
  },
  area: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  images: [{
    type: String,
    required: true
  }],
  videos: [{
    type: String
  }],
  type: {
    type: String,
    enum: ['house', 'apartment', 'condo', 'townhouse'],
    default: 'house'
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'pending'],
    default: 'available'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Property', propertySchema);
