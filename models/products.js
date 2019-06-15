const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    quantity: {
      type: Number,
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
    images: [String],
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      unique: true
    }],
    views: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      unique: true
    }],
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
    sizes: [String],
    colors: [String],
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
    deletedAt: {
      type: Date,
      default: null
    }
  },
  { collection: "Products" }
);

productSchema.set("timestamps", true);

module.exports = mongoose.model("Products", productSchema);
