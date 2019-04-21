const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
  {
    albumName: {
      type: String,
      required: true,
      default: null
    },
    year: {
      type: String,
      default: null
    },
    season: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    thumbnail: {
      type: String,
      default: null
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now()
    // },
    // updatedAt: {
    //     type: Date,
    //     default: Date.now()
    // },
    deletedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true },
  { collection: "Albums" }
);

module.exports = mongoose.model("Albums", albumSchema);
