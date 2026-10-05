const mongoose = require("mongoose");

const brandHomeGroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    position: {
      type: Number,
      default: 0,
    },

    type: {
      type: String,
      default: "default",
    },

    bgColor: {
      type: String,
      default: null,
    },

    textColor: {
      type: String,
      default: null,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "BrandHomeGroup",
  brandHomeGroupSchema
);