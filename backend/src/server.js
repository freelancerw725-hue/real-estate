const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware - COMPLETE CORS FIX
app.use(cors({
  origin: ["https://real-estate-ten-ruby-83.vercel.app", "https://real-estate.vercel.app", "http://localhost:3000", "https://real-estate-q6r2.onrender.com"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
}));

// Allow OPTIONS preflight for all routes
app.options('*', cors());

// Body parser
app.use(express.json());

// Cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Admin login route (direct access) - MOVED BEFORE OTHER ROUTES
const { login } = require('./controllers/authController');
app.post('/api/admin/login', cors({
  origin: ["https://real-estate-ten-ruby-83.vercel.app", "https://real-estate.vercel.app", "http://localhost:3000", "https://real-estate-q6r2.onrender.com"],
  methods: ["POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  optionsSuccessStatus: 200
}), login);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Real Estate API is running!' });
});

// Routes
const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/propertyRoutes');
const agentRoutes = require('./routes/agentRoutes');
const testimonialRoutes = require('./routes/testimonials');
const contactRoutes = require('./routes/contactRoutes');

// API Routes with explicit CORS
app.use('/api/auth', cors({
  origin: ["https://real-estate-ten-ruby-83.vercel.app", "https://real-estate.vercel.app", "http://localhost:3000", "https://real-estate-q6r2.onrender.com"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  optionsSuccessStatus: 200
}), authRoutes);

app.use('/api/properties', cors({
  origin: ["https://real-estate-ten-ruby-83.vercel.app", "https://real-estate.vercel.app", "http://localhost:3000", "https://real-estate-q6r2.onrender.com"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  optionsSuccessStatus: 200
}), propertyRoutes);

app.use('/api/agents', cors({
  origin: ["https://real-estate-ten-ruby-83.vercel.app", "https://real-estate.vercel.app", "http://localhost:3000", "https://real-estate-q6r2.onrender.com"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  optionsSuccessStatus: 200
}), agentRoutes);

app.use('/api/testimonials', cors({
  origin: ["https://real-estate-ten-ruby-83.vercel.app", "https://real-estate.vercel.app", "http://localhost:3000", "https://real-estate-q6r2.onrender.com"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  optionsSuccessStatus: 200
}), testimonialRoutes);

app.use('/api/contacts', cors({
  origin: ["https://real-estate-ten-ruby-83.vercel.app", "https://real-estate.vercel.app", "http://localhost:3000", "https://real-estate-q6r2.onrender.com"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  optionsSuccessStatus: 200
}), contactRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
