const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  img: { data: Buffer, contentType: String }
});

module.exports = mongoose.model("File", fileSchema);
