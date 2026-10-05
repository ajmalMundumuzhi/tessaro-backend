const mongoose = require("mongoose");

const policySchema = new mongoose.Schema(
  {
    termsURL: {
      type: String,
      default: "",
    },

    returnURL: {
      type: String,
      default: "",
    },

    returnDays: {
      type: Number,
      default: 7,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Policy", policySchema);