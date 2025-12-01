const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware - FIXED CORS
app.use(cors({
  origin: ["https://real-estate.vercel.app", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Allow OPTIONS preflight
app.options('*', cors());

// Body parser
app.use(express.json());

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

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contacts', contactRoutes);

// Admin login route (direct access)
const { login } = require('./controllers/authController');
app.post('/api/admin/login', login);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
