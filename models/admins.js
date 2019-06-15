const mongoose = require("mongoose");
const crypto = require("crypto");

const adminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      default: null
    },
    lastName: {
      type: String,
      default: null
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      unique: true,
      required: true
    },
    phone: {
      type: String,
      default: null
    },
    displayPicture: {
      type: String,
      default: null
    },
    deletedAt: {
      type: Date,
      default: null
    }
  },
  { collection: "Admins" }
);

adminSchema.set("timestamps", true);

module.exports = mongoose.model("Admins", adminSchema);
