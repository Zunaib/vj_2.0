const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      default: null
    },
    quantity: {
      type: Number,
      required: true,
      default: null
    },
    price: {
      type: Number,
      required: true,
      default: null
    },
    discount: {
      type: Number,
      default: null
    },
    images: {
      type: Array
    },
    likes: {
      type: Number,
      default: 0
    },
    dislikes: {
      type: Number,
      default: 0
    },
    views: {
      type: Number,
      default: 0
    },
    comments: [
      {
        comment: { type: String, default: null },
        time: { type: Date, default: Date.now },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
          default: null
        }
      }
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true
    },
    albumId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Albums",
      default: null
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
  { collection: "Products" }
);

module.exports = mongoose.model("Products", productSchema);
