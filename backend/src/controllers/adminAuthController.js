const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

let otpStore = {};

exports.sendOTP = async (req, res) => {
  const { email } = req.body;

  if (email !== process.env.ADMIN_EMAIL) {
    return res.status(401).json({ message: "Unauthorized admin email" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[email] = otp;

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
