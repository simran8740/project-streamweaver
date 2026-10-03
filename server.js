const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./Routes/authRoutes");
const datasetRoutes = require("./Routes/datasetRoutes");
const uploadRoutes = require("./Routes/uploadRoutes");
const previewRoutes = require("./Routes/previewRoutes");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
connectDB();

// Auth Routes
app.use("/api/auth", authRoutes);

// Dataset Routes
app.use("/api/datasets", datasetRoutes);

// Upload Routes
app.use("/api/upload", uploadRoutes);
app.use("/api/preview", previewRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("StreamWeaver Backend is Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`StreamWeaver server running on port ${PORT}`);
});