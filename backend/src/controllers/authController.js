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

module.exports = {
  register,
  login,
  getProfile
};
