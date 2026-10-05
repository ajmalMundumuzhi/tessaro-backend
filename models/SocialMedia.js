const mongoose = require("mongoose");

const socialMediaSchema = new mongoose.Schema(
  {
    facebook: {
      type: String,
      default: "",
    },

    instagram: {
      type: String,
      default: "",
    },

    twitter: {
      type: String,
      default: "",
    },

    youtube: {
      type: String,
      default: "",
    },

    whatsapp: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "SocialMedia",
  socialMediaSchema
);