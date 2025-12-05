const Admin = require('../models/Admin');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP
const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Only allow admin email
    if (email !== 'freelancerw725@gmail.com') {
      return res.status(403).json({ message: 'Access denied. Invalid admin email.' });
    }

    // Find or create admin
    let admin = await Admin.findOne({ email });
    if (!admin) admin = new Admin({ email });

    // Generate OTP
    const otp = generateOTP();
    admin.otp = otp;
    admin.otpExpire = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    await admin.save();

    // --------- REAL GMAIL SMTP ONLY (NO ETHEREAL) ---------
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Admin OTP for Login',
      text: `Your OTP for admin login is: ${otp}. It expires in 5 minutes.`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('GMAIL OTP SENT:', info.response);

    return res.status(200).json({
      message: 'OTP sent successfully'
    });

  } catch (error) {
    console.error('Error sending OTP:', error);
    return res.status(500).json({
      message: 'Failed to send OTP.',
      error: error.message
    });
  }
};

// Verify OTP
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: 'Admin not found.' });

    if (admin.otp !== otp)
      return res.status(400).json({ message: 'Invalid OTP.' });

    if (new Date() > admin.otpExpire)
      return res.status(400).json({ message: 'OTP has expired.' });

    // Clear OTP
    admin.otp = undefined;
    admin.otpExpire = undefined;
    await admin.save();

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET || 'dev-secret',
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'OTP verified successfully',
      token
    });

  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).json({ message: 'Failed to verify OTP.' });
  }
};

module.exports = { sendOTP, verifyOTP };
