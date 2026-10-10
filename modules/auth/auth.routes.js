const express = require("express");
const {loginSchema} = require("./auth.validation");
const {loginLimiter} = require("./auth.limiter");

const {
  login,
  logout,
  refresh,
  me,
} = require("./auth.controller");

const requireAuth = require("../../shared/middleware/requireAuth.middleware");
const validate = require("../../shared/middleware/validate.middleware");

const router = express.Router();

router.post("/login", loginLimiter, validate(loginSchema), login);
router.post("/logout", logout);
router.post("/refresh", refresh);
router.get("/me", requireAuth, me);

module.exports = router;