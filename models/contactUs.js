const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
      required: true
    },
    email: {
      type: String,
      required: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    message: {
      type: String,
      default: null,
      required: true
    },
    deletedAt: {
      type: Date,
      default: null
    }
  },
  { collection: "ContactUs" }
);

contactUsSchema.set("timestamps", true);

module.exports = mongoose.model("ContactUs", contactUsSchema);
