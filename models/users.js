const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
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
    generalBioDesigner: {
      type: String,
      default: null
    },
    generalBioBlogger: {
      type: String,
      default: null
    },
    generalBioVlogger: {
      type: String,
      default: null
    },
    dateofbirth: {
      type: Date,
      default: null
    },
    gender: {
      type: String,
      default: null
    },
    addresses: {
      streetAddress: { type: String, default: null },
      city: { type: String, default: null },
      zipCode: { type: String, default: null },
      province: { type: String, default: null },
      country: { type: String, default: null }
    },
    titlevideoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TitleVideo",
      default: null
    },
    phone: {
      countryCode: { type: String, default: null },
      phoneNumber: { type: String, default: null }
    },
    about: {
      type: String,
      default: null
    },
    displayPictureID: {
      type: String,
      default: null
    },
    verified: {
      type: Boolean,
      default: false
    },
    isCustomer: {
      type: Boolean,
      default: true
    },
    isDesigner: {
      type: Boolean,
      default: false
    },
    isBlogger: {
      type: Boolean,
      default: false
    },
    isVlogger: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    },
    deletedAt: {
      type: Date,
      default: null
    }
  },
  { collection: "Users" },
);

// userSchema.methods.getHashedPassword = function (password) {
//   return crypto
//     .createHash("sha256")
//     .update(password)
//     .digest("base64");
// };

module.exports = mongoose.model("Users", userSchema);
