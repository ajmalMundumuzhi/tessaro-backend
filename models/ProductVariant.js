const mongoose = require("mongoose");

const productVariantSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    color: {
      type: String,
      default: null,
    },

    size: {
      type: String,
      default: null,
    },

    weight: {
      type: Number,
      default: null,
      min: 0,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    price: {
      type: Number,
      default: null,
      min: 0,
    },

    image: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ProductVariant", productVariantSchema);