const requireAdmin = (req, res, next) => {
  if (!req.admin) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  if (!["super_admin", "admin"].includes(req.admin.role)) {
    return res.status(403).json({
      success: false,
      message: "Admin access required",
    });
  }

  next();
};

module.exports = requireAdmin;