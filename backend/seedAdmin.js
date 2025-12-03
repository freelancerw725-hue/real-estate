const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/real-estate');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'shop43856@gmail.com' });

    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Email: shop43856@gmail.com');
      console.log('Password: admin123');
      process.exit(0);
    }

    // Create admin user
    const adminUser = new User({
      username: 'admin',
      email: 'shop43856@gmail.com',
      password: 'admin123',
      role: 'admin'
    });

    await adminUser.save();

    console.log('Admin user created successfully!');
    console.log('Email: shop43856@gmail.com');
    console.log('Password: admin123');

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdminUser();
