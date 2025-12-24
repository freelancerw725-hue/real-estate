const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Property = require("../../models/Property");
const Agent = require("../../models/Agent");
const Contact = require("../../models/Contact");

let otpStore = {};

exports.sendOTP = async (req, res) => {
  const { email } = req.body;

  if (email !== process.env.ADMIN_EMAIL) {
    return res.status(401).json({ message: "Unauthorized admin email" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[email] = otp;

  try {
    // IMPORTANT: If using Gmail with 2FA, EMAIL_PASS must be an App Password, not your regular password
    // Generate App Password at: https://myaccount.google.com/apppasswords
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Admin OTP Login",
      text: `Your OTP is ${otp}`,
    });

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error('Send OTP error:', error);
    return res.status(500).json({ message: 'Failed to send OTP', error: error.message });
  }
};

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] != otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  delete otpStore[email];

  const token = jwt.sign(
    { email, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    message: "Login successful",
    token,
  });
};

exports.getStats = async (req, res) => {
  try {
    const totalProperties = await Property.countDocuments();
    const totalAgents = await Agent.countDocuments();
    const totalContacts = await Contact.countDocuments();

    res.json({
      totalProperties,
      totalAgents,
      totalContacts,
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
