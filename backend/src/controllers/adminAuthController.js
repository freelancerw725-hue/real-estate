const User = require('../models/User');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const otpStore = {}; // { email: otp }

// 📩 SEND OTP
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // ✅ check admin exists
    const admin = await User.findOne({ email, role: 'admin' });
    if (!admin) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[email] = otp;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"RealEstateX" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Admin Login OTP',
      text: `Your OTP is ${otp}`
    });

    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'OTP send failed', error: error.message });
  }
};

// ✅ VERIFY OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (otpStore[email] != otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    const admin = await User.findOne({ email, role: 'admin' });

    const token = jwt.sign(
      { id: admin._id, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    delete otpStore[email];

    res.json({
      message: 'Login successful',
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'OTP verify failed' });
  }
};
