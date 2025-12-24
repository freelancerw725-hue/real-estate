const express = require('express');
const { register, login, getProfile } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Register new user
router.post('/register', register);

// Login user
router.post('/login', login);

// Admin login (alias for login) - keeping for backward compatibility
router.post('/admin/login', login);

// Get user profile (protected)
router.get('/profile', authenticateToken, getProfile);

module.exports = router;
