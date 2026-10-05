const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["alert", "event", "system"],
      required: true,
    },

    icon: {
      type: String,
      default: null,
    },

    priority: {
      type: String,
      enum: ["low", "normal", "high", "critical"],
      default: "normal",
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Notification",
  notificationSchema
);