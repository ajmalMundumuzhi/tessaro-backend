const mongoose = require("mongoose");

const googleLoginSettingSchema = new mongoose.Schema(
  {
    clientId: {
      type: String,
      required: true,
    },

    clientSecret: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "GoogleLoginSetting",
  googleLoginSettingSchema
);