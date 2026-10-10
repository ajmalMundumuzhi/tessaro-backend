
const express = require("express");
const requireAuth = require("../../shared/middleware/requireAuth.middleware");
const requireAdmin = require("../../shared/middleware/requireAdmin.middleware");
const variantController = require("./productVariant.controller");

const productController = require("./product.controller");

const router = express.Router();

router.use(requireAuth, requireAdmin);

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

// Product variants 

router.get("/:productId/variants", variantController.getVariants);
router.post("/:productId/variants", variantController.createVariants);
router.put(
  "/:productId/variants/:variantId",
  variantController.updateVariant
);
router.delete(
  "/:productId/variants/:variantId",
  variantController.deleteVariant
);


module.exports = router;
