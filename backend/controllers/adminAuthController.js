const Admin = require('../models/Admin');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// 🔢 Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ================================
// 📩 SEND OTP
// ================================
const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    console.log("👉 REQ EMAIL:", JSON.stringify(email));
    console.log("👉 ENV ADMIN_EMAIL:", JSON.stringify(process.env.ADMIN_EMAIL));

    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({
        message: 'Unauthorized admin email'
      });
    }


    // 🔍 Find or create admin
    let admin = await Admin.findOne({ email });
    if (!admin) {
      admin = new Admin({ email });
    }

    // 🔐 Generate OTP
    const otp = generateOTP();
    admin.otp = otp;
    admin.otpExpire = new Date(Date.now() + 5 * 60 * 1000); // 5 min
    await admin.save();

    // ✉️ Gmail SMTP (App Password)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Real Estate Admin" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Admin Login OTP',
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`
    });

    console.log('✅ OTP sent to admin email');

    return res.status(200).json({
      message: 'OTP sent successfully'
    });

  } catch (error) {
    console.error('❌ Send OTP Error:', error);
    return res.status(500).json({
      message: 'Failed to send OTP',
      error: error.message
    });
  }
};

// ================================
// ✅ VERIFY OTP
// ================================
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    if (admin.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (new Date() > admin.otpExpire) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    // 🧹 Clear OTP
    admin.otp = undefined;
    admin.otpExpire = undefined;
    await admin.save();

    // 🔑 Generate JWT
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      message: 'OTP verified successfully',
      token
    });

  } catch (error) {
    console.error('❌ Verify OTP Error:', error);
    return res.status(500).json({
      message: 'Failed to verify OTP'
    });
  }
};

module.exports = { sendOTP, verifyOTP };
