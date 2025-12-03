const User = require('../../models/User');   // ✅ FIXED PATH
const Admin = require('../../models/Admin');   // ✅ FIXED PATH
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

// Register new user
const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'User with this email or username already exists'
      });
    }

    // Create new user
    const user = new User({
      username,
      email,
      password,
      role: role || 'admin' // default admin
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      token
    });

  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// Login user or admin
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // First try to find user in Admin model
    let account = await Admin.findOne({ email });
    let isAdmin = true;

    if (!account) {
      // If not found in Admin, try User model
      account = await User.findOne({ email });
      isAdmin = false;
    }

    if (!account) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    let isPasswordValid;
    if (isAdmin) {
      // For Admin model, use bcrypt directly since it doesn't have comparePassword method
      const bcrypt = require('bcryptjs');
      isPasswordValid = await bcrypt.compare(password, account.password);
    } else {
      // For User model, use the comparePassword method
      isPasswordValid = await account.comparePassword(password);
    }

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(account._id);

    res.json({
      message: 'Login successful',
      user: {
        id: account._id,
        email: account.email,
        role: isAdmin ? 'admin' : account.role,
        type: isAdmin ? 'admin' : 'user'
      },
      token
    });

  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// Get profile (protected)
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json({ user });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// Send OTP to admin email
const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email is the admin email
    if (email !== 'shop43856@gmail.com') {
      return res.status(400).json({ message: 'Invalid admin email' });
    }

    // Find or create admin
    let admin = await Admin.findOne({ email });
    if (!admin) {
      admin = new Admin({
        email,
        password: 'defaultpassword' // This will be hashed by pre-save hook
      });
      await admin.save();
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Set OTP and expiration (10 minutes)
    admin.otp = otp;
    admin.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await admin.save();

    // Send OTP via email
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
      subject: 'Admin Login OTP',
      text: `Your OTP for admin login is: ${otp}. This OTP will expire in 10 minutes.`
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'OTP sent successfully' });

  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// Verify OTP and login
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find admin
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check OTP
    if (!admin.otp || admin.otp !== otp) {
      return res.status(401).json({ message: 'Invalid OTP' });
    }

    // Check expiration
    if (admin.otpExpires < new Date()) {
      return res.status(401).json({ message: 'OTP expired' });
    }

    // Clear OTP
    admin.otp = undefined;
    admin.otpExpires = undefined;
    await admin.save();

    // Generate token
    const token = generateToken(admin._id);

    // Set httpOnly cookie
    res.cookie('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: admin._id,
        email: admin.email,
        role: 'admin'
      }
    });

  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  register,
  login,
  sendOTP,
  verifyOTP,
  getProfile
};
