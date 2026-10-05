const mongoose = require("mongoose");

const notificationLogSchema = new mongoose.Schema(
  {
    notificationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notification",
      required: true,
    },

    action: {
      type: String,
      required: true,
    },

    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "NotificationLog",
  notificationLogSchema
);