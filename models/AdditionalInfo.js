const mongoose = require("mongoose");

const additionalInfoSchema = new mongoose.Schema(
  {
    sectionTitle1: {
      type: String,
      default: "",
    },

    sectionTitle2: {
      type: String,
      default: "",
    },

    sectionTitle3: {
      type: String,
      default: "",
    },

    sectionTitle4: {
      type: String,
      default: "",
    },

    sectionTitle5: {
      type: String,
      default: "",
    },

    sectionTitle6: {
      type: String,
      default: "",
    },

    sectionTitle7: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "AdditionalInfo",
  additionalInfoSchema
);