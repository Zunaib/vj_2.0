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
      type: String,
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
    verificationToken: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false
    },
    isCreator: {
      type: Boolean,
      default: false
    },
    firstTimeLogin: {
      type: Boolean,
      default: true
    },
    cart: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products"
        },
        selectedSize: {
          type: String
        },
        selectedColor: {
          type: String
        }
      }
    ],
    followings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
      }
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
      }
    ],
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
    notifications: {
      isRead: {
        type: Boolean,
        default: false
      },
      notification: [
        {
          text: String,
          date: Date,
          notficationType: String,
          contentId: String,
          contentType: String
        }
      ]
    },
    favoriteProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
      }
    ],
    isAdmin: {
      type: Boolean,
      default: false
    },
    deletedAt: {
      type: Date,
      default: null
    }
  },
  { collection: "Users" }
);

userSchema.set("timestamps", true);

// userSchema.methods.getHashedPassword = function (password) {
//   return crypto
//     .createHash("sha256")
//     .update(password)
//     .digest("base64");
// };

module.exports = mongoose.model("Users", userSchema);
