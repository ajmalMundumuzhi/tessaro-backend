const mongoose = require("mongoose");

const courierSettingSchema = new mongoose.Schema(
  {
    apiKey: {
      type: String,
      required: true,
      select: false,
    },

    accessToken: {
      type: String,
      default: null,
      select: false,
    },

    customerCode: {
      type: String,
      default: null,
    },

    isProduction: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "CourierSetting",
  courierSettingSchema
);