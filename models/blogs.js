const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    content: {
      type: String,
      required: true,
      default: null
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      // unique: true
    }],
    views: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      // unique: true
    }],
    thumbnail: {
      type: String,
      default: null
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
    deletedAt: {
      type: Date,
      default: null
    }
  },
  { collection: "Blogs" }
);

blogSchema.set("timestamps", true);

module.exports = mongoose.model("Blogs", blogSchema);
