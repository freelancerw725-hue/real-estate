const express = require('express');
const {
  getAllProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty
} = require('../controllers/propertyController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Get all properties (public)
router.get('/', getAllProperties);

// Get single property (public)
router.get('/:id', getProperty);

// Create property (admin only)
router.post('/', authenticateToken, requireAdmin, createProperty);

// Update property (admin only)
router.put('/:id', authenticateToken, requireAdmin, updateProperty);

// Delete property (admin only)
router.delete('/:id', authenticateToken, requireAdmin, deleteProperty);

module.exports = router;
