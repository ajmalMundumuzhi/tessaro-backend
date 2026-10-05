const mongoose = require("mongoose");

const siteSettingSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    whyChooseUs: {
      type: String,
      default: "",
    },

    estimatedDeliveryNote: {
      type: String,
      default: "",
    },

    step1Date: {
      type: Date,
      default: null,
    },

    announcement: {
      type: [String],
      default: [],
    },

    authAnnouncement: {
      type: [String],
      default: [],
    },

    unAuthAnnouncement: {
      type: [String],
      default: [],
    },

    freeShippingPrice: {
      type: Number,
      default: 0,
    },

    currency: {
      type: String,
      default: "INR",
    },

    enableCOD: {
      type: Boolean,
      default: true,
    },

    enableTranslator: {
      type: Boolean,
      default: false,
    },

    enableGender: {
      type: Boolean,
      default: false,
    },

    enableLoyaltyPoints: {
      type: Boolean,
      default: false,
    },

    enableForceStitching: {
      type: Boolean,
      default: false,
    },

    deliveryWithinDays: {
      type: Number,
      default: 7,
    },

    dispatchCutoffTime: {
      type: String,
      default: "17:00",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "SiteSetting",
  siteSettingSchema
);