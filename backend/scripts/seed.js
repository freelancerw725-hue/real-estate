const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Property = require('../models/Property');
const Agent = require('../models/Agent');
const Testimonial = require('../models/Testimonial');
const Admin = require('../models/Admin'); // IMPORTANT

require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear all collections
    await Property.deleteMany({});
    await Agent.deleteMany({});
    await Testimonial.deleteMany({});
    await Admin.deleteMany({}); // Clear old admin accounts

    console.log("Old data deleted.");

    // ------------------ CREATE ADMIN ------------------
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await Admin.create({
      email: "admin@gmail.com",
      password: hashedPassword
    });

    console.log("✅ Admin Created Successfully");
    console.log("👉 Email: admin@gmail.com");
    console.log("👉 Password: admin123");

    // ------------------ SEED PROPERTIES ------------------
    const properties = [
      {
        title: 'Luxury Villa',
        description: 'Beautiful luxury villa with ocean view, modern amenities, and spacious rooms.',
        price: 750000,
        location: 'Miami, FL',
        bedrooms: 4,
        bathrooms: 3,
        area: 2500,
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
        images: [
          'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400'
        ],
        videos: ['https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'],
        type: 'house',
        status: 'available'
      }
    ];

    await Property.insertMany(properties);
    console.log('Properties seeded successfully');

    // ------------------ SEED AGENTS ------------------
    const agents = [
      {
        name: 'John Smith',
        email: 'john@example.com',
        phone: '+1-555-0123',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
        experience: 10,
        bio: 'Experienced real estate agent.',
        specialties: ['Luxury Homes', 'Commercial'],
        active: true
      }
    ];

    await Agent.insertMany(agents);
    console.log('Agents seeded successfully');

    // ------------------ SEED TESTIMONIALS ------------------
    const testimonials = [
      {
        name: 'Emily Wilson',
        email: 'emily@example.com',
        message: 'Amazing service!',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
        approved: true
      }
    ];

    await Testimonial.insertMany(testimonials);
    console.log('Testimonials seeded successfully');

    console.log('🎉 All data seeded successfully!');
    process.exit(0);

  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

connectDB().then(() => {
  seedData();
});
