# Real Estate Backend API

A Node.js/Express backend API for a real estate application with MongoDB.

## Features

- User authentication and authorization
- Property management
- Agent management
- Testimonials
- Contact form handling
- Admin dashboard functionality

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/real-estate
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```

4. Start MongoDB service on your system

5. Run the development server:
   ```bash
   npm run dev
   ```

6. (Optional) Seed the database with sample data:
   ```bash
   npm run seed
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Properties
- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get single property
- `POST /api/properties` - Create property (admin only)
- `PUT /api/properties/:id` - Update property (admin only)
- `DELETE /api/properties/:id` - Delete property (admin only)

### Agents
- `GET /api/agents` - Get all active agents
- `GET /api/agents/:id` - Get single agent
- `POST /api/agents` - Create agent (admin only)
- `PUT /api/agents/:id` - Update agent (admin only)
- `DELETE /api/agents/:id` - Delete agent (admin only)

### Testimonials
- `GET /api/testimonials` - Get all approved testimonials
- `GET /api/testimonials/:id` - Get single testimonial
- `POST /api/testimonials` - Create testimonial (public)
- `GET /api/testimonials/admin/all` - Get all testimonials (admin)
- `PUT /api/testimonials/:id` - Update testimonial (admin only)
- `DELETE /api/testimonials/:id` - Delete testimonial (admin only)

### Contacts
- `GET /api/contacts` - Get all contacts (admin only)
- `GET /api/contacts/:id` - Get single contact (admin only)
- `POST /api/contacts` - Create contact message (public)
- `PUT /api/contacts/:id` - Update contact (admin only)
- `DELETE /api/contacts/:id` - Delete contact (admin only)

### Health Check
- `GET /api/health` - API health check

## Models

### User
- username (String, required, unique)
- email (String, required, unique)
- password (String, required, hashed)
- role (String, enum: ['admin', 'user'], default: 'user')

### Property
- title (String, required)
- description (String, required)
- price (Number, required)
- location (String, required)
- bedrooms (Number, required)
- bathrooms (Number, required)
- area (Number, required)
- image (String, required)
- type (String, enum: ['house', 'apartment', 'condo'], required)
- status (String, enum: ['available', 'sold', 'rented'], default: 'available')

### Agent
- name (String, required)
- email (String, required, unique)
- phone (String, required)
- image (String, required)
- experience (Number, required)
- bio (String)
- specialties (Array of Strings)
- active (Boolean, default: true)

### Testimonial
- name (String, required)
- email (String, required)
- message (String, required)
- rating (Number, min: 1, max: 5, required)
- image (String)
- approved (Boolean, default: false)

### Contact
- name (String, required)
- email (String, required)
- phone (String, required)
- message (String, required)
- status (String, enum: ['new', 'read', 'responded'], default: 'new')

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

Admin-only routes require the user to have `role: 'admin'`.

## Development

- Use `npm run dev` for development with nodemon
- Use `npm start` for production
- Use `npm run seed` to populate the database with sample data

## License

ISC
