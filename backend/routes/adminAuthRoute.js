const express = require('express');
const { sendOTP, verifyOTP } = require('../controllers/adminAuthController');

const router = express.Router();

// Send OTP route
router.post('/send-otp', sendOTP);

// Verify OTP route
router.post('/verify-otp', verifyOTP);

module.exports = router;
