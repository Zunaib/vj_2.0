const mongoose = require("mongoose");

const dropdownSchema = new mongoose.Schema(
  {
    dropdownName: {
      type: String,
      default: null,
      unique: true
    },
    values: [String],
    deletedAt: {
      type: Date,
      default: null
    }
  },
  { collection: "Dropdowns" }
);

dropdownSchema.set("timestamps", true);

module.exports = mongoose.model("Dropdowns", dropdownSchema);
