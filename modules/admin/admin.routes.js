const express = require("express");

const requireAuth = require("../../shared/middleware/requireAuth.middleware");
const requireAdmin = require("../../shared/middleware/requireAdmin.middleware");

const router = express.Router();

// Every route below requires authentication and admin role
router.use(requireAuth, requireAdmin);

router.get("/dashboard", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Admin dashboard access granted",
    data: {
      adminId: req.admin.id,
      role: req.admin.role,
    },
  });
});

module.exports = router;