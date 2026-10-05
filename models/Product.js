const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },

    childCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChildCategory",
      default: null,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
    },

    barcode: {
      type: String,
      unique: true,
      sparse: true,
    },

    shortDescription: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    thumbnail: {
      type: String,
      required: true,
    },

    images: {
      type: [String],
      default: [],
    },

    sellingPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    originalPrice: {
      type: Number,
      default: null,
      min: 0,
    },

    makingCharge: {
      type: Number,
      default: 0,
      min: 0,
    },

    metalType: {
      type: String,
      default: null,
    },

    purity: {
      type: String,
      default: null,
    },

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    reviewCount: {
      type: Number,
      default: 0,
    },

    totalStock: {
      type: Number,
      default: 0,
      min: 0,
    },

    isTopSelling: {
      type: Boolean,
      default: false,
    },

    buyTwoGetOne: {
      type: Boolean,
      default: false,
    },

    freeShipping: {
      type: Boolean,
      default: false,
    },

    positionInSubCategory: {
      type: Number,
      default: 0,
    },

    seoTitle: {
      type: String,
      default: "",
    },

    seoDescription: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["active", "draft", "hidden"],
      default: "draft",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);