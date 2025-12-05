// const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== 'freelancerw725@gmail.com') {
      return res.status(400).json({ message: 'Invalid admin email' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });

    res.cookie('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    return res.status(200).json({
      message: 'Login successful',
      token,
      admin: { id: admin._id, email: admin.email }
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (email !== 'freelancerw725@gmail.com') {
      return res.status(400).json({ message: 'Invalid admin email' });
    }

    let admin = await Admin.findOne({ email });
    if (!admin) {
      admin = new Admin({
        email,
        password: 'defaultpassword'
      });
      await admin.save();
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    admin.otp = otp;
    admin.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await admin.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Admin Login OTP',
      text: `Your OTP for admin login is: ${otp}. This OTP will expire in 10 minutes.`
    });

    // ⭐ VERY IMPORTANT: Use return
    return res.status(200).json({ message: 'OTP sent successfully' });

  } catch (error) {
    console.error('Send OTP error:', error);
    return res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (email !== 'freelancerw725@gmail.com') {
      return res.status(400).json({ message: 'Invalid admin email' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Admin not found' });
    }

    if (admin.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (admin.otpExpires < new Date()) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    // Clear OTP after successful verification
    admin.otp = undefined;
    admin.otpExpires = undefined;
    await admin.save();

    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });

    res.cookie('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    return res.status(200).json({
      message: 'OTP verified successfully',
      token,
      admin: { id: admin._id, email: admin.email }
    });

  } catch (error) {
    console.error('Verify OTP error:', error);
    return res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Admin({
      email,
      password: hashedPassword
    });

    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });

    return res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user._id, email: user.email }
    });

  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await Admin.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ user });

  } catch (error) {
    console.error('Get profile error:', error);
    return res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = { login, sendOTP, verifyOTP, register, getProfile };
