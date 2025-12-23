const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const adminAuthRoute = require("./routes/adminAuthRoute");

const app = express();
connectDB();

/* 🔥 CORS – MUST BE FIRST */
app.use(cors({
  origin: ["http://localhost:5173", "https://real-estate-6f2o.onrender.com"],
  credentials: true
}));

/* Parsers */
app.use(express.json());

/* Routes */
app.use("/api/admin", adminAuthRoute);

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

const PORT = 5001;
app.listen(PORT, () =>
  console.log("🚀 Server running on port", PORT)
);
