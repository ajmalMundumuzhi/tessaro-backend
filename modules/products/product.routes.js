
const express = require("express");
const requireAuth = require("../../shared/middleware/requireAuth.middleware");
const requireAdmin = require("../../shared/middleware/requireAdmin.middleware");

const productController = require("./product.controller");

const router = express.Router();

router.use(requireAuth, requireAdmin);

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
