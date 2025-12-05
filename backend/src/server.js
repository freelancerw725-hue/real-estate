const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

// GLOBAL CORS
const allowedOrigins = [
  "https://real-estate-ten-ruby-83.vercel.app",
  "https://real-estate.vercel.app",
  "http://localhost:3000",
  "http://localhost:5173",
  "https://real-estate-q6r2.onrender.com"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("*", cors());

// Parsers
app.use(express.json());
app.use(cookieParser());

// CONTROLLERS
const { login, sendOTP, verifyOTP } = require('./controllers/authController');

// ADMIN AUTH ROUTES (NO BUG NOW)
const adminAuthRoute = require('../routes/adminAuthRoute');

// DIRECT AUTH ENDPOINTS
app.post('/api/admin/login', login);
app.post('/api/admin/send-otp', sendOTP);
app.post('/api/admin/verify-otp', verifyOTP);

// ROUTES
const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/propertyRoutes');
const agentRoutes = require('./routes/agentRoutes');
const testimonialRoutes = require('./routes/testimonials');
const contactRoutes = require('./routes/contactRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/admin-auth', adminAuthRoute);

// HEALTH CHECK
app.get('/api/health', (req, res) => {
  res.json({ status: "OK", message: "Backend Running" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
