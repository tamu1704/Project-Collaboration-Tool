const express = require("express");
const passport = require("passport");
const { register, login, me } = require("../controllers/auth.controller");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.post("/register", register);

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  login
);

router.get("/me", requireAuth, me);

module.exports = router;
