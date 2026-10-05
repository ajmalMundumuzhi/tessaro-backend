const mongoose = require("mongoose");

const themeSettingSchema = new mongoose.Schema(
  {
    theme: {
      type: String,
      required: true,
      default: "default",
    },

    homePage: {
      type: String,
      required: true,
      default: "default",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ThemeSetting",
  themeSettingSchema
);