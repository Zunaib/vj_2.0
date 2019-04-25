const mongoose = require("mongoose");

const vlogSchema = new mongoose.Schema(
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
    videoLink: {
      type: String,
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

vlogSchema.set("timestamps", true);

module.exports = mongoose.model("Vlogs", vlogSchema);
