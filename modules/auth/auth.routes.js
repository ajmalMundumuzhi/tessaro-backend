const express = require("express");

const {
  login,
  logout,
  refresh,
  me,
} = require("./auth.controller");

const requireAuth = require("../../shared/middleware/requireAuth.middleware");

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refresh);
router.get("/me", requireAuth, me);

module.exports = router;