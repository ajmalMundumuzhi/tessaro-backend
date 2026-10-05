const mongoose = require("mongoose");

const shippingChargeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    extraCharge: {
      type: Number,
      default: 0,
      min: 0,
    },

    isHomeArea: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ShippingCharge",
  shippingChargeSchema
);