const User = require("../models/User");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const user = await User.create({ name, email, password, role });
    const token = generateToken(user);

    res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const user = req.user; // set by passport local
  const token = generateToken(user);
  res.json({
    message: "Login successful",
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token,
  });
};

exports.me = async (req, res) => {
  const user = req.user; // set by passport jwt
  res.json({
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
};
