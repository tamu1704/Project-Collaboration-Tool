<<<<<<< HEAD
import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
};

export default generateToken;
=======
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const payload = { sub: user._id, role: user.role };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

module.exports = generateToken;
>>>>>>> 7a33cc039476f55e05502a1b88292c5fc926cbb6
