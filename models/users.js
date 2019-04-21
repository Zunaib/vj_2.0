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
    dateofbirth: {
      type: Date,
      default: null
    },
    gender: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    province: {
      type: String,
      default: null
    },
    streetAddress: {
      type: String,
      default: null
    },
    city: {
      type: String,
      default: null
    },
    zipcode: {
      type: String,
      default: null
    },
    country: {
      type: String,
      default: null
    },
    titlevideoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TitleVideo",
      default: null
    },
    phone: {
      type: String,
      default: null
    },
    about: {
      type: String,
      default: null
    },
    displayPicture: {
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
    cart: [{
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
      },
    }],
    designerDescription: {
      type: String,
      default: null
    },
    bloggerDescription: {
      type: String,
      default: null
    },
    vloggerDescription: {
      type: String,
      default: null
    },
    websiteLink: {
      type: String,
      default: null
    },
    pinterestLink: {
      type: String,
      default: null
    },
    behanceLink: {
      type: String,
      default: null
    },
    youtubeLink: {
      type: String,
      default: null
    },

    
    // createdAt: {
    //   type: Date,
    //   default: Date.now()
    // },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now()
    // },
    deletedAt: {
      type: Date,
      default: null
    }
  },
  { collection: "Users" },
  { timestamps: true },
);

// userSchema.methods.getHashedPassword = function (password) {
//   return crypto
//     .createHash("sha256")
//     .update(password)
//     .digest("base64");
// };

module.exports = mongoose.model("Users", userSchema);
