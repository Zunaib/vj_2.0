const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    img: { data: Buffer, contentType: String }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("File", fileSchema);
