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
  { collection: "Vlogs" }
);

vlogSchema.set("timestamps", true);

module.exports = mongoose.model("Vlogs", vlogSchema);
