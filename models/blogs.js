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
  { collection: "Blogs" }
);

blogSchema.set("timestamps", true);

module.exports = mongoose.model("Blogs", blogSchema);
