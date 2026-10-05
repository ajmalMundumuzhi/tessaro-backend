const mongoose = require("mongoose");

const paymentSettingSchema = new mongoose.Schema(
  {
    gateway: {
      type: String,
      required: true,
    },

    key: {
      type: String,
      required: true,
      select: false,
    },

    secret: {
      type: String,
      required: true,
      select: false,
    },

    isLive: {
      type: Boolean,
      default: false,
    },

    shippingCost: {
      type: Number,
      default: 0,
    },

    gatewayImageURL: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "PaymentSetting",
  paymentSettingSchema
);