const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);

    const adminEmail = "freelancerw725@gmail.com";

    // Check if admin already exists
    const existingAdmin = await User.findOne({
      email: adminEmail,
      role: "admin"
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      console.log("Email:", adminEmail);
      process.exit(0);
    }

    // Create admin user (email-based)
    const admin = new User({
      name: "Admin",
      email: adminEmail,
      role: "admin",
      isVerified: true
    });

    await admin.save();

    console.log("Admin created successfully");
    console.log("Email:", adminEmail);

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

seedAdmin();
