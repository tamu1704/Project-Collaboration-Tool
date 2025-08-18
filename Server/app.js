const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("./config/passport");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(passport.initialize());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("API is running..."));

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

module.exports = app;
