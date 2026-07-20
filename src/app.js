// src/app.js

const express = require("express");
const messageRoutes = require("./routes/message.route");
const productRoutes = require("./routes/product.route");
const userRoutes = require("./routes/user.route");

const app = express();

// Middleware
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend Training API is running",
  });
});

// Health Check Route
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    service: "backend-training",
  });
});

// API Routes
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", messageRoutes);

// 404 Route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
