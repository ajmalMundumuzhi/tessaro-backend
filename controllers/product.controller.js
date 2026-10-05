const express = require("express");

const upload = require("../shared/middleware/upload.middleware");

const {
  createProduct,
} = require("../controllers/product.controller");

const router = express.Router();

router.post(
  "/",
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "images",
      maxCount: 10,
    },
  ]),
  createProduct
);

module.exports = router;