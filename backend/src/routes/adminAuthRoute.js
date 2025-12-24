const express = require("express");
const { sendOTP, verifyOTP, getStats } = require("../controllers/adminAuthController");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.get("/stats", authenticateToken, getStats);

module.exports = router;
