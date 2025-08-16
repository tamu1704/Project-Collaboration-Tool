// Load env vars FIRST
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("./config/passport"); // now JWT_SECRET is available
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("API is running..."));

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

// Start server
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
