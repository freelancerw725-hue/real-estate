const mongoose = require('mongoose');
const Property = require('../models/Property');
const Agent = require('../models/Agent');
const Testimonial = require('../models/Testimonial');
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
    // Clear existing data
    await Property.deleteMany({});
    await Agent.deleteMany({});
    await Testimonial.deleteMany({});

    // Seed Properties
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
      },
      {
        title: 'Modern Apartment',
        description: 'Contemporary apartment in city center with stunning skyline views.',
        price: 450000,
        location: 'New York, NY',
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
        images: [
          'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400'
        ],
        videos: [],
        type: 'apartment',
        status: 'available'
      },
      {
        title: 'Cozy Condo',
        description: 'Perfect starter home with community amenities and low maintenance.',
        price: 320000,
        location: 'Austin, TX',
        bedrooms: 2,
        bathrooms: 2,
        area: 950,
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400',
        images: [
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400',
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400',
          'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400',
          'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400'
        ],
        videos: ['https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4'],
        type: 'condo',
        status: 'available'
      }
    ];

    await Property.insertMany(properties);
    console.log('Properties seeded successfully');

    // Seed Agents
    const agents = [
      {
        name: 'John Smith',
        email: 'john@example.com',
        phone: '+1-555-0123',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
        experience: 10,
        bio: 'Experienced real estate agent with 10 years in the industry, specializing in luxury properties.',
        specialties: ['Residential', 'Commercial', 'Luxury Homes'],
        active: true
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        phone: '+1-555-0124',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
        experience: 8,
        bio: 'Dedicated to helping clients find their dream homes with personalized service.',
        specialties: ['First-time Buyers', 'Investment Properties'],
        active: true
      },
      {
        name: 'Mike Davis',
        email: 'mike@example.com',
        phone: '+1-555-0125',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        experience: 12,
        bio: 'Award-winning agent with expertise in commercial real estate and property management.',
        specialties: ['Commercial', 'Property Management'],
        active: true
      }
    ];

    await Agent.insertMany(agents);
    console.log('Agents seeded successfully');

    // Seed Testimonials
    const testimonials = [
      {
        name: 'Emily Wilson',
        email: 'emily.wilson@example.com',
        message: 'John helped us find our perfect family home. His knowledge and patience made the process smooth and enjoyable.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
        approved: true
      },
      {
        name: 'David Chen',
        email: 'david.chen@example.com',
        message: 'Sarah Johnson is amazing! She found us a great investment property that has already appreciated significantly.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        approved: true
      },
      {
        name: 'Lisa Rodriguez',
        email: 'lisa.rodriguez@example.com',
        message: 'Mike Davis provided exceptional service for our commercial property purchase. Highly professional and knowledgeable.',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
        approved: true
      }
    ];

    await Testimonial.insertMany(testimonials);
    console.log('Testimonials seeded successfully');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

connectDB().then(() => {
  seedData();
});
