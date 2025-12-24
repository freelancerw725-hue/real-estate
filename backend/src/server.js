const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const adminAuthRoute = require("./routes/adminAuthRoute");
const agentRoutes = require("./routes/agentRoutes");
const auth = require("./routes/auth");
const contactRoutes = require("./routes/contactRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const testimonials = require("./routes/testimonials");

const app = express();
connectDB();

/* 🔥 CORS – MUST BE FIRST */
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://real-estate-ten-ruby-83.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

/* 🔥 Preflight fix */
app.options("*", cors());

/* Parsers */
app.use(express.json());

/* Routes */
app.use("/api/admin", adminAuthRoute);
app.use("/api/agents", agentRoutes);
app.use("/api/auth", auth);
app.use("/api/contacts", contactRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/testimonials", testimonials);

/* Health check */
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

/* ✅ IMPORTANT: Render + Local compatible */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});
